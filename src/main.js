import * as THREE from 'three';
import { GLTFLoader } from 'three/examples/jsm/loaders/GLTFLoader.js';

// Profile Values
const emotionProfiles = {
  angry: {
    "au01_inner_brow_raiser": 0.246,
    "au02_outer_brow_raiser": 0.169,
    "au04_brow_lowerer": 0.283,
    "au05_upper_lid_raiser": 0.226,
    "au06_cheek_raiser": 0.154,
    "au07_lid_tightener": 0.272,
    "au09_nose_wrinkler": 0.033,
    "au10_upper_lip_raiser": 0.043,
    "au12_lip_corner_puller": 0.101,
    "au14_dimpler": 0.033,
    "au15_lip_corner_depressor": 0.077,
    "au17_chin_raiser": 0.079,
    "au18_lip_pucker": 0.17,
    "au20_lip_stretcher": 0.1,
    "au23_lip_tightener": 0.165,
    "au24_lip_pressor": 0.036,
    "au25_lips_part": 0.142,
    "au26_jaw_drop": 0.139,
    "au27_mouth_stretch": 0,
    "au38_nostril_dilator": 0,
    "au41_lid_droop": 0,
    "au43_eye_closure": 0,
    "au45_blink": 0,
    "eye_openness": 0.197,
    "eyelid_tension": 0.232,
    "gaze_stability": 0.108,
    "pitch": 0.095,
    "yaw": 0.162,
    "roll": 0.025,
    "gesture_activity": 0.238,
    "movement_intensity": 0.078,
    "hand_activity": 0
  },
  disgusted: {
    "au01_inner_brow_raiser": 0.18,
    "au02_outer_brow_raiser": 0.095,
    "au04_brow_lowerer": 0.355,
    "au05_upper_lid_raiser": 0.05,
    "au06_cheek_raiser": 0.05,
    "au07_lid_tightener": 0.17,
    "au09_nose_wrinkler": 0.12,
    "au10_upper_lip_raiser": 0.07,
    "au11_nasolabial_deepener": 0.06,
    "au12_lip_corner_puller": 0.025,
    "au13_sharp_lip_puller": 0,
    "au14_dimpler": 0,
    "au15_lip_corner_depressor": 0.1,
    "au16_lower_lip_depressor": 0,
    "au17_chin_raiser": 0.07,
    "au18_lip_pucker": 0,
    "au19_tongue_show": 0,
    "au20_lip_stretcher": 0,
    "au22_lip_funneler": 0,
    "au23_lip_tightener": 0.02,
    "au24_lip_pressor": 0,
    "au25_lips_part": 0.325,
    "au26_jaw_drop": 0.105,
    "au27_mouth_stretch": 0,
    "au28_lip_suck": 0,
    "au30_jaw_sideways": 0,
    "au32_lip_bite": 0,
    "au33_blowing": 0,
    "au34_cheek_puff": 0,
    "au35_cheek_suck": 0,
    "au01_inner_brow_raiser": 0.199,
    "au02_outer_brow_raiser": 0.115,
    "au04_brow_lowerer": 0.237,
    "au05_upper_lid_raiser": 0.174,
    "au06_cheek_raiser": 0.22,
    "au07_lid_tightener": 0.259,
    "au09_nose_wrinkler": 0.063,
    "au10_upper_lip_raiser": 0.079,
    "au12_lip_corner_puller": 0.253,
    "au14_dimpler": 0,
    "au15_lip_corner_depressor": 0.203,
    "au17_chin_raiser": 0.134,
    "au18_lip_pucker": 0.155,
    "au20_lip_stretcher": 0,
    "au23_lip_tightener": 0,
    "au24_lip_pressor": 0.095,
    "au25_lips_part": 0.122,
    "au26_jaw_drop": 0.134,
    "au27_mouth_stretch": 0,
    "au38_nostril_dilator": 0,
    "au41_lid_droop": 0,
    "au43_eye_closure": 0.29,
    "au45_blink": 0,
    "eye_openness": 0.184,
    "eyelid_tension": 0.214,
    "gaze_stability": 0.067,
    "pitch": 0.04,
    "yaw": 0.165,
    "roll": 0.086,
    "gesture_activity": 0.247,
    "movement_intensity": 0.143,
    "hand_activity": 0.292
  },
  fearful: {
    "au01_inner_brow_raiser": 0.24,
    "au02_outer_brow_raiser": 0.172,
    "au04_brow_lowerer": 0.303,
    "au05_upper_lid_raiser": 0.199,
    "au06_cheek_raiser": 0.032,
    "au07_lid_tightener": 0.249,
    "au09_nose_wrinkler": 0,
    "au10_upper_lip_raiser": 0.047,
    "au12_lip_corner_puller": 0.032,
    "au14_dimpler": 0,
    "au15_lip_corner_depressor": 0.167,
    "au17_chin_raiser": 0.134,
    "au18_lip_pucker": 0.19,
    "au20_lip_stretcher": 0,
    "au23_lip_tightener": 0.18,
    "au24_lip_pressor": 0.138,
    "au25_lips_part": 0.142,
    "au26_jaw_drop": 0.149,
    "au27_mouth_stretch": 0,
    "au38_nostril_dilator": 0,
    "au41_lid_droop": 0,
    "au43_eye_closure": 0.253,
    "au45_blink": 0,
    "eye_openness": 0.172,
    "eyelid_tension": 0.199,
    "gaze_stability": 0.088,
    "pitch": 0.082,
    "yaw": 0.127,
    "roll": 0.04,
    "gesture_activity": 0.294,
    "movement_intensity": 0.228,
    "hand_activity": 0.335
  },
  happy: {
    "au01_inner_brow_raiser": 0.158,
    "au02_outer_brow_raiser": 0.129,
    "au04_brow_lowerer": 0.106,
    "au05_upper_lid_raiser": 0.179,
    "au06_cheek_raiser": 0.165,
    "au07_lid_tightener": 0.154,
    "au09_nose_wrinkler": 0,
    "au10_upper_lip_raiser": 0,
    "au12_lip_corner_puller": 0.231,
    "au14_dimpler": 0,
    "au15_lip_corner_depressor": 0.067,
    "au17_chin_raiser": 0.09,
    "au18_lip_pucker": 0.203,
    "au20_lip_stretcher": 0,
    "au23_lip_tightener": 0.063,
    "au24_lip_pressor": 0.142,
    "au25_lips_part": 0.164,
    "au26_jaw_drop": 0.196,
    "au27_mouth_stretch": 0.095,
    "au38_nostril_dilator": 0,
    "au41_lid_droop": 0,
    "au43_eye_closure": 0,
    "au45_blink": 0.063,
    "eye_openness": 0.125,
    "eyelid_tension": 0.111,
    "gaze_stability": 0.075,
    "pitch": 0.069,
    "yaw": 0.096,
    "roll": 0.033,
    "gesture_activity": 0.189,
    "movement_intensity": 0.123,
    "hand_activity": 0.264
  },
  neutral: {
    "au01_inner_brow_raiser": 0.129,
    "au02_outer_brow_raiser": 0.063,
    "au04_brow_lowerer": 0.32,
    "au05_upper_lid_raiser": 0.182,
    "au06_cheek_raiser": 0.22,
    "au07_lid_tightener": 0.264,
    "au09_nose_wrinkler": 0.079,
    "au10_upper_lip_raiser": 0.063,
    "au12_lip_corner_puller": 0.296,
    "au14_dimpler": 0.047,
    "au15_lip_corner_depressor": 0.146,
    "au17_chin_raiser": 0.12,
    "au18_lip_pucker": 0.142,
    "au20_lip_stretcher": 0,
    "au23_lip_tightener": 0.189,
    "au24_lip_pressor": 0.126,
    "au25_lips_part": 0.216,
    "au26_jaw_drop": 0.15,
    "au27_mouth_stretch": 0,
    "au38_nostril_dilator": 0,
    "au41_lid_droop": 0,
    "au43_eye_closure": 0.339,
    "au45_blink": 0.22,
    "eye_openness": 0.255,
    "eyelid_tension": 0.258,
    "gaze_stability": 0.178,
    "pitch": 0.099,
    "yaw": 0.136,
    "roll": 0.063,
    "gesture_activity": 0.227,
    "movement_intensity": 0.161,
    "hand_activity": 0.26
  },
  sad: {
    "au01_inner_brow_raiser": 0.238,
    "au02_outer_brow_raiser": 0.237,
    "au04_brow_lowerer": 0.276,
    "au05_upper_lid_raiser": 0.293,
    "au06_cheek_raiser": 0.112,
    "au07_lid_tightener": 0.266,
    "au09_nose_wrinkler": 0.111,
    "au10_upper_lip_raiser": 0.095,
    "au12_lip_corner_puller": 0.142,
    "au14_dimpler": 0.079,
    "au15_lip_corner_depressor": 0.196,
    "au17_chin_raiser": 0.154,
    "au18_lip_pucker": 0,
    "au20_lip_stretcher": 0,
    "au23_lip_tightener": 0.218,
    "au24_lip_pressor": 0,
    "au25_lips_part": 0.153,
    "au26_jaw_drop": 0.164,
    "au27_mouth_stretch": 0,
    "au38_nostril_dilator": 0.047,
    "au41_lid_droop": 0.063,
    "au43_eye_closure": 0.237,
    "au45_blink": 0,
    "eye_openness": 0.226,
    "eyelid_tension": 0.237,
    "gaze_stability": 0.058,
    "pitch": 0.094,
    "yaw": 0.144,
    "roll": 0.045,
    "gesture_activity": 0.247,
    "movement_intensity": 0.199,
    "hand_activity": 0.278
  },
  surprised: {
    "au01_inner_brow_raiser": 0.139,
    "au02_outer_brow_raiser": 0.12,
    "au04_brow_lowerer": 0.273,
    "au05_upper_lid_raiser": 0.218,
    "au06_cheek_raiser": 0.206,
    "au07_lid_tightener": 0.26,
    "au09_nose_wrinkler": 0.19,
    "au10_upper_lip_raiser": 0.174,
    "au12_lip_corner_puller": 0.075,
    "au14_dimpler": 0,
    "au15_lip_corner_depressor": 0.146,
    "au17_chin_raiser": 0.114,
    "au18_lip_pucker": 0,
    "au20_lip_stretcher": 0,
    "au23_lip_tightener": 0.111,
    "au24_lip_pressor": 0,
    "au25_lips_part": 0.112,
    "au26_jaw_drop": 0.148,
    "au27_mouth_stretch": 0,
    "au38_nostril_dilator": 0,
    "au41_lid_droop": 0,
    "au43_eye_closure": 0,
    "au45_blink": 0,
    "eye_openness": 0.198,
    "eyelid_tension": 0.237,
    "gaze_stability": 0.101,
    "pitch": 0.072,
    "yaw": 0.173,
    "roll": 0.034,
    "gesture_activity": 0.254,
    "movement_intensity": 0.191,
    "hand_activity": 0.296
  }
}

