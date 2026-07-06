import * as THREE from 'three';
import { GLTFLoader } from 'three/examples/jsm/loaders/GLTFLoader.js';
import dialogueTree from './dialogueTree.js';
import auToArkitMapping from './auToArkitMapping.js';


let currentNodeId = "start";

/* -------------------------------------------------------
   LANGUAGE STATE
------------------------------------------------------- */

let currentLanguage = "en"; // Options: "en", "zh", "de"

/* -------------------------------------------------------
   LOAD AU TIME-SERIES DATA & GLOBAL STATE
------------------------------------------------------- */

let emotionClips = {};
let activeClip = null;
let emotionStartTime = 0;
let emotionDuration = 1.0;
let emotionFinished = false;

let morphableMeshes = []; 
let avatarLoaded = false;
let mode = "idle";
let clipsLoaded = false; // Track when clips are ready

const emotionFiles = {
  angry: 'trajectory/angry.json',
  ashamed: 'trajectory/ashamed.json',
  disgusted: 'trajectory/disgusted.json',
  fearful: 'trajectory/fearful.json',
  happy: 'trajectory/happy.json',
  neutral: 'trajectory/neutral.json',
  sad: 'trajectory/sad.json',
  surprised: 'trajectory/surprised.json',
  smile_polite: 'trajectory/smile_polite.json',
  smile_polite_slight_confusion: 'trajectory/smile_polite_slight_confusion.json',
  smile_polite_moderate_confusion: 'trajectory/smile_polite_moderate_confusion.json',
  smile_slight_ashamed: 'trajectory/smile_slight_ashamed.json'
};

Promise.all(
  Object.entries(emotionFiles).map(([name, path]) =>
    fetch(path).then(r => r.json()).then(data => [name, data])
  )
).then(entries => {
  emotionClips = Object.fromEntries(
    entries.map(([name, data]) => {
      return [
        name,
        {
          frames: data,
          duration: data[data.length - 1].timestamp_norm
        }
      ];
    })
  );
  clipsLoaded = true; // Mark clips as loaded
  console.log("Loaded emotions:", Object.keys(emotionClips));
}).catch(err => console.error("Failed to load emotion clips:", err));


const EXPRESSION_GAIN = 1.25;
const scene = new THREE.Scene();

function blendFrames(a, b, alpha) {
  const out = {};
  for (const key in a) {
    if (key === "timestamp_norm") continue;
    const v1 = a[key] ?? 0;
    const v2 = b[key] ?? 0;
    out[key] = v1 * (1 - alpha) + v2 * alpha;
  }
  return out;
}

function sampleEmotionClip(clip, tNorm) {
  if (!clip || clip.length === 0) return null;

  for (let i = 0; i < clip.length - 1; i++) {
    const f1 = clip[i];
    const f2 = clip[i + 1];

    if (tNorm >= f1.timestamp_norm && tNorm <= f2.timestamp_norm) {
      const alpha =
        (tNorm - f1.timestamp_norm) /
        (f2.timestamp_norm - f1.timestamp_norm + 1e-6);

      return blendFrames(f1, f2, alpha);
    }
  }

  return clip[clip.length - 1];
}

function getClipDuration(clip) {
  return clip?.length ? clip[clip.length - 1].timestamp_norm : 1.0;
}


const textureLoader = new THREE.TextureLoader();
textureLoader.load('src/assets/background.png', (texture) => {
  texture.colorSpace = THREE.SRGBColorSpace;
  scene.background = texture;
});

const camera = new THREE.PerspectiveCamera(45, window.innerWidth / window.innerHeight, 0.1, 100);
camera.position.set(0, 1.6, 0.8); 

const renderer = new THREE.WebGLRenderer({ antialias: true });
renderer.setSize(window.innerWidth, window.innerHeight);
renderer.setPixelRatio(Math.min(window.devicePixelRatio, 2));
renderer.toneMapping = THREE.ACESFilmicToneMapping;
renderer.toneMappingExposure = 0.85;
renderer.domElement.style.position = 'fixed';
renderer.domElement.style.top = '0';
renderer.domElement.style.left = '0';
renderer.domElement.style.width = '100%';
renderer.domElement.style.height = '100%';
renderer.domElement.style.margin = '0';
renderer.domElement.style.padding = '0';
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

// Language Toggle Button
const langToggle = document.createElement("button");
langToggle.innerText = "EN";
langToggle.style.position = "absolute";
langToggle.style.top = "20px";
langToggle.style.right = "20px";
langToggle.style.padding = "10px 20px";
langToggle.style.backgroundColor = "rgba(0, 0, 0, 0.7)";
langToggle.style.color = "#fff";
langToggle.style.border = "1px solid #fff";
langToggle.style.borderRadius = "5px";
langToggle.style.cursor = "pointer";
langToggle.style.zIndex = 2000;
langToggle.style.fontFamily = "sans-serif";
langToggle.style.fontWeight = "600";
langToggle.onclick = () => {
  const languages = ["en", "zh", "de"];
  const currentIndex = languages.indexOf(currentLanguage);
  currentLanguage = languages[(currentIndex + 1) % languages.length];
  langToggle.innerText = currentLanguage.toUpperCase();
  // Refresh current dialogue node with new language
  goToDialogueNode(currentNodeId);
};
document.body.appendChild(langToggle);

