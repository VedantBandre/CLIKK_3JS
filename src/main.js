import * as THREE from 'three';
import { GLTFLoader } from 'three/examples/jsm/loaders/GLTFLoader.js';

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

// 3. THE EXAGGERATED CONTROL PANEL
let activeCase = 'expected'; 

const ui = document.createElement('div');
ui.style.position = 'absolute';
ui.style.top = '20px';
ui.style.left = '20px';
ui.style.zIndex = '100';
ui.innerHTML = `
  <div style="background: rgba(0,0,0,0.85); padding: 18px; border-radius: 10px; border: 2px solid #ff3333; font-family: sans-serif;">
    <h3 style="color: #ff3333; margin: 0 0 5px 0; font-size: 15px; text-transform: uppercase; letter-spacing: 1px;">Demo Mode: Exaggerated Breaks</h3>
    <p style="color: #aaa; margin: 0 0 15px 0; font-size: 11px;">Values are maximized to instantly show behavioral changes.</p>
    <button id="btn-exp" style="padding:12px; margin-right:5px; font-weight:bold; cursor:pointer; background:#e1e1e1; border:none; border-radius:4px;">1. Expected (Natural Pacing)</button>
    <button id="btn-task" style="padding:12px; margin-right:5px; font-weight:bold; cursor:pointer; background:#ffcc00; border:none; border-radius:4px;">2. Task Break (Stern Rigidity)</button>
    <button id="btn-rel" style="padding:12px; font-weight:bold; cursor:pointer; background:#ff3333; color:white; border:none; border-radius:4px;">3. Relation Break (Intimidation)</button>
    <p style="color:white; margin: 15px 0 0 0; font-size: 14px;">
      Active Profile: <strong id="state-txt" style="color:#00ffcc; text-transform:uppercase;">expected</strong>
    </p>
  </div>
`;
document.body.appendChild(ui);

const updateUIState = (stateName) => {
  activeCase = stateName; 
  document.getElementById('state-txt').innerText = stateName.replace('_', ' ');
};
document.getElementById('btn-exp').onclick = () => updateUIState('expected');
document.getElementById('btn-task').onclick = () => updateUIState('task_break');
document.getElementById('btn-rel').onclick = () => updateUIState('relation_break');

const studentPOV = new THREE.Vector3();
camera.getWorldPosition(studentPOV);

// 4. Automated Demonstration Render Loop
const clock = new THREE.Clock();

function animate() {
  requestAnimationFrame(animate);
  const time = clock.getElapsedTime();

  if (avatarLoaded) {
    // Exaggerated organic baseline rhythm variables for clear contrast
    const naturalSwayX = Math.sin(time * 1.2) * 0.08;
    const naturalSwayY = Math.cos(time * 0.6) * 0.02;

    // Standard structural reset
    agentModel.position.set(0, 0, 0); 
    if (neckBone) neckBone.rotation.set(0, 0, 0);
    if (headBone) headBone.rotation.set(0, 0, 0);
    if (leftEyeBone && rightEyeBone) {
      leftEyeBone.rotation.set(0, 0, 0);
      rightEyeBone.rotation.set(0, 0, 0);
    }
    resetAllExpressions(faceMeshReference);

    switch (activeCase) {
      
      case 'expected':
        // --- CASE 1: EXPECTED NORMAL BEHAVIOR ---
        // Organic breathing shifts
        agentModel.position.x = naturalSwayX;
        agentModel.position.y = naturalSwayY;

        // Clean, highly observable look-away cycle every 4 seconds
        const lookAwayTimer = (time % 4.0); 
        if (lookAwayTimer > 2.5) {
          // EXAGGERATED LOOK-AWAY: Turns head down and significantly aside to mimic checking notes
          if (neckBone) neckBone.rotation.set(0.15, 0.45, 0);
          if (leftEyeBone && rightEyeBone) {
            leftEyeBone.rotation.set(0.2, 0.2, 0);
            rightEyeBone.rotation.set(0.2, 0.2, 0);
          }
        } else {
          // Locked interactive look during active speech delivery
          if (neckBone) neckBone.lookAt(studentPOV);
          if (headBone) headBone.lookAt(studentPOV);
          if (leftEyeBone && rightEyeBone) {
            leftEyeBone.lookAt(studentPOV);
            rightEyeBone.lookAt(studentPOV);
          }
        }
        break;

      case 'task_break':
        // --- CASE 2: TASK-RELATED BREAK (Insistence / Pressing) ---
        // UNNATURAL STANDSTILL: All organic sway values are entirely crushed (0.0).
        agentModel.position.set(0, 0, 0);

        // Piercing, continuous calculation tracking directly into the lens
        if (neckBone) neckBone.lookAt(studentPOV);
        if (headBone) headBone.lookAt(studentPOV);
        if (leftEyeBone && rightEyeBone) {
          leftEyeBone.lookAt(studentPOV);
          rightEyeBone.lookAt(studentPOV);
        }

        // Severe Task Focus Expression (Max Squint + Clenched Jaw)
        setExpression(faceMeshReference, 'eyeSquintLeft', 1.00);   // Maxed out
        setExpression(faceMeshReference, 'eyeSquintRight', 1.00);  // Maxed out
        setExpression(faceMeshReference, 'browDownLeft', 0.50);
        setExpression(faceMeshReference, 'browDownRight', 0.50);
        setExpression(faceMeshReference, 'jawClose', 0.70);         // Simulates grinding/clenching teeth
        // setExpression(faceMeshReference, 'jawOpen', 0.50);         // Simulates grinding/clenching teeth
        break;

      case 'relation_break':
        // --- CASE 3: RELATION-RELATED BREAK (Intimidation / Invasion) ---
        // EXAGGERATED PROXIMITY INVASION: Move the entire model significantly forward and lower
        // This physically fills up the participant's screen real estate to trigger a threat response.
        agentModel.position.set(0, -0.08, 0.45); 

        // Compute rigorous head orientation vectors
        if (neckBone) {
          neckBone.lookAt(studentPOV);
          // Add an aggressive neck strain angle toward the camera
          neckBone.rotation.z = -0.05; 
        }
        if (headBone) headBone.lookAt(studentPOV);
        if (leftEyeBone && rightEyeBone) {
          leftEyeBone.lookAt(studentPOV);
          rightEyeBone.lookAt(studentPOV);
        }

        // Intimidation Expression Stack (Max Scowl + Max Widened Unblinking Glare)
        setExpression(faceMeshReference, 'browDownLeft', 1.00);   // Full heavy scowl
        setExpression(faceMeshReference, 'browDownRight', 1.00);  // Full heavy scowl
        setExpression(faceMeshReference, 'eyeWideLeft', 0.85);     // Extreme unblinking gaze wide eyes
        setExpression(faceMeshReference, 'eyeWideRight', 0.85);    // Extreme unblinking gaze wide eyes
        setExpression(faceMeshReference, 'mouthFrownLeft', 0.60);
        setExpression(faceMeshReference, 'mouthFrownRight', 0.60);
        break;
    }
  }

  renderer.render(scene, camera);
}

window.addEventListener('resize', () => {
  camera.aspect = window.innerWidth / window.innerHeight;
  camera.updateProjectionMatrix();
  renderer.setSize(window.innerWidth, window.innerHeight);
});

animate();