// Mapping AU to ARKIT parameters
const auToArkitMapping = {
  // --- Brows ---
  "au01_inner_brow_raiser": "browInnerUp",
  "au02_outer_brow_raiser": ["browOuterUpLeft", "browOuterUpRight"],
  "au04_brow_lowerer": ["browDownLeft", "browDownRight"],
  
  // --- Eyes ---
  "au05_upper_lid_raiser": ["eyeWideLeft", "eyeWideRight"],
  "au06_cheek_raiser": ["cheekSquintLeft", "cheekSquintRight"],
  "au07_lid_tightener": ["eyeSquintLeft", "eyeSquintRight"],
  "au41_lid_droop": ["eyeLookDownLeft", "eyeLookDownRight"], // Approximation
  "au42_eye_squint": ["eyeSquintLeft", "eyeSquintRight"],
  "au45_blink": ["eyeBlinkLeft", "eyeBlinkRight"],
  
  // --- Nose/Cheek ---
  "au09_nose_wrinkler": ["noseSneerLeft", "noseSneerRight"],
  "au34_cheek_puff": "cheekPuff",
  
  // --- Mouth/Jaw ---
  "au10_upper_lip_raiser": ["mouthUpperUpLeft", "mouthUpperUpRight"],
  "au12_lip_corner_puller": "mouthSmile",
  "au14_dimpler": ["mouthDimpleLeft", "mouthDimpleRight"],
  "au15_lip_corner_depressor": ["mouthFrownLeft", "mouthFrownRight"],
  "au16_lower_lip_depressor": "mouthShrugLower",
  "au18_lip_pucker": "mouthPucker",
  "au20_lip_stretcher": ["mouthStretchLeft", "mouthStretchRight"],
  "au22_lip_funneler": "mouthFunnel",
  "au25_lips_part": "mouthOpen",
  "au26_jaw_drop": "jawOpen",
  "au27_mouth_stretch": "mouthStretchLeft" 
};

