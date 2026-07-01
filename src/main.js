import * as THREE from 'three';
import { GLTFLoader } from 'three/examples/jsm/loaders/GLTFLoader.js';

/* -------------------------------------------------------
   LOAD AU TIME-SERIES DATA
------------------------------------------------------- */

let animationFrames = [];
// 1. 👉 Changed from a single reference to an array
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
   AU → ARKIT MAPPING
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

/* -------------------------------------------------------
   THREE.JS SCENE SETUP
------------------------------------------------------- */

const scene = new THREE.Scene();

const textureLoader = new THREE.TextureLoader();
textureLoader.load('src/assets/background.png', (texture) => {
  texture.colorSpace = THREE.SRGBColorSpace;
  scene.background = texture;
});

const camera = new THREE.PerspectiveCamera(
  45,
  window.innerWidth / window.innerHeight,
  0.1,
  100
);
camera.position.set(0, 1.42, 1.5);

const renderer = new THREE.WebGLRenderer({ antialias: true });
renderer.setSize(window.innerWidth, window.innerHeight);
renderer.toneMapping = THREE.ACESFilmicToneMapping;
renderer.toneMappingExposure = 0.85;
document.body.appendChild(renderer.domElement);

/* -------------------------------------------------------
   LIGHTING
------------------------------------------------------- */

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
      // 2. 👉 Push ALL valid meshes into our array
      morphableMeshes.push(child);
      console.log("Collected morph mesh:", child.name);
    }
  });

  avatarLoaded = true;
});

/* -------------------------------------------------------
   APPLY AU FRAME
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

/* -------------------------------------------------------
   RESET EXPRESSIONS
------------------------------------------------------- */

function resetAllFaces() {
  // 3. 👉 Loop through all meshes to reset them
  morphableMeshes.forEach(mesh => {
    if (mesh.morphTargetInfluences) {
      mesh.morphTargetInfluences.fill(0);
    }
  });
}

/* -------------------------------------------------------
   UI BUTTON (ANGRY TOGGLE)
------------------------------------------------------- */

const btn = document.createElement("button");
btn.innerText = "TRIGGER ANGRY";
btn.style.position = "absolute";
btn.style.top = "20px";
btn.style.left = "20px";
btn.style.padding = "10px 16px";
btn.style.zIndex = 1000;
btn.style.background = "#ff4444";
btn.style.color = "white";
btn.style.border = "none";
btn.style.cursor = "pointer";

document.body.appendChild(btn);

btn.onclick = () => {
  if (!avatarLoaded) return;

  if (mode === "idle") {
    mode = "angry";
    btn.innerText = "BACK TO IDLE";
    resetAllFaces();
  } else {
    mode = "idle";
    btn.innerText = "TRIGGER ANGRY";
    resetAllFaces();

    if (idleAction) {
      idleAction.play();
      idleAction.reset();
    }
  }
};

/* -------------------------------------------------------
   ANIMATION LOOP
------------------------------------------------------- */

// 4. 👉 Swapped THREE.Clock out for native high-res timestamps to fix the deprecation warning
let lastTime = performance.now();
let totalElapsedTime = 0;

function animate() {
  requestAnimationFrame(animate);

  const now = performance.now();
  const delta = (now - lastTime) / 1000; // seconds
  lastTime = now;

  if (!avatarLoaded) {
    renderer.render(scene, camera);
    return;
  }

  totalElapsedTime += delta;

  // 1. Let the base mixer run first (updates body joints)
  if (mixer) mixer.update(delta);

  // 2. Layer custom animations on top second
  if (mode === "angry" && animationFrames.length > 0 && morphableMeshes.length > 0) {
    const loopDuration = 1.0; 
    const currentTime = (totalElapsedTime % loopDuration); 

    let targetFrame = animationFrames.find(f => f.t >= currentTime);
    if (!targetFrame) {
      targetFrame = animationFrames[animationFrames.length - 1];
    }
    
    // 5. 👉 Apply the frame data to EVERY collected mesh
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