const gameUI = document.createElement("div");
gameUI.style.position = "absolute";
gameUI.style.bottom = "30px";
gameUI.style.left = "50%";
gameUI.style.transform = "translateX(-50%)";
gameUI.style.width = "80%";
gameUI.style.maxWidth = "800px";
gameUI.style.maxHeight = "40vh";
gameUI.style.overflowY = "auto";
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

  // 1. Set emotion state
  mode = node.expression;
  emotionStartTime = performance.now();
  emotionFinished = false;

  // 2. Clear previous interface UI
  gameUI.innerHTML = "";

  // 3. Create Mrs. Zhang's Subtitle Box
  const dialogueBox = document.createElement("div");
  dialogueBox.style.background = "rgba(0, 0, 0, 0.75)";
  dialogueBox.style.color = "#fff";
  dialogueBox.style.padding = "20px";
  dialogueBox.style.borderRadius = "8px";
  
  // Get speaker based on current language (handle both object and string formats)
  const nodeSpeaker = typeof node.speaker === 'object' ? node.speaker[currentLanguage] || node.speaker.en : node.speaker;
  
  // Update border color logic to handle multi-language speaker
  let borderColor = "#44aaff";
  const speakerKey = typeof node.speaker === 'object' ? node.speaker.en : node.speaker;
  if (speakerKey === "Narrator") {
    borderColor = "#888888";
  } else if (speakerKey === "Mrs. Zhang") {
    borderColor = mode === "angry" ? "#ff4444" : "#44aaff";
  } else if (speakerKey === "Learning Feedback") {
    borderColor = "#ffa500";
  } else if (speakerKey === "You") {
    borderColor = "#4caf50";
  }
  dialogueBox.style.borderLeft = `5px solid ${borderColor}`;
  
  // Get text based on current language (handle both object and string formats)
  const nodeText = typeof node.text === 'object' ? node.text[currentLanguage] || node.text.en : node.text;
  const formattedText = nodeText.replace(/\n/g, '<br>');
  
  dialogueBox.innerHTML = `<strong>${nodeSpeaker}:</strong> <p style="margin: 5px 0 0 0; line-height: 1.4; white-space: pre-wrap;">${formattedText}</p>`;
  gameUI.appendChild(dialogueBox);

  // 4. Create "Your" Action/Choice Container
  const choicesContainer = document.createElement("div");
  choicesContainer.style.display = "flex";
  choicesContainer.style.gap = "10px";
  choicesContainer.style.justifyContent = "center";

  node.options.forEach(option => {
    const choiceBtn = document.createElement("button");
    // Get option text based on current language (handle both object and string formats)
    const optionText = typeof option.text === 'object' ? option.text[currentLanguage] || option.text.en : option.text;
    choiceBtn.innerText = optionText;
    choiceBtn.style.flex = "1";
    choiceBtn.style.padding = "12px";
    choiceBtn.style.background = "#fff";
    choiceBtn.style.border = "1px solid #ccc";
    choiceBtn.style.borderRadius = "4px";
    choiceBtn.style.cursor = "pointer";
    choiceBtn.style.fontWeight = "bold";
    choiceBtn.style.fontFamily = "sans-serif";
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

function animate() {
  requestAnimationFrame(animate);

  const now = performance.now();
  const delta = (now - lastTime) / 1000; 
  lastTime = now;

  if (!avatarLoaded) {
    renderer.render(scene, camera);
    return;
  }

  // Update underlying skeletal animations
  if (mixer) mixer.update(delta);

  // FIX: Only process emotions if clips are loaded
  if (clipsLoaded && mode !== "idle") {
    const clip = emotionClips[mode];

    if (clip && clip.frames) {
      const elapsed = (now - emotionStartTime) / 1000;
      const duration = getClipDuration(clip.frames);
      const tNorm = Math.min(elapsed / duration, 1.0);

      const frame = sampleEmotionClip(clip.frames, tNorm);

      if (frame) {
        morphableMeshes.forEach(mesh => {
          applyAUFrame(mesh, frame);
        });
      }

      // FIX: Transition back to idle when animation finishes
      if (elapsed >= duration) {
        mode = "idle";
        emotionStartTime = now;
      }
    }
  } else if (mode === "idle") {
    // FIX: Only reset when truly idle
    resetAllFaces();
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
  renderer.domElement.style.width = '100%';
  renderer.domElement.style.height = '100%';
});