// 1. Setup the Fixed Student POV Environment
const scene = new THREE.Scene();
scene.background = new THREE.Color(0x0a0a0a); // Deep darkness to highlight the character face

const camera = new THREE.PerspectiveCamera(45, window.innerWidth / window.innerHeight, 0.1, 100);
camera.position.set(0, 1.42, 1.5); // Fixed student seat vector

const renderer = new THREE.WebGLRenderer({ antialias: true });
renderer.setSize(window.innerWidth, window.innerHeight);
renderer.toneMapping = THREE.ACESFilmicToneMapping; 
document.body.appendChild(renderer.domElement);

// High-Contrast Demonstration Lighting
const ambientLight = new THREE.AmbientLight(0xffffff, 0.3);
scene.add(ambientLight);
const keyLight = new THREE.DirectionalLight(0xfff5eb, 1.5); // Brightened up for stark facial highlights
keyLight.position.set(1, 2.5, 2);
scene.add(keyLight);
const fillLight = new THREE.DirectionalLight(0xdbe7ff, 0.4); 
fillLight.position.set(-1, 1.5, 1);
scene.add(fillLight);

// Reference Placeholders
let agentModel = null;
let neckBone = null;
let headBone = null;
let leftEyeBone = null;
let rightEyeBone = null;
let faceMeshReference = null;
let avatarLoaded = false;

