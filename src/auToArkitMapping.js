/**
 * AU → ARKIT MAPPING
 */

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

export default auToArkitMapping;
