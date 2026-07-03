import * as THREE from 'three';
import { GLTFLoader } from 'three/examples/jsm/loaders/GLTFLoader.js';

/* -------------------------------------------------------
   GAME DIALOGUE TREE (Your Flowchart Structure)
------------------------------------------------------- */

// 👈 Populate this with the actual text from your PDF nodes!
const dialogueTree = {
  start: {
    speaker: "Mrs. Zhang",
    text: "Welcome. We need to discuss the project timeline. I hope you have the results ready.",
    expression: "idle", 
    options: [
      { text: "Yes, Mrs. Zhang. Here is the complete breakdown.", nextNode: "provide_results" },
      { text: "Uh, about that... we hit a couple of unexpected delays.", nextNode: "angry_confrontation" }
    ]
  },
  provide_results: {
    speaker: "Mrs. Zhang",
    text: "Impressive work. This is exactly what I was looking for. Let us move to the next phase.",
    expression: "idle",
    options: [
      { text: "Thank you. Let's look at the deployment phase.", nextNode: "start" } // Loops back for demo
    ]
  },
  angry_confrontation: {
    speaker: "Mrs. Zhang",
    text: "Delays?! Again? We cannot afford another setback on this contract!",
    expression: "angry", // 👈 This automatically activates your blendshape loop
    options: [
      { text: "I take full responsibility. Here is our mitigation plan.", nextNode: "provide_results" },
      { text: "It wasn't my fault, the API endpoint went down!", nextNode: "defensive_loop" }
    ]
  },
  defensive_loop: {
    speaker: "Mrs. Zhang",
    text: "I do not want excuses, I want solutions! Fix this immediately.",
    expression: "angry",
    options: [
      { text: "Apologies. Resetting scenario...", nextNode: "start" }
    ]
  }
};

let currentNodeId = "start";

/* -------------------------------------------------------
   LOAD AU TIME-SERIES DATA & GLOBAL STATE
------------------------------------------------------- */

let animationFrames = [];
let morphableMeshes = []; 
let avatarLoaded = false;
let mode = "idle"; 

fetch('/threejs_animation.json')
  .then(res => res.json())
  .then(data => {
    animationFrames = data.frames; 
    console.log("Loaded frames:", animationFrames.length);
  });

/* -------------------------------------------------------
   AU → ARKIT MAPPING & SETUP
------------------------------------------------------- */

const auToArkitMapping = {
  au01_inner_brow_raiser: "browInnerUp",
  au02_outer_brow_raiser: ["browOuterUpLeft", "browOuterUpRight"],
  au04_brow_lowerer: ["browDownLeft", "browDownRight"],
  au05_upper_lid_raiser: ["eyeWideLeft", "eyeWideRight"],
  au06_cheek_raiser: ["cheekSquintLeft", "cheekSquintRight"],
  au07_lid_tightener: ["eyeSquintLeft", "eyeSquintRight"],
  au41_lid_droop: ["eyeLookDownLeft", "eyeLookDownRight"],
  au42_eye_squint: ["eyeSquintLeft", "eyeSquintRight"],
  au45_blink: ["eyeBlinkLeft", "eyeBlinkRight"],
  au09_nose_wrinkler: ["noseSneerLeft", "noseSneerRight"],
  au34_cheek_puff: "cheekPuff",
  au10_upper_lip_raiser: ["mouthUpperUpLeft", "mouthUpperUpRight"],
  au12_lip_corner_puller: "mouthSmile",
  au14_dimpler: ["mouthDimpleLeft", "mouthDimpleRight"],
  au15_lip_corner_depressor: ["mouthFrownLeft", "mouthFrownRight"],
  au16_lower_lip_depressor: "mouthShrugLower",
  au18_lip_pucker: "mouthPucker",
  au20_lip_stretcher: ["mouthStretchLeft", "mouthStretchRight"],
  au22_lip_funneler: "mouthFunnel",
  au25_lips_part: "mouthOpen",
  au26_jaw_drop: "jawOpen",
  au27_mouth_stretch: "mouthStretchLeft"
};

const EXPRESSION_GAIN = 1.25;
const scene = new THREE.Scene();

const textureLoader = new THREE.TextureLoader();
textureLoader.load('src/assets/background.png', (texture) => {
  texture.colorSpace = THREE.SRGBColorSpace;
  scene.background = texture;
});

const camera = new THREE.PerspectiveCamera(45, window.innerWidth / window.innerHeight, 0.1, 100);
// 🎥 Camera positioned looking directly at Mrs. Zhang from "Your" perspective
camera.position.set(0, 1.42, 1.5); 

const renderer = new THREE.WebGLRenderer({ antialias: true });
renderer.setSize(window.innerWidth, window.innerHeight);
renderer.toneMapping = THREE.ACESFilmicToneMapping;
renderer.toneMappingExposure = 0.85;
document.body.appendChild(renderer.domElement);

scene.add(new THREE.AmbientLight(0xffffff, 0.3));
const keyLight = new THREE.DirectionalLight(0xfff5eb, 1.5);
keyLight.position.set(1, 2.5, 2);
scene.add(keyLight);

const fillLight = new THREE.DirectionalLight(0xdbe7ff, 0.4);
fillLight.position.set(-1, 1.5, 1);
scene.add(fillLight);

/* -------------------------------------------------------
   LOAD GLB AVATAR
------------------------------------------------------- */

let mixer = null;
let idleAction = null;
const loader = new GLTFLoader();