// 2. Import the Teacher Model
const loader = new GLTFLoader();
loader.load(
  '/models/agent.glb', 
  (gltf) => {
    agentModel = gltf.scene;
    scene.add(agentModel);
    agentModel.position.set(0, 0, 0); 

    agentModel.traverse((child) => {
      if (child.isBone) {
        if (child.name === 'Neck') neckBone = child;
        if (child.name === 'Head') headBone = child;
        if (child.name === 'LeftEye') leftEyeBone = child;
        if (child.name === 'RightEye') rightEyeBone = child;
      }
      if (child.isMesh && child.morphTargetDictionary) {
        // --- LOG THE DICTIONARY HERE ---
        console.log("Mesh Name:", child.name);
        console.log("Morph Target Dictionary:", child.morphTargetDictionary);

        // If this is your head mesh, store it
        if (child.name.includes('Head')) faceMeshReference = child;
      }
    });

    avatarLoaded = true;
    console.log("Teacher asset loaded into Demonstration Mode.");
  },
  undefined,
  (error) => { console.error('Loader error:', error); }
);

// Gain to test the prompt value strength
const EXPRESSION_GAIN = 1.25;

function setExpression(mesh, targetKey, weight) {
  if (!mesh) return;

  const targetIndex = mesh.morphTargetDictionary[targetKey];

  if (targetIndex !== undefined) {

    const amplifiedWeight =
      Math.min(weight * EXPRESSION_GAIN, 1.0);

    mesh.morphTargetInfluences[targetIndex] =
      amplifiedWeight;
  }
}


function resetAllExpressions(mesh) {
  if (!mesh) return;
  mesh.morphTargetInfluences.fill(0);
}


function applyEmotionProfile(mesh, profileName) {
  if (!mesh) return;
  resetAllExpressions(mesh);

  const profile = emotionProfiles[profileName];
  if (!profile) return;

  for (const [auKey, weight] of Object.entries(profile)) {
    const arkitTarget = auToArkitMapping[auKey];
    if (!arkitTarget) continue;

    const targets = Array.isArray(arkitTarget) ? arkitTarget : [arkitTarget];
    for (const target of targets) {
      setExpression(mesh, target, weight);
    }
  }
}


