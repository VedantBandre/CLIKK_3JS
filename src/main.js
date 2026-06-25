import * as THREE from 'three';
import { GLTFLoader } from 'three/examples/jsm/loaders/GLTFLoader.js';

// Profile Values
const emotionProfiles = {
  angry: {
    "au01_inner_brow_raiser": 27.5,
    "au02_outer_brow_raiser": 12,
    "au04_brow_lowerer": 30.5,
    "au05_upper_lid_raiser": 6.5,
    "au06_cheek_raiser": 10.5,
    "au07_lid_tightener": 16,
    "au09_nose_wrinkler": 13.5,
    "au10_upper_lip_raiser": 10,
    "au11_nasolabial_deepener": 12.5,
    "au12_lip_corner_puller": 3,
    "au13_sharp_lip_puller": 0,
    "au14_dimpler": 0,
    "au15_lip_corner_depressor": 18,
    "au16_lower_lip_depressor": 2,
    "au17_chin_raiser": 15,
    "au18_lip_pucker": 0,
    "au19_tongue_show": 0,
    "au20_lip_stretcher": 0,
    "au22_lip_funneler": 0,
    "au23_lip_tightener": 4,
    "au24_lip_pressor": 0,
    "au25_lips_part": 38.5,
    "au26_jaw_drop": 18,
    "au27_mouth_stretch": 0,
    "au28_lip_suck": 0,
    "au30_jaw_sideways": 0,
    "au32_lip_bite": 0,
    "au33_blowing": 0,
    "au34_cheek_puff": 0,
    "au35_cheek_suck": 0,
    "au36_tongue_bulge": 0,
    "au38_nostril_dilator": 1,
    "au39_nostril_compressor": 0,
    "au41_lid_droop": 6,
    "au42_eye_squint": 9.5,
    "au43_eye_closure": 0,
    "au44_eye_squint_intense": 0,
    "au45_blink": 0.5,
    "au46_wink": 0,
    "eye_openness": 60,
    "eyelid_tension": 41.5,
    "gaze_stability": 78,
    "pitch": 5,
    "yaw": 6.5,
    "roll": 0,
    "gesture_activity": 24,
    "movement_intensity": 22
  },
  disgusted: {
    "au01_inner_brow_raiser": 18,
    "au02_outer_brow_raiser": 9.5,
    "au04_brow_lowerer": 35.5,
    "au05_upper_lid_raiser": 5,
    "au06_cheek_raiser": 5,
    "au07_lid_tightener": 17,
    "au09_nose_wrinkler": 12,
    "au10_upper_lip_raiser": 7,
    "au11_nasolabial_deepener": 6,
    "au12_lip_corner_puller": 2.5,
    "au13_sharp_lip_puller": 0,
    "au14_dimpler": 0,
    "au15_lip_corner_depressor": 10,
    "au16_lower_lip_depressor": 0,
    "au17_chin_raiser": 7,
    "au18_lip_pucker": 0,
    "au19_tongue_show": 0,
    "au20_lip_stretcher": 0,
    "au22_lip_funneler": 0,
    "au23_lip_tightener": 2,
    "au24_lip_pressor": 0,
    "au25_lips_part": 32.5,
    "au26_jaw_drop": 10.5,
    "au27_mouth_stretch": 0,
    "au28_lip_suck": 0,
    "au30_jaw_sideways": 0,
    "au32_lip_bite": 0,
    "au33_blowing": 0,
    "au34_cheek_puff": 0,
    "au35_cheek_suck": 0,
    "au36_tongue_bulge": 0,
    "au38_nostril_dilator": 2,
    "au39_nostril_compressor": 1,
    "au41_lid_droop": 12,
    "au42_eye_squint": 10,
    "au43_eye_closure": 8,
    "au44_eye_squint_intense": 1,
    "au45_blink": 0,
    "au46_wink": 0,
    "eye_openness": 57.5,
    "eyelid_tension": 34,
    "gaze_stability": 78,
    "pitch": 3,
    "yaw": 4,
    "roll": 0,
    "gesture_activity": 33.5,
    "movement_intensity": 26
  },
  fearful: {
    "au01_inner_brow_raiser": 26.5,
    "au02_outer_brow_raiser": 14,
    "au04_brow_lowerer": 48,
    "au05_upper_lid_raiser": 7.5,
    "au06_cheek_raiser": 10,
    "au07_lid_tightener": 32,
    "au09_nose_wrinkler": 16.5,
    "au10_upper_lip_raiser": 8,
    "au11_nasolabial_deepener": 8,
    "au12_lip_corner_puller": 0,
    "au13_sharp_lip_puller": 0,
    "au14_dimpler": 0,
    "au15_lip_corner_depressor": 19,
    "au16_lower_lip_depressor": 7,
    "au17_chin_raiser": 17,
    "au18_lip_pucker": 0,
    "au19_tongue_show": 0,
    "au20_lip_stretcher": 0,
    "au22_lip_funneler": 0,
    "au23_lip_tightener": 4,
    "au24_lip_pressor": 4.5,
    "au25_lips_part": 30.5,
    "au26_jaw_drop": 14.5,
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
    "au41_lid_droop": 20.5,
    "au42_eye_squint": 16,
    "au43_eye_closure": 20,
    "au44_eye_squint_intense": 7,
    "au45_blink": 20,
    "au46_wink": 0,
    "eye_openness": 47.5,
    "eyelid_tension": 45.5,
    "gaze_stability": 70,
    "pitch": 3,
    "yaw": 6,
    "roll": 0,
    "gesture_activity": 34,
    "movement_intensity": 28.5
  },
  happy: {
    "au01_inner_brow_raiser": 3,
    "au02_outer_brow_raiser": 2,
    "au04_brow_lowerer": 9,
    "au05_upper_lid_raiser": 0,
    "au06_cheek_raiser": 24,
    "au07_lid_tightener": 2,
    "au09_nose_wrinkler": 0,
    "au10_upper_lip_raiser": 0,
    "au11_nasolabial_deepener": 0,
    "au12_lip_corner_puller": 37,
    "au13_sharp_lip_puller": 0,
    "au14_dimpler": 7,
    "au15_lip_corner_depressor": 0.5,
    "au16_lower_lip_depressor": 0,
    "au17_chin_raiser": 1.5,
    "au18_lip_pucker": 0,
    "au19_tongue_show": 0,
    "au20_lip_stretcher": 0,
    "au22_lip_funneler": 0,
    "au23_lip_tightener": 0,
    "au24_lip_pressor": 0,
    "au25_lips_part": 37.5,
    "au26_jaw_drop": 15,
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
    "au41_lid_droop": 5,
    "au42_eye_squint": 9,
    "au43_eye_closure": 0,
    "au44_eye_squint_intense": 0,
    "au45_blink": 0,
    "au46_wink": 0,
    "eye_openness": 64,
    "eyelid_tension": 29,
    "gaze_stability": 80,
    "pitch": 2,
    "yaw": 6.5,
    "roll": 0,
    "gesture_activity": 30.5,
    "movement_intensity": 22   
  },
  neutral: {
    "au01_inner_brow_raiser": 5.5,
    "au02_outer_brow_raiser": 2.5,
    "au04_brow_lowerer": 22.5,
    "au05_upper_lid_raiser": 4,
    "au06_cheek_raiser": 0,
    "au07_lid_tightener": 7.5,
    "au09_nose_wrinkler": 1.5,
    "au10_upper_lip_raiser": 0,
    "au11_nasolabial_deepener": 0,
    "au12_lip_corner_puller": 0,
    "au13_sharp_lip_puller": 0,
    "au14_dimpler": 0,
    "au15_lip_corner_depressor": 6.5,
    "au16_lower_lip_depressor": 1,
    "au17_chin_raiser": 1,
    "au18_lip_pucker": 0,
    "au19_tongue_show": 0,
    "au20_lip_stretcher": 0,
    "au22_lip_funneler": 0,
    "au23_lip_tightener": 1,
    "au24_lip_pressor": 0,
    "au25_lips_part": 26.5,
    "au26_jaw_drop": 5,
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
    "au41_lid_droop": 18.5,
    "au42_eye_squint": 7,
    "au43_eye_closure": 2.5,
    "au44_eye_squint_intense": 0,
    "au45_blink": 5,
    "au46_wink": 0,
    "eye_openness": 54.5,
    "eyelid_tension": 29,
    "gaze_stability": 75,
    "pitch": 5,
    "yaw": 8,
    "roll": 0,
    "gesture_activity": 29.5,
    "movement_intensity": 24.5 
  },
  sad: {
    "au01_inner_brow_raiser": 40.5,
    "au02_outer_brow_raiser": 12,
    "au04_brow_lowerer": 59.5,
    "au05_upper_lid_raiser": 3,
    "au06_cheek_raiser": 22.5,
    "au07_lid_tightener": 39,
    "au09_nose_wrinkler": 18,
    "au10_upper_lip_raiser": 11.5,
    "au11_nasolabial_deepener": 13,
    "au12_lip_corner_puller": 0,
    "au13_sharp_lip_puller": 0,
    "au14_dimpler": 2.5,
    "au15_lip_corner_depressor": 34.5,
    "au16_lower_lip_depressor": 13,
    "au17_chin_raiser": 28,
    "au18_lip_pucker": 0,
    "au19_tongue_show": 0,
    "au20_lip_stretcher": 2,
    "au22_lip_funneler": 0,
    "au23_lip_tightener": 8,
    "au24_lip_pressor": 6,
    "au25_lips_part": 22,
    "au26_jaw_drop": 5.5,
    "au27_mouth_stretch": 0,
    "au28_lip_suck": 0,
    "au30_jaw_sideways": 0,
    "au32_lip_bite": 0,
    "au33_blowing": 0,
    "au34_cheek_puff": 0,
    "au35_cheek_suck": 0,
    "au36_tongue_bulge": 0,
    "au38_nostril_dilator": 2,
    "au39_nostril_compressor": 0,
    "au41_lid_droop": 25,
    "au42_eye_squint": 31,
    "au43_eye_closure": 14,
    "au44_eye_squint_intense": 10,
    "au45_blink": 0.5,
    "au46_wink": 0,
    "eye_openness": 43.5,
    "eyelid_tension": 53.5,
    "gaze_stability": 77,
    "pitch": 6.5,
    "yaw": 1,
    "roll": 0,
    "gesture_activity": 7,
    "movement_intensity": 9.5    
  },
  surprised: {
    "au01_inner_brow_raiser": 16,
    "au02_outer_brow_raiser": 10.5,
    "au04_brow_lowerer": 14,
    "au05_upper_lid_raiser": 26.5,
    "au06_cheek_raiser": 1,
    "au07_lid_tightener": 3,
    "au09_nose_wrinkler": 1,
    "au10_upper_lip_raiser": 1,
    "au11_nasolabial_deepener": 0,
    "au12_lip_corner_puller": 3,
    "au13_sharp_lip_puller": 0,
    "au14_dimpler": 0,
    "au15_lip_corner_depressor": 0,
    "au16_lower_lip_depressor": 0,
    "au17_chin_raiser": 1,
    "au18_lip_pucker": 0,
    "au19_tongue_show": 0,
    "au20_lip_stretcher": 0,
    "au22_lip_funneler": 0,
    "au23_lip_tightener": 0,
    "au24_lip_pressor": 0,
    "au25_lips_part": 47.5,
    "au26_jaw_drop": 24,
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
    "au41_lid_droop": 5,
    "au42_eye_squint": 0,
    "au43_eye_closure": 0,
    "au44_eye_squint_intense": 0,
    "au45_blink": 0,
    "au46_wink": 0,
    "eye_openness": 68.5,
    "eyelid_tension": 27,
    "gaze_stability": 78.5,
    "pitch": 2.7,
    "yaw": 14.3,
    "roll": -0.3,
    "gesture_activity": 44.5,
    "movement_intensity": 32.3    
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


function setExpression(mesh, targetKey, weight) {
  if (!mesh) return;
  const targetIndex = mesh.morphTargetDictionary[targetKey];
  if (targetIndex !== undefined) {
    mesh.morphTargetInfluences[targetIndex] = weight;
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