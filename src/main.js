import * as THREE from 'three';
import { GLTFLoader } from 'three/examples/jsm/loaders/GLTFLoader.js';

// Profile Values
const emotionProfiles = {
  angry: {
    "au01_inner_brow_raiser": 0.275,
    "au02_outer_brow_raiser": 0.12,
    "au04_brow_lowerer": 0.305,
    "au05_upper_lid_raiser": 0.065,
    "au06_cheek_raiser": 0.105,
    "au07_lid_tightener": 0.16,
    "au09_nose_wrinkler": 0.135,
    "au10_upper_lip_raiser": 0.1,
    "au11_nasolabial_deepener": 0.125,
    "au12_lip_corner_puller": 0.03,
    "au13_sharp_lip_puller": 0,
    "au14_dimpler": 0,
    "au15_lip_corner_depressor": 0.18,
    "au16_lower_lip_depressor": 0.02,
    "au17_chin_raiser": 0.15,
    "au18_lip_pucker": 0,
    "au19_tongue_show": 0,
    "au20_lip_stretcher": 0,
    "au22_lip_funneler": 0,
    "au23_lip_tightener": 0.04,
    "au24_lip_pressor": 0,
    "au25_lips_part": 0.385,
    "au26_jaw_drop": 0.18,
    "au27_mouth_stretch": 0,
    "au28_lip_suck": 0,
    "au30_jaw_sideways": 0,
    "au32_lip_bite": 0,
    "au33_blowing": 0,
    "au34_cheek_puff": 0,
    "au35_cheek_suck": 0,
    "au36_tongue_bulge": 0,
    "au38_nostril_dilator": 0.01,
    "au39_nostril_compressor": 0,
    "au41_lid_droop": 0.06,
    "au42_eye_squint": 0.095,
    "au43_eye_closure": 0,
    "au44_eye_squint_intense": 0,
    "au45_blink": 0.005,
    "au46_wink": 0,
    "eye_openness": 0.6,
    "eyelid_tension": 0.415,
    "gaze_stability": 0.78,
    "pitch": 0.05,
    "yaw": 0.065,
    "roll": 0,
    "gesture_activity": 0.24,
    "movement_intensity": 0.22
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
    "au36_tongue_bulge": 0,
    "au38_nostril_dilator": 0.02,
    "au39_nostril_compressor": 0.01,
    "au41_lid_droop": 0.12,
    "au42_eye_squint": 0.1,
    "au43_eye_closure": 0.08,
    "au44_eye_squint_intense": 0.01,
    "au45_blink": 0,
    "au46_wink": 0,
    "eye_openness": 0.575,
    "eyelid_tension": 0.34,
    "gaze_stability": 0.78,
    "pitch": 0.03,
    "yaw": 0.04,
    "roll": 0,
    "gesture_activity": 0.335,
    "movement_intensity": 0.26
  },
  fearful: {
    "au01_inner_brow_raiser": 0.265,
    "au02_outer_brow_raiser": 0.14,
    "au04_brow_lowerer": 0.48,
    "au05_upper_lid_raiser": 0.075,
    "au06_cheek_raiser": 0.1,
    "au07_lid_tightener": 0.32,
    "au09_nose_wrinkler": 0.165,
    "au10_upper_lip_raiser": 0.08,
    "au11_nasolabial_deepener": 0.08,
    "au12_lip_corner_puller": 0,
    "au13_sharp_lip_puller": 0,
    "au14_dimpler": 0,
    "au15_lip_corner_depressor": 0.19,
    "au16_lower_lip_depressor": 0.07,
    "au17_chin_raiser": 0.17,
    "au18_lip_pucker": 0,
    "au19_tongue_show": 0,
    "au20_lip_stretcher": 0,
    "au22_lip_funneler": 0,
    "au23_lip_tightener": 0.04,
    "au24_lip_pressor": 0.045,
    "au25_lips_part": 0.305,
    "au26_jaw_drop": 0.145,
    "au27_mouth_stretch": 0,
    "au28_lip_suck": 0,
    "au30_jaw_sideways": 0,
    "au32_lip_bite": 0,
    "au33_blowing": 0,
    "au34_cheek_puff": 0,
    "au35_cheek_suck": 0,
    "au36_tongue_bulge": 0,
    "au38_nostril_dilator": 0,
    "au39_nostril_compressor": 0,
    "au41_lid_droop": 0.205,
    "au42_eye_squint": 0.16,
    "au43_eye_closure": 0.2,
    "au44_eye_squint_intense": 0.07,
    "au45_blink": 0.2,
    "au46_wink": 0,
    "eye_openness": 0.475,
    "eyelid_tension": 0.455,
    "gaze_stability": 0.7,
    "pitch": 0.03,
    "yaw": 0.06,
    "roll": 0,
    "gesture_activity": 0.34,
    "movement_intensity": 0.285
  },
  happy: {
    "au01_inner_brow_raiser": 0.03,
    "au02_outer_brow_raiser": 0.02,
    "au04_brow_lowerer": 0.09,
    "au05_upper_lid_raiser": 0,
    "au06_cheek_raiser": 0.24,
    "au07_lid_tightener": 0.02,
    "au09_nose_wrinkler": 0,
    "au10_upper_lip_raiser": 0,
    "au11_nasolabial_deepener": 0,
    "au12_lip_corner_puller": 0.37,
    "au13_sharp_lip_puller": 0,
    "au14_dimpler": 0.07,
    "au15_lip_corner_depressor": 0.005,
    "au16_lower_lip_depressor": 0,
    "au17_chin_raiser": 0.015,
    "au18_lip_pucker": 0,
    "au19_tongue_show": 0,
    "au20_lip_stretcher": 0,
    "au22_lip_funneler": 0,
    "au23_lip_tightener": 0,
    "au24_lip_pressor": 0,
    "au25_lips_part": 0.375,
    "au26_jaw_drop": 0.15,
    "au27_mouth_stretch": 0,
    "au28_lip_suck": 0,
    "au30_jaw_sideways": 0,
    "au32_lip_bite": 0,
    "au33_blowing": 0,
    "au34_cheek_puff": 0,
    "au35_cheek_suck": 0,
    "au36_tongue_bulge": 0,
    "au38_nostril_dilator": 0,
    "au39_nostril_compressor": 0,
    "au41_lid_droop": 0.05,
    "au42_eye_squint": 0.09,
    "au43_eye_closure": 0,
    "au44_eye_squint_intense": 0,
    "au45_blink": 0,
    "au46_wink": 0,
    "eye_openness": 0.64,
    "eyelid_tension": 0.29,
    "gaze_stability": 0.8,
    "pitch": 0.02,
    "yaw": 0.065,
    "roll": 0,
    "gesture_activity": 0.305,
    "movement_intensity": 0.22
  },
  neutral: {
    "au01_inner_brow_raiser": 0.03,
    "au02_outer_brow_raiser": 0.02,
    "au04_brow_lowerer": 0.09,
    "au05_upper_lid_raiser": 0,
    "au06_cheek_raiser": 0.24,
    "au07_lid_tightener": 0.02,
    "au09_nose_wrinkler": 0,
    "au10_upper_lip_raiser": 0,
    "au11_nasolabial_deepener": 0,
    "au12_lip_corner_puller": 0.37,
    "au13_sharp_lip_puller": 0,
    "au14_dimpler": 0.07,
    "au15_lip_corner_depressor": 0.005,
    "au16_lower_lip_depressor": 0,
    "au17_chin_raiser": 0.015,
    "au18_lip_pucker": 0,
    "au19_tongue_show": 0,
    "au01_inner_brow_raiser": 0.055,
    "au02_outer_brow_raiser": 0.025,
    "au04_brow_lowerer": 0.225,
    "au05_upper_lid_raiser": 0.04,
    "au06_cheek_raiser": 0,
    "au07_lid_tightener": 0.075,
    "au09_nose_wrinkler": 0.015,
    "au10_upper_lip_raiser": 0,
    "au11_nasolabial_deepener": 0,
    "au12_lip_corner_puller": 0,
    "au13_sharp_lip_puller": 0,
    "au14_dimpler": 0,
    "au15_lip_corner_depressor": 0.065,
    "au16_lower_lip_depressor": 0.01,
    "au17_chin_raiser": 0.01,
    "au18_lip_pucker": 0,
    "au19_tongue_show": 0,
    "au20_lip_stretcher": 0,
    "au22_lip_funneler": 0,
    "au23_lip_tightener": 0.01,
    "au24_lip_pressor": 0,
    "au25_lips_part": 0.265,
    "au26_jaw_drop": 0.05,
    "au27_mouth_stretch": 0,
    "au28_lip_suck": 0,
    "au30_jaw_sideways": 0,
    "au32_lip_bite": 0,
    "au33_blowing": 0,
    "au34_cheek_puff": 0,
    "au35_cheek_suck": 0,
    "au36_tongue_bulge": 0,
    "au38_nostril_dilator": 0,
    "au39_nostril_compressor": 0,
    "au41_lid_droop": 0.185,
    "au42_eye_squint": 0.07,
    "au43_eye_closure": 0.025,
    "au44_eye_squint_intense": 0,
    "au45_blink": 0.05,
    "au46_wink": 0,
    "eye_openness": 0.545,
    "eyelid_tension": 0.29,
    "gaze_stability": 0.75,
    "pitch": 0.05,
    "yaw": 0.08,
    "roll": 0,
    "gesture_activity": 0.295,
    "movement_intensity": 0.245
  },
  sad: {
    "au01_inner_brow_raiser": 0.405,
    "au02_outer_brow_raiser": 0.12,
    "au04_brow_lowerer": 0.595,
    "au05_upper_lid_raiser": 0.03,
    "au06_cheek_raiser": 0.225,
    "au07_lid_tightener": 0.39,
    "au09_nose_wrinkler": 0.18,
    "au10_upper_lip_raiser": 0.115,
    "au11_nasolabial_deepener": 0.13,
    "au12_lip_corner_puller": 0,
    "au13_sharp_lip_puller": 0,
    "au14_dimpler": 0.025,
    "au15_lip_corner_depressor": 0.345,
    "au16_lower_lip_depressor": 0.13,
    "au17_chin_raiser": 0.28,
    "au18_lip_pucker": 0,
    "au19_tongue_show": 0,
    "au20_lip_stretcher": 0.02,
    "au22_lip_funneler": 0,
    "au23_lip_tightener": 0.08,
    "au24_lip_pressor": 0.06,
    "au25_lips_part": 0.22,
    "au26_jaw_drop": 0.055,
    "au27_mouth_stretch": 0,
    "au28_lip_suck": 0,
    "au30_jaw_sideways": 0,
    "au32_lip_bite": 0,
    "au33_blowing": 0,
    "au34_cheek_puff": 0,
    "au35_cheek_suck": 0,
    "au36_tongue_bulge": 0,
    "au38_nostril_dilator": 0.02,
    "au39_nostril_compressor": 0,
    "au41_lid_droop": 0.25,
    "au42_eye_squint": 0.31,
    "au43_eye_closure": 0.14,
    "au44_eye_squint_intense": 0.1,
    "au45_blink": 0.005,
    "au46_wink": 0,
    "eye_openness": 0.435,
    "eyelid_tension": 0.535,
    "gaze_stability": 0.77,
    "pitch": 0.065,
    "yaw": 0.01,
    "roll": 0,
    "gesture_activity": 0.07,
    "movement_intensity": 0.095 
  },
  surprised: {
    "au01_inner_brow_raiser": 0.16,
    "au02_outer_brow_raiser": 0.105,
    "au04_brow_lowerer": 0.14,
    "au05_upper_lid_raiser": 0.265,
    "au06_cheek_raiser": 0.01,
    "au07_lid_tightener": 0.03,
    "au09_nose_wrinkler": 0.01,
    "au10_upper_lip_raiser": 0.01,
    "au11_nasolabial_deepener": 0,
    "au12_lip_corner_puller": 0.03,
    "au13_sharp_lip_puller": 0,
    "au14_dimpler": 0,
    "au15_lip_corner_depressor": 0,
    "au16_lower_lip_depressor": 0,
    "au17_chin_raiser": 0.01,
    "au18_lip_pucker": 0,
    "au19_tongue_show": 0,
    "au20_lip_stretcher": 0,
    "au22_lip_funneler": 0,
    "au23_lip_tightener": 0,
    "au24_lip_pressor": 0,
    "au25_lips_part": 0.475,
    "au26_jaw_drop": 0.24,
    "au27_mouth_stretch": 0,
    "au28_lip_suck": 0,
    "au30_jaw_sideways": 0,
    "au32_lip_bite": 0,
    "au33_blowing": 0,
    "au34_cheek_puff": 0,
    "au35_cheek_suck": 0,
    "au36_tongue_bulge": 0,
    "au38_nostril_dilator": 0,
    "au39_nostril_compressor": 0,
    "au41_lid_droop": 0.05,
    "au42_eye_squint": 0,
    "au43_eye_closure": 0,
    "au44_eye_squint_intense": 0,
    "au45_blink": 0,
    "au46_wink": 0,
    "eye_openness": 0.685,
    "eyelid_tension": 0.27,
    "gaze_stability": 0.785,
    "pitch": 0.027,
    "yaw": 0.143,
    "roll": -0.003,
    "gesture_activity": 0.445,
    "movement_intensity": 0.323
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
  <div style="background: rgba(0,0,0,0.85); padding: 18px; border-radius: 10px;
              border: 2px solid #00ffcc; font-family: sans-serif;">
    <h3 style="color: #00ffcc; margin: 0 0 12px 0; font-size: 15px;
               text-transform: uppercase; letter-spacing: 1px;">Emotion State</h3>
    <div id="emotion-buttons" style="display: flex; flex-wrap: wrap; gap: 6px;">
      ${EMOTIONS.map(e => `
        <button id="btn-${e}" data-emotion="${e}"
          style="padding: 10px 14px; font-weight: bold; cursor: pointer;
                 background: #222; color: #ccc; border: 1px solid #555;
                 border-radius: 4px; text-transform: capitalize;">
          ${e}
        </button>
      `).join('')}
    </div>
    <p style="color: white; margin: 14px 0 0 0; font-size: 14px;">
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