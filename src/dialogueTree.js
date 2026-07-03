/**
 * GAME DIALOGUE TREE - PART 1 (The Dinner Scene Intro)
 */

const dialogueTree = {
  // Introduction context node
  start: {
    speaker: "Narrator",
    text: "You have been invited to dinner by your Chinese colleague, Mrs. Zhang, who holds a higher position in the company than you. Throughout the meal, the conversation has been pleasant and everything has gone smoothly. You have enjoyed the food, exchanged ideas about work and daily life, and the dinner is now coming to an end.",
    expression: "neutral",
    options: [
      { text: "Continue", nextNode: "intro_01" }
    ]
  },

  intro_01: {
    speaker: "Mrs. Zhang",
    text: "Thank you for joining me today.",
    expression: "neutral",
    options: [
      { text: "Thank you for inviting me.", nextNode: "intro_02" }
    ]
  },

  intro_02: {
    speaker: "Mrs. Zhang",
    text: "How are you finding your work in China so far?",
    expression: "neutral",
    options: [
      { text: "It's been very interesting. I'm still learning a lot about Chinese culture.", nextNode: "intro_03" }
    ]
  },

  intro_03: {
    speaker: "Mrs. Zhang",
    text: "That's good. Understanding the culture is often more important than understanding procedures.",
    expression: "neutral",
    options: [
      { text: "I agree.", nextNode: "intro_04" }
    ]
  },

  intro_04: {
    speaker: "Mrs. Zhang",
    text: "Have you had many opportunities to work with Chinese colleagues?",
    expression: "neutral",
    options: [
      { text: "Yes although I still feel that there are many things I don't fully understand yet.", nextNode: "intro_05" }
    ]
  },

  intro_05: {
    speaker: "Mrs. Zhang",
    text: "That's completely normal.",
    expression: "neutral",
    options: [
      { text: "Continue", nextNode: "bill_trigger" }
    ]
  },

  // The 3-way split node
  bill_trigger: {
    speaker: "Mrs. Zhang",
    text: "[The waiter has just brought the bill to the table. Mrs. Zhang immediately reaches for it.] \n\nPlease allow me. I invited you.",
    expression: "neutral",
    options: [
      { text: "Thank you very much.", nextNode: "left_branch_start" }, // Option 1
      { text: "No, please let me pay.", nextNode: "center_branch_start" }, // Option 2
      { text: "How about we split the bill?", nextNode: "right_branch_start" } // Option 3
    ]
  },

  // Option 1
  left_branch_start: {
    speaker: "You",
    text: "Thank you very much",
    expression: "neutral", 
    options: [
      { text: "Continue", nextNode: "left_branch_pays" }
    ]
  },
  

  left_branch_pays: {
    speaker: "Narrator",
    text: "Mrs. Zhang smiles politely and pays the bill.",
    expression: "neutral", 
    options: [
      { text: "Continue", nextNode: "left_branch_obligation_break" }
    ]
  },

  left_branch_obligation_break: {
    speaker: "Narrator",
    text: "[A slight social obligation break]\nNormally offering to pay the bill is a ritual and shows gratitude. Her smile becomes slightly more reserved, and she appears momentarily surprised that you accepted immediately without first offering to pay. This is a subtle social obligation break rather than a serious mistake.",
    expression: "surprised", // Passing the subtle expression change to the 3D character
    options: [
      { text: "Thank you. Next time, dinner is on me.", nextNode: "left_branch_mitigated" }, // Option 1a
      { text: "Thank you again.", nextNode: "left_branch_failed" } // Option 1b
    ]
  },

  // PATH A: Mitigating with a future offer (Left side of your image)
  // Option 1a
  left_branch_mitigated: {
    speaker: "You",
    text: "Thank you. Next time, dinner is on me.",
    expression: "neutral",
    options: [
      { text: "Continue", nextNode: "left_branch_warm_smile" }
    ]
  },

  left_branch_warm_smile: {
    speaker: "Mrs. Zhang",
    text: "Mrs. Zhang smiles warmly and happy.",
    expression: "happy",
    options: [
      { text: "Continue", nextNode: "left_branch_join_next" }
    ]
  },

  left_branch_join_next: {
    speaker: "Mrs. Zhang",
    text: "That is very kind of you. I would be happy to join you next time.",
    expression: "happy",
    options: [
      { text: "Show Feedback", nextNode: "left_branch_feedback_good" }
    ]
  },

  left_branch_feedback_good: {
    speaker: "Learning Feedback",
    text: "In Chinese business culture, it is common to briefly offer to pay the bill before accepting the host's invitation. This ritual demonstrates politeness and respect rather than a genuine expectation of paying.\n\nAccepting the invitation immediately is generally not considered rude, especially when the host has explicitly invited you. However, it is considered good etiquette to express reciprocity by offering to host the next meal or meeting. Reciprocity in Chinese culture is often maintained over time rather than through an immediate equal exchange. Saying 'Next time, dinner is on me' acknowledges the host's generosity while signaling your willingness to return the favor in the future.",
    expression: "neutral",
    options: [
      { text: "Replay Scenario", nextNode: "bill_trigger" }
    ]
  },

  // PATH B: Double thanking without a future offer (Right side of your image)
  // Option 1b
  left_branch_failed: {
    speaker: "You",
    text: "Thank you again.",
    expression: "neutral",
    options: [
      { text: "Continue", nextNode: "left_branch_abrupt_end" }
    ]
  },

  left_branch_abrupt_end: {
    speaker: "Narrator",
    text: "Mrs. Zhang still smiles politely but ends the conversation immediately.",
    expression: "neutral", // Alternatively "neutral" or a polite, strained expression
    options: [
      { text: "Show Feedback", nextNode: "left_branch_feedback_bad" }
    ]
  },

  left_branch_feedback_bad: {
    speaker: "Learning Feedback",
    text: "In Chinese business culture, it is common to briefly offer to pay the bill before accepting the host's invitation. This ritual demonstrates politeness and respect rather than a genuine expectation of paying.\n\nAccepting the invitation immediately is generally not considered rude, especially when the host has explicitly invited you. However, it is considered good etiquette to express reciprocity by offering to host the next meal or meeting. A better option would be offering, that you pay for dinner the next time signaling the willingness to return the favor in the future.",
    expression: "neutral",
    options: [
      { text: "Replay Scenario", nextNode: "bill_trigger" }
    ]
  },
  
  // Central Branch: Fighting for the Bill
  // Option 2
  // --- ROUND 1 COUNTER-OFFER ---
  center_branch_start: {
    speaker: "You",
    text: "No please let me pay.",
    expression: "neutral",
    options: [
      { text: "Continue", nextNode: "center_round1_response" }
    ]
  },

  center_round1_response: {
    speaker: "Mrs. Zhang",
    text: "No, you are my guest.",
    expression: "neutral",
    options: [
      { text: "Thank you very much.", nextNode: "center_give_in_round1" },
      { text: "I really appreciate that, but I would really like to pay.", nextNode: "center_round2_offer" }
    ]
  },

  // Sub-Path: You give in after 1 offer
  center_give_in_round1: {
    speaker: "You",
    text: "Thank you very much.",
    options: [{ text: "Continue", nextNode: "center_g1_reaction" }]
  },

  center_g1_reaction: {
    speaker: "Narrator",
    text: "Mrs. Zhang smiles politely and pays. But she seems to be moderately confused.",
    expression: "surprised", // Using surprised to convey moderate confusion
    options: [
      { text: "Says nothing.", nextNode: "center_g1_silence" },
      { text: "Next time, I would like to invite you", nextNode: "center_g1_mitigate" }
    ]
  },

  center_g1_silence: {
    speaker: "You",
    text: "...",
    options: [{ text: "Show Feedback", nextNode: "center_g1_silence_feedback" }]
  },

  center_g1_silence_feedback: {
    speaker: "Learning Feedback",
    text: "You correctly offered to pay once, showing appreciation for your host's generosity. In many Chinese business settings, however, it is common to continue this polite exchange for three rounds before accepting the invitation.",
    options: [{ text: "Replay Scenario", nextNode: "bill_trigger" }]
  },

  center_g1_mitigate: {
    speaker: "You",
    text: "Next time, I would like to invite you",
    options: [{ text: "Continue", nextNode: "center_g1_mitigate_reaction" }]
  },

  center_g1_mitigate_reaction: {
    speaker: "Narrator",
    text: "Mrs. Zhang smiles warmly and happy. \n\n[Mrs. Zhang]: That is very kind of you. I would be happy to join you next time.",
    expression: "happy",
    options: [{ text: "Show Feedback", nextNode: "center_g1_mitigate_feedback" }]
  },

  center_g1_mitigate_feedback: {
    speaker: "Learning Feedback",
    text: "You correctly offered to pay once, showing appreciation for your host's generosity. In many Chinese business settings, however, it is common to continue this polite exchange for three rounds before accepting the invitation. However, it is considered good etiquette to express reciprocity by offering to host the next meal or meeting. Reciprocity in Chinese culture is often maintained over time rather than through an immediate equal exchange. Saying 'Next time, dinner is on me.' acknowledges the host's generosity while signaling your willingness to return the favor in the future.",
    options: [{ text: "Replay Scenario", nextNode: "bill_trigger" }]
  },


  // --- ROUND 2 COUNTER-OFFER ---
  center_round2_offer: {
    speaker: "You",
    text: "I really appreciate that, but I would really like to pay.",
    options: [{ text: "Continue", nextNode: "center_round2_response" }]
  },

  center_round2_response: {
    speaker: "Mrs. Zhang",
    text: "That is very kind of you, but I want to invite you.",
    expression: "neutral",
    options: [
      { text: "Thank you very much.", nextNode: "center_give_in_round2" },
      { text: "No, I couldn't possibly let you pay.", nextNode: "center_round3_offer" }
    ]
  },

  // Sub-Path: You give in after 2 offers
  center_give_in_round2: {
    speaker: "You",
    text: "Thank you very much.",
    options: [{ text: "Continue", nextNode: "center_g2_reaction" }]
  },

  center_g2_reaction: {
    speaker: "Narrator",
    text: "Mrs. Zhang smiles politely and pays. But she seems to be slightly confused.",
    expression: "surprised",
    options: [
      { text: "Says nothing.", nextNode: "center_g2_silence" },
      { text: "Next time, I would like to invite you", nextNode: "center_g2_mitigate" }
    ]
  },

  center_g2_silence: {
    speaker: "You",
    text: "...",
    options: [{ text: "Show Feedback", nextNode: "center_g2_silence_feedback" }]
  },

  center_g2_silence_feedback: {
    speaker: "Learning Feedback",
    text: "You correctly offered to pay twice, showing appreciation for your host's generosity. In many Chinese business settings, however, it is common to continue this polite exchange for three rounds before accepting the invitation.",
    options: [{ text: "Replay Scenario", nextNode: "bill_trigger" }]
  },

  center_g2_mitigate: {
    speaker: "You",
    text: "Next time, I would like to invite you",
    options: [{ text: "Continue", nextNode: "center_g2_mitigate_reaction" }]
  },

  center_g2_mitigate_reaction: {
    speaker: "Narrator",
    text: "Mrs. Zhang smiles warmly and happy. \n\n[Mrs. Zhang]: That is very kind of you. I would be happy to join you next time.",
    expression: "happy",
    options: [{ text: "Show Feedback", nextNode: "center_g2_mitigate_feedback" }]
  },

  center_g2_mitigate_feedback: {
    speaker: "Learning Feedback",
    text: "You correctly offered to pay twice, showing appreciation for your host's generosity. In many Chinese business settings, however, it is common to continue this polite exchange for three rounds before accepting the invitation. However, it is considered good etiquette to express reciprocity by offering to host the next meal or meeting. Reciprocity in Chinese culture is often maintained over time rather than through an immediate equal exchange. Saying 'Next time, dinner is on me.' acknowledges the host's generosity while signaling your willingness to return the favor in the future.",
    options: [{ text: "Replay Scenario", nextNode: "bill_trigger" }]
  },


  // --- ROUND 3 COUNTER-OFFER (The Golden Standard Path) ---
  center_round3_offer: {
    speaker: "You",
    text: "No, I couldn't possibly let you pay.",
    options: [{ text: "Continue", nextNode: "center_round3_response" }]
  },

  center_round3_response: {
    speaker: "Mrs. Zhang",
    text: "Really, it is my pleasure.",
    expression: "neutral",
    options: [
      { text: "Thank you very much.", nextNode: "center_give_in_round3" },
      { text: "No, I insist.", nextNode: "center_round4_overdo" }
    ]
  },

  // Sub-Path: You give in after 3 offers (Perfect Outcome)
  center_give_in_round3: {
    speaker: "You",
    text: "Thank you very much.",
    options: [{ text: "Continue", nextNode: "center_g3_reaction" }]
  },

  center_g3_reaction: {
    speaker: "Mrs. Zhang",
    text: "You're very welcome. I'm glad we could have dinner together.",
    expression: "happy",
    options: [{ text: "Continue", nextNode: "center_g3_outcome" }]
  },

  center_g3_outcome: {
    speaker: "Narrator",
    text: "Mrs Zhang pays the bill and smiles warmly. She is happy.",
    expression: "happy",
    options: [{ text: "Show Feedback", nextNode: "center_g3_feedback" }]
  },

  center_g3_feedback: {
    speaker: "Learning Feedback",
    text: "The interaction follows the expected social ritual. You handled this situation appropriately according to common Chinese business etiquette.\n\nAlthough Mrs. Zhang intended to pay from the beginning, it is customary to politely refuse the offer thrice before finally accepting. The purpose of this exchange is not to determine who actually pays, but to demonstrate sincerity, respect, and appreciation for the other person's generosity. By offering to pay multiple times, you showed that you did not simply expect your host to cover the bill. By accepting the invitation after Mrs. Zhang continued to insist, you also respected her role as the host and her higher hierarchical position.",
    options: [{ text: "Replay Scenario", nextNode: "bill_trigger" }]
  },


  // --- ROUND 4+ OVERDOING IT (Negative Path) ---
  center_round4_overdo: {
    speaker: "You",
    text: "No, I insist.",
    options: [{ text: "Continue", nextNode: "center_round4_response" }]
  },

  center_round4_response: {
    speaker: "Mrs. Zhang",
    text: "Please allow me.",
    expression: "neutral", 
    options: [{ text: "Continue", nextNode: "center_round4_strained_reaction" }]
  },

  center_round4_strained_reaction: {
    speaker: "Narrator",
    text: "Mrs. Zhang only smiles lightly. But she seems to be ashamed.",
    expression: "fearful", // Close to "ashamed"/uncomfortable for basic expression maps
    options: [
      { text: "Thank you very much.", nextNode: "center_overdone_give_in" },
      { text: "No, I couldn't possibly.", nextNode: "center_round5_break" }
    ]
  },

  // Sub-Path: You finally give in late (4th offer)
  center_overdone_give_in: {
    speaker: "You",
    text: "Thank you very much.",
    options: [{ text: "Continue", nextNode: "center_overdone_give_in_reaction" }]
  },

  center_overdone_give_in_reaction: {
    speaker: "Narrator",
    text: "Mrs. Zhang smiles politely and pays. But she seems to be slightly ashamed",
    expression: "neutral",
    options: [{ text: "Show Feedback", nextNode: "center_overdone_give_in_feedback" }]
  },

  center_overdone_give_in_feedback: {
    speaker: "Learning Feedback",
    text: "You showed respect by repeatedly offering to pay the bill, which is an important part of Chinese dining etiquette. However, continuing to insist after three polite exchanges can eventually become counterproductive.\n\nIn many Chinese social and business settings, the host is expected to insist on paying several times as part of a ritual of politeness. Once this ritual has been completed, it is generally appropriate to graciously accept the invitation. Persisting beyond this point may unintentionally communicate that you do not trust your host to fulfill their role, or that you doubt their ability to treat you. This can place unnecessary pressure on the host and make the situation uncomfortable.",
    options: [{ text: "Replay Scenario", nextNode: "bill_trigger" }]
  },

  // Sub-Path: The 5th offer where you break the ritual and force payment
  center_round5_break: {
    speaker: "You",
    text: "No, I couldn't possibly.",
    options: [{ text: "Continue", nextNode: "center_round5_reaction" }]
  },

  center_round5_reaction: {
    speaker: "Narrator",
    text: "Mrs. Zhang stops smiling and she seems to be ashamed.",
    expression: "neutral", 
    options: [{ text: "Continue", nextNode: "center_round5_take_bill" }]
  },

  center_round5_take_bill: {
    speaker: "Mrs. Zhang",
    text: "Oh... ok, thank you for taking the bill.",
    expression: "neutral",
    options: [{ text: "Continue", nextNode: "center_round5_outcome" }]
  },

  center_round5_outcome: {
    speaker: "Narrator",
    text: "You pay. Mrs. Zhang doesn't smile but shows sign of frustration and anger.",
    expression: "angry",
    options: [{ text: "Show Feedback", nextNode: "center_round5_feedback" }]
  },

  center_round5_feedback: {
    speaker: "Learning Feedback",
    text: "You showed generosity by insisting on paying the bill. However, continuing to insist after the host has repeatedly offered to pay can become inappropriate.\n\nIn Chinese culture, offering to pay the bill several times is a ritual of politeness. Once the host continues to insist after several exchanges, it is generally expected that the guest will graciously accept the invitation. By insisting a fifth time and ultimately taking over the bill, you interrupted this social ritual.\n\nYour actions may unintentionally suggest that you do not trust your host to fulfill their role or that you believe they are unable to afford the invitation. This can cause the host to lose face and may leave them feeling embarrassed or frustrated, even if they remain polite on the surface.\n\nA more culturally appropriate response would have been to accept the invitation after the ritual exchange and thank your host sincerely. You can always reciprocate by inviting them the next time you meet.",
    options: [{ text: "Replay Scenario", nextNode: "bill_trigger" }]
  },

  // Right Branch
  // Option 3
  // --- ROUND 1 SUGGESTION to SPLIT THE BILL ---
  right_branch_start: {
    speaker: "You",
    text: "How about we split the bill?",
    expression: "neutral",
    options: [
      { text: "Continue", nextNode: "right_round1_reaction" }
    ]
  },

  right_round1_reaction: {
    speaker: "Narrator",
    text: "Mrs. Zhang stops smiling and seems surprised.",
    expression: "surprised",
    options: [
      { text: "Continue", nextNode: "right_round1_response" }
    ]
  },

  right_round1_response: {
    speaker: "Mrs. Zhang",
    text: "Oh... that's really not necessary.",
    expression: "neutral",
    options: [
      { text: "I'm sorry. I didn't mean to refuse your kindness. Thank you for inviting me.", nextNode: "right_backtrack" },
      { text: "No, I really think splitting is the fairest option", nextNode: "right_persist_split" }
    ]
  },

  // Sub-Path: You backtrack and apologize immediately (Left column of flowchart)
  right_backtrack: {
    speaker: "You",
    text: "I'm sorry. I didn't mean to refuse your kindness. Thank you for inviting me.",
    expression: "neutral",
    options: [
      { text: "Continue", nextNode: "right_backtrack_reaction" }
    ]
  },

  right_backtrack_reaction: {
    speaker: "Narrator",
    text: "Mrs. Zhang smiles again and pays the bill.",
    expression: "happy",
    options: [
      { text: "Continue", nextNode: "right_backtrack_statement" }
    ]
  },

  right_backtrack_statement: {
    speaker: "Mrs. Zhang",
    text: "Please don't worry. I'm happy we could have dinner together.",
    expression: "happy",
    options: [
      { text: "Show Feedback", nextNode: "right_backtrack_feedback" }
    ]
  },

  right_backtrack_feedback: {
    speaker: "Learning Feedback",
    text: "Although suggesting to split the bill may be considered polite and fair in many Western cultures, it can be interpreted quite differently in this situation.\n\nMrs. Zhang explicitly invited you to dinner and, as the host and senior colleague, has taken responsibility for paying the bill. In many Chinese social and professional settings, paying for the meal is more than a financial transaction—it is a symbolic act of hospitality, generosity, and respect. By inviting someone, the host demonstrates care for the relationship and fulfills an important social role.\n\nSuggesting to split the bill interrupts this expected interaction. Instead of accepting the host's gesture, it may unintentionally signal that you are declining her hospitality or questioning her role as the host. It can also imply that you feel uncomfortable accepting the invitation or that you wish to avoid the social obligation created by being treated.\n\nFortunately, you quickly recognized the situation and accepted Mrs. Zhang's invitation with gratitude. By expressing sincere appreciation, you restored the expected social interaction and allowed Mrs. Zhang to fulfill her role as the host.",
    options: [
      { text: "Replay Scenario", nextNode: "bill_trigger" }
    ]
  },

  // Sub-Path: You insist on splitting (Middle and right columns of flowchart)
  right_persist_split: {
    speaker: "You",
    text: "No, I really think splitting is the fairest option",
    expression: "neutral",
    options: [
      { text: "Continue", nextNode: "right_persist_reaction" }
    ]
  },

  right_persist_reaction: {
    speaker: "Narrator",
    text: "Mrs. Zhang is now slightly frustrated in addition.",
    expression: "neutral", // Can map a slightly strained/annoyed face here
    options: [
      { text: "Continue", nextNode: "right_persist_response" }
    ]
  },

  right_persist_response: {
    speaker: "Mrs. Zhang",
    text: "I appreciate your kindness... but I would really prefer to invite you.",
    expression: "neutral",
    options: [
      { text: "Alright, then I'll invite you next time.", nextNode: "right_mitigate_future" },
      { text: "No, I insist. Let's split it.", nextNode: "right_force_split" }
    ]
  },

  // Sub-Path alternative A: You relent and promise to invite her next time (Center column)
  right_mitigate_future: {
    speaker: "You",
    text: "Alright, then I'll invite you next time.",
    expression: "neutral",
    options: [
      { text: "Continue", nextNode: "right_mitigate_reaction" }
    ]
  },

  right_mitigate_reaction: {
    speaker: "Narrator",
    text: "Mrs. Zhang slightly smiles again and pays the bill.",
    expression: "happy",
    options: [
      { text: "Show Feedback", nextNode: "right_mitigate_feedback" }
    ]
  },

  right_mitigate_feedback: {
    speaker: "Learning Feedback",
    text: "Although suggesting to split the bill may be considered polite and fair in many Western cultures, it can be interpreted quite differently in this situation.\n\nMrs. Zhang explicitly invited you to dinner and, as the host and senior colleague, has taken responsibility for paying the bill. In many Chinese social and professional settings, paying for the meal is more than a financial transaction—it is a symbolic act of hospitality, generosity, and respect. By inviting someone, the host demonstrates care for the relationship and fulfills an important social role.\n\nSuggesting to split the bill interrupts this expected interaction. Instead of accepting the host's gesture, it may unintentionally signal that you are declining her hospitality or questioning her role as the host. It can also imply that you feel uncomfortable accepting the invitation or that you wish to avoid the social obligation created by being treated.\n\nYou successfully repaired the interaction by offering to invite Mrs. Zhang next time. In many Chinese social and business settings, reciprocity is not expected to occur immediately. Instead of balancing the cost of a single meal, relationships are often strengthened through repeated acts of generosity over time. By offering to host the next dinner, you acknowledged Mrs. Zhang's hospitality while expressing your willingness to return the favor in the future.",
    options: [
      { text: "Replay Scenario", nextNode: "bill_trigger" }
    ]
  },

  // Sub-Path alternative B: You force the split (Rightmost column)
  right_force_split: {
    speaker: "You",
    text: "No, I insist. Let's split it.",
    expression: "neutral",
    options: [
      { text: "Continue", nextNode: "right_force_split_outcome" }
    ]
  },

  right_force_split_outcome: {
    speaker: "Narrator",
    text: "Mrs. Zhang seems more frustrated and you split the bill.",
    expression: "angry", // Passing the clear frustration to the 3D model
    options: [
      { text: "Show Feedback", nextNode: "right_force_split_feedback" }
    ]
  },

  right_force_split_feedback: {
    speaker: "Learning Feedback",
    text: "Although suggesting to split the bill may be considered polite and fair in many Western cultures, it can be interpreted quite differently in this situation.\n\nMrs. Zhang explicitly invited you to dinner and, as the host and senior colleague, has taken responsibility for paying the bill. In many Chinese social and professional settings, paying for the meal is more than a financial transaction—it is a symbolic act of hospitality, generosity, and respect. By inviting someone, the host demonstrates care for the relationship and fulfills an important social role.\n\nSuggesting to split the bill interrupts this expected interaction. Instead of accepting the host's gesture, it may unintentionally signal that you are declining her hospitality or questioning her role as the host. It can also imply that you feel uncomfortable accepting the invitation or that you wish to avoid the social obligation created by being treated.",
    options: [
      { text: "Replay Scenario", nextNode: "bill_trigger" }
    ]
  }
};

export default dialogueTree;