loader.load('/models/agent_animations.glb', (gltf) => {
  const model = gltf.scene;
  scene.add(model);

  mixer = new THREE.AnimationMixer(model);

  if (gltf.animations.length > 0) {
    idleAction = mixer.clipAction(gltf.animations[0]);
    idleAction.play();
  }

  model.traverse((child) => {
    if (child.isMesh && child.morphTargetDictionary) {
      morphableMeshes.push(child);
    }
  });

  avatarLoaded = true;
  // Start the game interface once everything is ready
  goToDialogueNode(currentNodeId); 
});

/* -------------------------------------------------------
   AU ENGINE LOGIC
------------------------------------------------------- */

function applyAUFrame(mesh, frame) {
  if (!mesh || !frame) return;
  for (const [auKey, weight] of Object.entries(frame)) {
    if (auKey === "video_id" || auKey === "timestamp_norm") continue;
    const arkitTarget = auToArkitMapping[auKey];
    if (!arkitTarget) continue;
    const targets = Array.isArray(arkitTarget) ? arkitTarget : [arkitTarget];
    for (const target of targets) {
      const index = mesh.morphTargetDictionary[target];
      if (index === undefined) continue;
      mesh.morphTargetInfluences[index] = Math.min(weight * EXPRESSION_GAIN, 1.0);
    }
  }
}

function resetAllFaces() {
  morphableMeshes.forEach(mesh => {
    if (mesh.morphTargetInfluences) mesh.morphTargetInfluences.fill(0);
  });
}

/* -------------------------------------------------------
   DYNAMIC INTERACTIVE UI SYSTEM
------------------------------------------------------- */

// Create UI HTML Container dynamically
const gameUI = document.createElement("div");
gameUI.style.position = "absolute";
gameUI.style.bottom = "30px";
gameUI.style.left = "50%";
gameUI.style.transform = "translateX(-50%)";
gameUI.style.width = "80%%";
gameUI.style.maxWidth = "800px";
gameUI.style.display = "flex";
gameUI.style.flexDirection = "column";
gameUI.style.gap = "15px";
gameUI.style.zIndex = 1000;
gameUI.style.fontFamily = "sans-serif";
document.body.appendChild(gameUI);

function goToDialogueNode(nodeId) {
  currentNodeId = nodeId;
  const node = dialogueTree[nodeId];
  if (!node) return;

  // 1. Set the facial expression state
  mode = node.expression;
  resetAllFaces();
  
  if (mode === "idle" && idleAction) {
    idleAction.play();
    idleAction.reset();
  }

  // 2. Clear previous interface UI
  gameUI.innerHTML = "";

  // 3. Create Mrs. Zhang's Subtitle Box
  const dialogueBox = document.createElement("div");
  dialogueBox.style.background = "rgba(0, 0, 0, 0.75)";
  dialogueBox.style.color = "#fff";
  dialogueBox.style.padding = "20px";
  dialogueBox.style.borderRadius = "8px";
  dialogueBox.style.borderLeft = mode === "angry" ? "5px solid #ff4444" : "5px solid #44aaff";
  dialogueBox.innerHTML = `<strong>${node.speaker}:</strong> <p style="margin: 5px 0 0 0; line-height: 1.4;">${node.text}</p>`;
  gameUI.appendChild(dialogueBox);

  // 4. Create "Your" Action/Choice Container
  const choicesContainer = document.createElement("div");
  choicesContainer.style.display = "flex";
  choicesContainer.style.gap = "10px";
  choicesContainer.style.justifyContent = "center";

  node.options.forEach(option => {
    const choiceBtn = document.createElement("button");
    choiceBtn.innerText = option.text;
    choiceBtn.style.flex = "1";
    choiceBtn.style.padding = "12px";
    choiceBtn.style.background = "#fff";
    choiceBtn.style.border = "1px solid #ccc";
    choiceBtn.style.borderRadius = "4px";
    choiceBtn.style.cursor = "pointer";
    choiceBtn.style.fontWeight = "bold";
    choiceBtn.style.transition = "0.2s";

    choiceBtn.onmouseenter = () => choiceBtn.style.background = "#eeeeee";
    choiceBtn.onmouseleave = () => choiceBtn.style.background = "#ffffff";
    
    choiceBtn.onclick = () => {
      goToDialogueNode(option.nextNode);
    };

    choicesContainer.appendChild(choiceBtn);
  });

  gameUI.appendChild(choicesContainer);
}

/* -------------------------------------------------------
   ANIMATION LOOP
------------------------------------------------------- */

let lastTime = performance.now();
let totalElapsedTime = 0;

function animate() {
  requestAnimationFrame(animate);

  const now = performance.now();
  const delta = (now - lastTime) / 1000; 
  lastTime = now;

  if (!avatarLoaded) {
    renderer.render(scene, camera);
    return;
  }

  totalElapsedTime += delta;

  // Update underlying skeletal animations
  if (mixer) mixer.update(delta);

  // Apply custom expression maps if Mrs. Zhang is simulated as angry
  if (mode === "angry" && animationFrames.length > 0 && morphableMeshes.length > 0) {
    const loopDuration = 1.0; 
    const currentTime = (totalElapsedTime % loopDuration); 

    let targetFrame = animationFrames.find(f => f.t >= currentTime);
    if (!targetFrame) {
      targetFrame = animationFrames[animationFrames.length - 1];
    }
    
    morphableMeshes.forEach(mesh => {
      applyAUFrame(mesh, targetFrame);
    });
  }

  renderer.render(scene, camera);
}

animate();

/* -------------------------------------------------------
   RESIZE HANDLING
------------------------------------------------------- */

window.addEventListener('resize', () => {
  camera.aspect = window.innerWidth / window.innerHeight;
  camera.updateProjectionMatrix();
  renderer.setSize(window.innerWidth, window.innerHeight);
});