const studentPOV = new THREE.Vector3();
camera.getWorldPosition(studentPOV);


// UI Panel
const EMOTIONS = ['angry', 'disgusted', 'fearful', 'happy', 'neutral', 'sad', 'surprised'];
let activeEmotion = 'neutral';

const ui = document.createElement('div');
ui.style.cssText = `
  position: absolute; top: 20px; left: 20px; z-index: 100;
`;
ui.innerHTML = `
  <div style="background: rgba(0,0,0,0.85); padding: 18px; border-radius: 3px;
              border: 3px solid #00ffcc; font-family: sans-serif;">
    <h3 style="color: #00ffcc; margin: 3px 0 15px 0; font-size: 18px;
               text-transform: uppercase; font-weight: bold; letter-spacing: 1px;">Emotion State</h3>
    <div id="emotion-buttons" style="display: flex; flex-direction:column; flex-wrap: wrap; gap: 6px;">
      ${EMOTIONS.map(e => `
        <button id="btn-${e}" data-emotion="${e}"
          style="padding: 15px 5px; font-weight: semibold; cursor: pointer;
                 background: #222; color: #ccc; border: 1px solid #555;
                 border-radius: 2px; text-transform: capitalize;">
          ${e}
        </button>
      `).join('')}
    </div>
    <p style="color: white; margin: 14px 0 0 0; font-size: 14px; text-align:center">
      Active: <strong id="state-txt" style="color: #00ffcc; text-transform: uppercase;">neutral</strong>
    </p>
  </div>
`;
document.body.appendChild(ui);

function setActiveEmotion(name) {
  activeEmotion = name;
  document.getElementById('state-txt').innerText = name;
  EMOTIONS.forEach(e => {
    const btn = document.getElementById(`btn-${e}`);
    btn.style.background = e === name ? '#00ffcc' : '#222';
    btn.style.color      = e === name ? '#000'    : '#ccc';
  });
  if (avatarLoaded) applyEmotionProfile(faceMeshReference, name);
}

document.getElementById('emotion-buttons').addEventListener('click', (e) => {
  const emotion = e.target.dataset.emotion;
  if (emotion) setActiveEmotion(emotion);
});

setActiveEmotion('neutral');


// 4. Automated Demonstration Render Loop
const clock = new THREE.Clock();

function animate() {
  requestAnimationFrame(animate);
  const time = clock.getElapsedTime();

  if (avatarLoaded) {
    // Exaggerated organic baseline rhythm variables for clear contrast
    const naturalSwayX = Math.sin(time * 1.2) * 0.08;
    const naturalSwayY = Math.cos(time * 0.6) * 0.02;

    agentModel.position.set(naturalSwayX, naturalSwayY, 0);

    const lookAwayTimer = time % 4.0;
    if (lookAwayTimer > 2.5) {
      if (neckBone) neckBone.rotation.set(0.15, 0.45, 0);
      if (leftEyeBone && rightEyeBone) {
        leftEyeBone.rotation.set(0.2, 0.2, 0);
        rightEyeBone.rotation.set(0.2, 0.2, 0);
      }
    } else {
      if (neckBone) neckBone.lookAt(studentPOV);
      if (headBone) headBone.lookAt(studentPOV);
      if (leftEyeBone && rightEyeBone) {
        leftEyeBone.lookAt(studentPOV);
        rightEyeBone.lookAt(studentPOV);
      }
    }

    // // Standard structural reset
    // agentModel.position.set(0, 0, 0); 
    // if (neckBone) neckBone.rotation.set(0, 0, 0);
    // if (headBone) headBone.rotation.set(0, 0, 0);
    // if (leftEyeBone && rightEyeBone) {
    //   leftEyeBone.rotation.set(0, 0, 0);
    //   rightEyeBone.rotation.set(0, 0, 0);
    // }
    // resetAllExpressions(faceMeshReference);
    // }
  }

  renderer.render(scene, camera);
}

window.addEventListener('resize', () => {
  camera.aspect = window.innerWidth / window.innerHeight;
  camera.updateProjectionMatrix();
  renderer.setSize(window.innerWidth, window.innerHeight);
});

animate();