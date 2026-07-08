/**
 * GAME DIALOGUE TREE - The Dinner Scene
 */

const dialogueTree = {
  // Introduction context node
  // start: {
  //   speaker: {
  //     en: "Narrator",
  //     zh: "旁白",
  //     de: "Erzähler"
  //   },
  //   text: {
  //     en: "You have been invited to dinner by your Chinese colleague, Mrs. Zhang, who holds a higher position in the company than you. Throughout the meal, the conversation has been pleasant and everything has gone smoothly. You have enjoyed the food, exchanged ideas about work and daily life, and the dinner is now coming to an end.",
  //     zh: "你被你的中国同事张太太邀请共进晚餐，她在公司中的职位比你高。在整个用餐过程中，谈话一直很愉快，一切都很顺利。你享受了美食，交流了关于工作和日常生活的想法，晚餐即将结束。",
  //     de: "Sie wurden zum Abendessen von Ihrer chinesischen Kollegin Frau Zhang eingeladen, die eine höhere Position in der Firma innehat als Sie. Während des Essens war das Gespräch angenehm und alles verlief reibungslos. Sie haben das Essen genossen, sich über Arbeit und das tägliche Leben ausgetauscht, und das Abendessen neigt sich dem Ende zu."
  //   },
  //   expression: "neutral",
  //   options: [
  //     { text: { en: "Continue", zh: "继续", de: "Weiter" }, nextNode: "intro_01" }
  //   ]
  // },

  start: {
    speaker: {
      en: "Mrs. Zhang",
      zh: "张太太",
      de: "Frau Zhang"
    },
    text: {
      en: "Thank you for joining me today.",
      zh: "谢谢你今天来陪我。",
      de: "Danke, dass Sie heute gekommen sind."
    },
    expression: "neutral",
    options: [
      { text: { en: "Thank you for inviting me.", zh: "谢谢你邀请我。", de: "Danke für die Einladung." }, nextNode: "intro_02" }
    ]
  },

  intro_02: {
    speaker: {
      en: "Mrs. Zhang",
      zh: "张太太",
      de: "Frau Zhang"
    },
    text: {
      en: "How are you finding your work in China so far?",
      zh: "到目前为止，你觉得在中国的工作怎么样？",
      de: "Wie gefällt Ihnen Ihre Arbeit in China bisher?"
    },
    expression: "neutral",
    options: [
      { text: { en: "It's been very interesting. I'm still learning a lot about Chinese culture.", zh: "非常有趣。我还在学习很多关于中国文化的知识。", de: "Es ist sehr interessant. Ich lerne noch viel über die chinesische Kultur." }, nextNode: "intro_03" }
    ]
  },

  intro_03: {
    speaker: {
      en: "Mrs. Zhang",
      zh: "张太太",
      de: "Frau Zhang"
    },
    text: {
      en: "That's good. Understanding the culture is often more important than understanding procedures.",
      zh: "这很好。理解文化往往比理解程序更重要。",
      de: "Das ist gut. Das Verständnis der Kultur ist oft wichtiger als das Verständnis der Verfahren."
    },
    expression: "neutral",
    options: [
      { text: { en: "I agree.", zh: "我同意。", de: "Ich stimme zu." }, nextNode: "intro_04" }
    ]
  },

  intro_04: {
    speaker: {
      en: "Mrs. Zhang",
      zh: "张太太",
      de: "Frau Zhang"
    },
    text: {
      en: "Have you had many opportunities to work with Chinese colleagues?",
      zh: "你有很多机会与中国同事合作吗？",
      de: "Hatten Sie viele Gelegenheiten, mit chinesischen Kollegen zu arbeiten?"
    },
    expression: "neutral",
    options: [
      { text: { en: "Yes although I still feel that there are many things I don't fully understand yet.", zh: "是的，虽然我仍然觉得还有很多事情我不完全理解。", de: "Ja, obwohl ich immer noch das Gefühl habe, dass es viele Dinge gibt, die ich noch nicht vollständig verstehe." }, nextNode: "intro_05" }
    ]
  },

  intro_05: {
    speaker: {
      en: "Mrs. Zhang",
      zh: "张太太",
      de: "Frau Zhang"
    },
    text: {
      en: "That's completely normal.",
      zh: "这完全正常。",
      de: "Das ist völlig normal."
    },
    expression: "neutral",
    options: [
      { text: { en: "Continue", zh: "继续", de: "Weiter" }, nextNode: "bill_trigger" }
    ]
  },

  // The 3-way split node
  bill_trigger: {
    speaker: {
      en: "Mrs. Zhang",
      zh: "张太太",
      de: "Frau Zhang"
    },
    text: {
      en: "[The waiter has just brought the bill to the table. Mrs. Zhang immediately reaches for it.] \n\nPlease allow me. I invited you.",
      zh: "[服务员刚把账单拿到桌子上。张太太立刻伸手去拿。]\n\n请让我来。我邀请了你。",
      de: "[Der Kellner hat gerade die Rechnung an den Tisch gebracht. Frau Zhang greift sofort danach.] \n\nBitte lassen Sie mich. Ich habe Sie eingeladen."
    },
    expression: "neutral",
    options: [
      { text: { en: "Thank you very much.", zh: "非常感谢。", de: "Vielen Dank." }, nextNode: "left_branch_start" }, // Option 1
      { text: { en: "No, please let me pay.", zh: "不，请让我来付。", de: "Nein, bitte lassen Sie mich bezahlen." }, nextNode: "center_branch_start" }, // Option 2
      { text: { en: "How about we split the bill?", zh: "我们平摊账单怎么样？", de: "Wie wäre es, wenn wir die Rechnung teilen?" }, nextNode: "right_branch_start" } // Option 3
    ]
  },

  // Option 1
  left_branch_start: {
    speaker: {
      en: "You",
      zh: "你",
      de: "Sie"
    },
    text: {
      en: "Thank you very much",
      zh: "非常感谢",
      de: "Vielen Dank"
    },
    expression: "smile_polite", // EXPRESS POLITE SMILE
    options: [
      { text: { en: "Continue", zh: "继续", de: "Weiter" }, nextNode: "left_branch_obligation_break" }
    ]
  },
  

  // left_branch_pays: {
  //   speaker: {
  //     en: "Narrator",
  //     zh: "旁白",
  //     de: "Erzähler"
  //   },
  //   text: {
  //     en: "Mrs. Zhang smiles politely and pays the bill.",
  //     zh: "张太太礼貌地微笑着付了账。",
  //     de: "Frau Zhang lächelt höflich und bezahlt die Rechnung."
  //   },
  //   expression: "smile_polite", // EXPRESS POLITE SMILE
  //   options: [
  //     { text: { en: "Continue", zh: "继续", de: "Weiter" }, nextNode: "left_branch_obligation_break" }
  //   ]
  // },

  left_branch_obligation_break: {
    speaker: {
      en: "Mrs. Zhang",
      zh: "张太太",
      de: "Frau Zhang"
    },
    text: {
      en: "...",
      zh: "...",
      de: "..."
      // en: "[A slight social obligation break]\nNormally offering to pay the bill is a ritual and shows gratitude. Her smile becomes slightly more reserved, and she appears momentarily surprised that you accepted immediately without first offering to pay. This is a subtle social obligation break rather than a serious mistake.",
      // zh: "[轻微的社会义务违背]\n通常主动提出付账是一种仪式，表示感激。她的微笑变得稍微有些保留，她似乎对你没有先主动提出付账就立即接受感到有些惊讶。这是一种微妙的社会义务违背，而不是严重的错误。",
      // de: "[Eine leichte Verletzung der sozialen Verpflichtung]\nNormalerweise ist das Angebot, die Rechnung zu bezahlen, ein Ritual und zeigt Dankbarkeit. Ihr Lächeln wird etwas zurückhaltender, und sie scheint kurzzeitig überrascht, dass Sie sofort akzeptiert haben, ohne zuerst anzubieten, zu bezahlen. Dies ist eine subtile Verletzung der sozialen Verpflichtung und kein ernster Fehler."
    },
    expression: "surprised", // FIX
    options: [
      { text: { en: "Thank you. Next time, dinner is on me.", zh: "谢谢。下次我请客。", de: "Danke. Beim nächsten Mal lade ich Sie zum Abendessen ein." }, nextNode: "left_branch_mitigated" }, // Option 1a
      { text: { en: "Thank you again.", zh: "再次感谢。", de: "Nochmals danke." }, nextNode: "left_branch_failed" } // Option 1b
    ]
  },

  // PATH A: Mitigating with a future offer (Left side of your image)
  // Option 1a
  left_branch_mitigated: {
    speaker: {
      en: "You",
      zh: "你",
      de: "Sie"
    },
    text: {
      en: "Thank you. Next time, dinner is on me.",
      zh: "谢谢。下次我请客。",
      de: "Danke. Beim nächsten Mal lade ich Sie zum Abendessen ein."
    },
    expression: "smile_polite",
    options: [
      { text: { en: "Continue", zh: "继续", de: "Weiter" }, nextNode: "left_branch_join_next" }
    ]
  },

  // left_branch_warm_smile: {
  //   speaker: {
  //     en: "Mrs. Zhang",
  //     zh: "张太太",
  //     de: "Frau Zhang"
  //   },
  //   text: {
  //     en: "Mrs. Zhang smiles warmly and happy.",
  //     zh: "张太太温暖而快乐地微笑着。",
  //     de: "Frau Zhang lächelt warm und glücklich."
  //   },
  //   expression: "smile_polite", // EXPRESS WARM SMILE
  //   options: [
  //     { text: { en: "Continue", zh: "继续", de: "Weiter" }, nextNode: "left_branch_join_next" }
  //   ]
  // },

  left_branch_join_next: {
    speaker: {
      en: "Mrs. Zhang",
      zh: "张太太",
      de: "Frau Zhang"
    },
    text: {
      en: "That is very kind of you. I would be happy to join you next time.",
      zh: "你太客气了。我很乐意下次和你一起吃饭。",
      de: "Das ist sehr nett von Ihnen. Ich würde mich freuen, das nächste Mal mit Ihnen zu essen."
    },
    expression: "smile_polite",
    options: [
      { text: { en: "Show Feedback", zh: "显示反馈", de: "Feedback anzeigen" }, nextNode: "left_branch_feedback_good" }
    ]
  },

  left_branch_feedback_good: {
    speaker: {
      en: "Learning Feedback",
      zh: "学习反馈",
      de: "Lernfeedback"
    },
    text: {
      en: "In Chinese business culture, it is common to briefly offer to pay the bill before accepting the host's invitation. This ritual demonstrates politeness and respect rather than a genuine expectation of paying.\nAccepting the invitation immediately is generally not considered rude, especially when the host has explicitly invited you.\nHowever, it is considered good etiquette to express reciprocity by offering to host the next meal or meeting. Reciprocity in Chinese culture is often maintained over time rather than through an immediate equal exchange. Saying 'Next time, dinner is on me' acknowledges the host's generosity while signaling your willingness to return the favor in the future.",
      zh: "在中国商业文化中，在接受主人邀请之前，通常会简要提出付账。这种仪式展示了礼貌和尊重，而不是真正的期望付账。\n立即接受邀请通常不被认为是不礼貌的，特别是当主人明确邀请你的时候。\n然而，通过提出主持下一顿饭或会议来表达互惠被认为是良好的礼仪。中国文化中的互惠通常是在一段时间内维持的，而不是通过即时的等价交换。说\"下次我请客\"承认了主人的慷慨，同时也表明了你愿意在未来回报这份好意。",
      de: "In der chinesischen Geschäftskultur ist es üblich, kurz anzubieten, die Rechnung zu bezahlen, bevor man die Einladung des Gastgebers annimmt. Dieses Ritual zeigt Höflichkeit und Respekt und keine echte Erwartung, zu bezahlen.\nDas sofortige Akzeptieren der Einladung wird im Allgemeinen nicht als unhöflich angesehen, insbesondere wenn der Gastgeber Sie ausdrücklich eingeladen hat.\nEs gilt jedoch als gute Etikette, Gegenseitigkeit zu zeigen, indem man anbietet, das nächste Essen oder Treffen auszurichten. Gegenseitigkeit wird in der chinesischen Kultur oft über die Zeit aufrechterhalten und nicht durch einen sofortigen gleichwertigen Austausch. Zu sagen 'Beim nächsten Mal lade ich Sie ein' erkennt die Großzügigkeit des Gastgebers an und signalisiert Ihre Bereitschaft, die Gunst in Zukunft zu erwidern."
    },
    expression: "neutral",
    options: [
      { text: { en: "Replay Scenario", zh: "重播场景", de: "Szenario wiederholen" }, nextNode: "bill_trigger" }
    ]
  },

  // PATH B: Double thanking without a future offer (Right side of your image)
  // Option 1b
  left_branch_failed: {
    speaker: {
      en: "You",
      zh: "你",
      de: "Sie"
    },
    text: {
      en: "Thank you again.",
      zh: "再次感谢。",
      de: "Nochmals danke."
    },
    expression: "smile_polite", // EXPRESS POLITE SMILE
    options: [
      { text: { en: "Continue", zh: "继续", de: "Weiter" }, nextNode: "left_branch_feedback_bad" }
    ]
  },

  // left_branch_abrupt_end: {
  //   speaker: {
  //     en: "Narrator",
  //     zh: "旁白",
  //     de: "Erzähler"
  //   },
  //   text: {
  //     en: "Mrs. Zhang still smiles politely but ends the conversation immediately.",
  //     zh: "张太太仍然礼貌地微笑着，但立即结束了谈话。",
  //     de: "Frau Zhang lächelt immer noch höflich, beendet das Gespräch aber sofort."
  //   },
  //   expression: "smile_polite", 
  //   options: [
  //     { text: { en: "Show Feedback", zh: "显示反馈", de: "Feedback anzeigen" }, nextNode: "left_branch_feedback_bad" }
  //   ]
  // },

  left_branch_feedback_bad: {
    speaker: {
      en: "Learning Feedback",
      zh: "学习反馈",
      de: "Lernfeedback"
    },
    text: {
      en: "In Chinese business culture, it is common to briefly offer to pay the bill before accepting the host's invitation. This ritual demonstrates politeness and respect rather than a genuine expectation of paying.\n\nAccepting the invitation immediately is generally not considered rude, especially when the host has explicitly invited you.\nHowever, it is considered good etiquette to express reciprocity by offering to host the next meal or meeting. A better option would be offering, that you pay for dinner the next time signaling the willingness to return the favor in the future.",
      zh: "在中国商业文化中，在接受主人邀请之前，通常会简要提出付账。这种仪式展示了礼貌和尊重，而不是真正的期望付账。\n\n立即接受邀请通常不被认为是不礼貌的，特别是当主人明确邀请你的时候。\n然而，通过提出主持下一顿饭或会议来表达互惠被认为是良好的礼仪。更好的选择是提出下次你付晚餐费用，表明你愿意在未来回报这份好意。",
      de: "In der chinesischen Geschäftskultur ist es üblich, kurz anzubieten, die Rechnung zu bezahlen, bevor man die Einladung des Gastgebers annimmt. Dieses Ritual zeigt Höflichkeit und Respekt und keine echte Erwartung, zu bezahlen.\n\nDas sofortige Akzeptieren der Einladung wird im Allgemeinen nicht als unhöflich angesehen, insbesondere wenn der Gastgeber Sie ausdrücklich eingeladen hat.\nEs gilt jedoch als gute Etikette, Gegenseitigkeit zu zeigen, indem man anbietet, das nächste Essen oder Treffen auszurichten. Eine bessere Option wäre, anzubieten, dass Sie beim nächsten Mal das Abendessen bezahlen, was signalisiert, dass Sie bereit sind, die Gunst in Zukunft zu erwidern."
    },
    expression: "neutral",
    options: [
      { text: { en: "Replay Scenario", zh: "重播场景", de: "Szenario wiederholen" }, nextNode: "bill_trigger" }
    ]
  },
  
  // Central Branch: Fighting for the Bill
  // Option 2
  // --- ROUND 1 COUNTER-OFFER ---
  center_branch_start: {
    speaker: {
      en: "You",
      zh: "你",
      de: "Sie"
    },
    text: {
      en: "No please let me pay.",
      zh: "不，请让我来付。",
      de: "Nein, bitte lassen Sie mich bezahlen."
    },
    expression: "neutral",
    options: [
      { text: { en: "Continue", zh: "继续", de: "Weiter" }, nextNode: "center_round1_response" }
    ]
  },

  center_round1_response: {
    speaker: {
      en: "Mrs. Zhang",
      zh: "张太太",
      de: "Frau Zhang"
    },
    text: {
      en: "No, you are my guest.",
      zh: "不，你是我的客人。",
      de: "Nein, Sie sind mein Gast."
    },
    expression: "neutral",
    options: [
      { text: { en: "Thank you very much.", zh: "非常感谢。", de: "Vielen Dank." }, nextNode: "center_give_in_round1" },
      { text: { en: "I really appreciate that, but I would really like to pay.", zh: "我真的很感激，但我真的很想付。", de: "Ich schätze das sehr, aber ich würde wirklich gerne bezahlen." }, nextNode: "center_round2_offer" }
    ]
  },

  // Sub-Path: You give in after 1 offer
  center_give_in_round1: {
    speaker: {
      en: "You",
      zh: "你",
      de: "Sie"
    },
    text: {
      en: "Thank you very much.",
      zh: "非常感谢。",
      de: "Vielen Dank."
    },
    options: [{ text: { en: "Continue", zh: "继续", de: "Weiter" }, nextNode: "center_g1_reaction" }]
  },

  center_g1_reaction: {
    speaker: {
      en: "Mrs. Zhang",
      zh: "张太太",
      de: "Frau Zhang"
    },
    text: {
      en: "...",
      zh: "...",
      de: "..."
      // en: "Mrs. Zhang smiles politely and pays. But she seems to be moderately confused.",
      // zh: "张太太礼貌地微笑着付了账。但她似乎有些困惑。",
      // de: "Frau Zhang lächelt höflich und bezahlt. Aber sie scheint moderat verwirrt zu sein."
    },
    expression: "smile_polite_moderate_confusion", // EXPRESS POLITE SMILE & MODERATE CONFUSION
    options: [
      { text: { en: "(Say nothing)", zh: "(什么都不说)", de: "(Nichts sagen)" }, nextNode: "center_g1_silence" },
      { text: { en: "Next time, I would like to invite you", zh: "下次我想邀请你", de: "Beim nächsten Mal möchte ich Sie einladen" }, nextNode: "center_g1_mitigate" }
    ]
  },

  center_g1_silence: {
    speaker: {
      en: "You",
      zh: "你",
      de: "Sie"
    },
    text: {
      en: "(silence)",
      zh: "(沉默)",
      de: "(Stille)"
    },
    options: [{ text: { en: "Show Feedback", zh: "显示反馈", de: "Feedback anzeigen" }, nextNode: "center_g1_silence_feedback" }]
  },

  center_g1_silence_feedback: {
    speaker: {
      en: "Learning Feedback",
      zh: "学习反馈",
      de: "Lernfeedback"
    },
    text: {
      en: "You correctly offered to pay once, showing appreciation for your host's generosity.\nIn many Chinese business settings, however, it is common to continue this polite exchange for three rounds before accepting the invitation.",
      zh: "你正确地提出了一次付账，展示了对主人慷慨的感激。\n然而，在许多中国商业环境中，通常会在接受邀请之前继续这种礼貌的交流三轮。",
      de: "Sie haben korrekt einmal angeboten, zu bezahlen, was Ihre Wertschätzung für die Großzügigkeit Ihres Gastgebers zeigt.\nIn vielen chinesischen Geschäftsumgebungen ist es jedoch üblich, diesen höflichen Austausch drei Runden lang fortzusetzen, bevor die Einladung angenommen wird."
    },
    options: [{ text: { en: "Replay Scenario", zh: "重播场景", de: "Szenario wiederholen" }, nextNode: "bill_trigger" }]
  },

  center_g1_mitigate: {
    speaker: {
      en: "You",
      zh: "你",
      de: "Sie"
    },
    text: {
      en: "Next time, I would like to invite you",
      zh: "下次我想邀请你",
      de: "Beim nächsten Mal möchte ich Sie einladen"
    },
    options: [{ text: { en: "Continue", zh: "继续", de: "Weiter" }, nextNode: "center_g1_mitigate_reaction" }]
  },

  center_g1_mitigate_reaction: {
    speaker: {
      en: "Mrs. Zhang",
      zh: "张太太",
      de: "Frau Zhang"
    },
    text: {
      en: "That is very kind of you. I would be happy to join you next time.",
      zh: "你太客气了。我很乐意下次和你一起吃饭。",
      de: "Das ist sehr nett von Ihnen. Ich würde mich freuen, das nächste Mal mit Ihnen zu essen."
    },
    expression: "smile_polite", // EXPRESS WARM SMILE
    options: [{ text: { en: "Show Feedback", zh: "显示反馈", de: "Feedback anzeigen" }, nextNode: "center_g1_mitigate_feedback" }]
  },

  center_g1_mitigate_feedback: {
    speaker: {
      en: "Learning Feedback",
      zh: "学习反馈",
      de: "Lernfeedback"
    },
    text: {
      en: "You correctly offered to pay once, showing appreciation for your host's generosity.\nIn many Chinese business settings, however, it is common to continue this polite exchange for three rounds before accepting the invitation.\nHowever, it is considered good etiquette to express reciprocity by offering to host the next meal or meeting. Reciprocity in Chinese culture is often maintained over time rather than through an immediate equal exchange. Saying 'Next time, dinner is on me.' acknowledges the host's generosity while signaling your willingness to return the favor in the future.",
      zh: "你正确地提出了一次付账，展示了对主人慷慨的感激。\n然而，在许多中国商业环境中，通常会在接受邀请之前继续这种礼貌的交流三轮。\n然而，通过提出主持下一顿饭或会议来表达互惠被认为是良好的礼仪。中国文化中的互惠通常是在一段时间内维持的，而不是通过即时的等价交换。说\"下次我请客\"承认了主人的慷慨，同时也表明了你愿意在未来回报这份好意。",
      de: "Sie haben korrekt einmal angeboten, zu bezahlen, was Ihre Wertschätzung für die Großzügigkeit Ihres Gastgebers zeigt.\nIn vielen chinesischen Geschäftsumgebungen ist es jedoch üblich, diesen höflichen Austausch drei Runden lang fortzusetzen, bevor die Einladung angenommen wird.\nEs gilt jedoch als gute Etikette, Gegenseitigkeit zu zeigen, indem man anbietet, das nächste Essen oder Treffen auszurichten. Gegenseitigkeit wird in der chinesischen Kultur oft über die Zeit aufrechterhalten und nicht durch einen sofortigen gleichwertigen Austausch. Zu sagen 'Beim nächsten Mal lade ich Sie ein' erkennt die Großzügigkeit des Gastgebers an und signalisiert Ihre Bereitschaft, die Gunst in Zukunft zu erwidern."
    },
    options: [{ text: { en: "Replay Scenario", zh: "重播场景", de: "Szenario wiederholen" }, nextNode: "bill_trigger" }]
  },


  // --- ROUND 2 COUNTER-OFFER ---
  center_round2_offer: {
    speaker: {
      en: "You",
      zh: "你",
      de: "Sie"
    },
    text: {
      en: "I really appreciate that, but I would really like to pay.",
      zh: "我真的很感激，但我真的很想付。",
      de: "Ich schätze das sehr, aber ich würde wirklich gerne bezahlen."
    },
    options: [{ text: { en: "Continue", zh: "继续", de: "Weiter" }, nextNode: "center_round2_response" }]
  },

  center_round2_response: {
    speaker: {
      en: "Mrs. Zhang",
      zh: "张太太",
      de: "Frau Zhang"
    },
    text: {
      en: "That is very kind of you, but I want to invite you.",
      zh: "你太客气了，但我想邀请你。",
      de: "Das ist sehr nett von Ihnen, aber ich möchte Sie einladen."
    },
    expression: "neutral",
    options: [
      { text: { en: "Thank you very much.", zh: "非常感谢。", de: "Vielen Dank." }, nextNode: "center_give_in_round2" },
      { text: { en: "No, I couldn't possibly let you pay.", zh: "不，我不能让你付。", de: "Nein, ich könnte unmöglich Sie bezahlen lassen." }, nextNode: "center_round3_offer" }
    ]
  },

  // Sub-Path: You give in after 2 offers
  center_give_in_round2: {
    speaker: {
      en: "You",
      zh: "你",
      de: "Sie"
    },
    text: {
      en: "Thank you very much.",
      zh: "非常感谢。",
      de: "Vielen Dank."
    },
    options: [{ text: { en: "Continue", zh: "继续", de: "Weiter" }, nextNode: "center_g2_reaction" }]
  },

  center_g2_reaction: {
    speaker: {
      en: "Mrs. Zhang",
      zh: "张太太",
      de: "Frau Zhang"
    },
    text: {
      en: "...",
      zh: "...",
      de: "..."
      // en: "Mrs. Zhang smiles politely and pays. But she seems to be slightly confused.",
      // zh: "张太太礼貌地微笑着付了账。但她似乎有些困惑。",
      // de: "Frau Zhang lächelt höflich und bezahlt. Aber sie scheint leicht verwirrt zu sein."
    },
    expression: "smile_polite_slight_confusion", // EXPRESS POLITE SMILE & SLIGHT CONFUSION
    options: [
      { text: { en: "Says nothing.", zh: "什么都不说。", de: "Sagt nichts." }, nextNode: "center_g2_silence" },
      { text: { en: "Next time, I would like to invite you", zh: "下次我想邀请你", de: "Beim nächsten Mal möchte ich Sie einladen" }, nextNode: "center_g2_mitigate" }
    ]
  },

  center_g2_silence: {
    speaker: {
      en: "You",
      zh: "你",
      de: "Sie"
    },
    text: {
      en: "...",
      zh: "……",
      de: "..."
    },
    options: [{ text: { en: "Show Feedback", zh: "显示反馈", de: "Feedback anzeigen" }, nextNode: "center_g2_silence_feedback" }]
  },

  center_g2_silence_feedback: {
    speaker: {
      en: "Learning Feedback",
      zh: "学习反馈",
      de: "Lernfeedback"
    },
    text: {
      en: "You correctly offered to pay twice, showing appreciation for your host's generosity.\nIn many Chinese business settings, however, it is common to continue this polite exchange for three rounds before accepting the invitation.",
      zh: "你正确地提出了两次付账，展示了对主人慷慨的感激。\n然而，在许多中国商业环境中，通常会在接受邀请之前继续这种礼貌的交流三轮。",
      de: "Sie haben korrekt zweimal angeboten, zu bezahlen, was Ihre Wertschätzung für die Großzügigkeit Ihres Gastgebers zeigt.\nIn vielen chinesischen Geschäftsumgebungen ist es jedoch üblich, diesen höflichen Austausch drei Runden lang fortzusetzen, bevor die Einladung angenommen wird."
    },
    options: [{ text: { en: "Replay Scenario", zh: "重播场景", de: "Szenario wiederholen" }, nextNode: "bill_trigger" }]
  },

  center_g2_mitigate: {
    speaker: {
      en: "You",
      zh: "你",
      de: "Sie"
    },
    text: {
      en: "Next time, I would like to invite you",
      zh: "下次我想邀请你",
      de: "Beim nächsten Mal möchte ich Sie einladen"
    },
    options: [{ text: { en: "Continue", zh: "继续", de: "Weiter" }, nextNode: "center_g2_mitigate_reaction" }]
  },

  center_g2_mitigate_reaction: {
    speaker: {
      en: "Mrs. Zhang",
      zh: "张太太",
      de: "Frau Zhang"
    },
    text: {
      en: "That is very kind of you. I would be happy to join you next time.",
      zh: "你太客气了。我很乐意下次和你一起吃饭。",
      de: "Das ist sehr nett von Ihnen. Ich würde mich freuen, das nächste Mal mit Ihnen zu essen."
    },
    expression: "smile_polite", // EXPRESS WARM & HAPPY SMILE
    options: [{ text: { en: "Show Feedback", zh: "显示反馈", de: "Feedback anzeigen" }, nextNode: "center_g2_mitigate_feedback" }]
  },

  center_g2_mitigate_feedback: {
    speaker: {
      en: "Learning Feedback",
      zh: "学习反馈",
      de: "Lernfeedback"
    },
    text: {
      en: "You correctly offered to pay twice, showing appreciation for your host's generosity.\nIn many Chinese business settings, however, it is common to continue this polite exchange for three rounds before accepting the invitation.\nHowever, it is considered good etiquette to express reciprocity by offering to host the next meal or meeting. Reciprocity in Chinese culture is often maintained over time rather than through an immediate equal exchange. Saying 'Next time, dinner is on me.' acknowledges the host's generosity while signaling your willingness to return the favor in the future.",
      zh: "你正确地提出了两次付账，展示了对主人慷慨的感激。\n然而，在许多中国商业环境中，通常会在接受邀请之前继续这种礼貌的交流三轮。\n然而，通过提出主持下一顿饭或会议来表达互惠被认为是良好的礼仪。中国文化中的互惠通常是在一段时间内维持的，而不是通过即时的等价交换。说\"下次我请客\"承认了主人的慷慨，同时也表明了你愿意在未来回报这份好意。",
      de: "Sie haben korrekt zweimal angeboten, zu bezahlen, was Ihre Wertschätzung für die Großzügigkeit Ihres Gastgebers zeigt.\nIn vielen chinesischen Geschäftsumgebungen ist es jedoch üblich, diesen höflichen Austausch drei Runden lang fortzusetzen, bevor die Einladung angenommen wird.\nEs gilt jedoch als gute Etikette, Gegenseitigkeit zu zeigen, indem man anbietet, das nächste Essen oder Treffen auszurichten. Gegenseitigkeit wird in der chinesischen Kultur oft über die Zeit aufrechterhalten und nicht durch einen sofortigen gleichwertigen Austausch. Zu sagen 'Beim nächsten Mal lade ich Sie ein' erkennt die Großzügigkeit des Gastgebers an und signalisiert Ihre Bereitschaft, die Gunst in Zukunft zu erwidern."
    },
    options: [{ text: { en: "Replay Scenario", zh: "重播场景", de: "Szenario wiederholen" }, nextNode: "bill_trigger" }]
  },


  // --- ROUND 3 COUNTER-OFFER (The Golden Standard Path) ---
  center_round3_offer: {
    speaker: {
      en: "You",
      zh: "你",
      de: "Sie"
    },
    text: {
      en: "No, I couldn't possibly let you pay.",
      zh: "不，我不能让你付。",
      de: "Nein, ich könnte unmöglich Sie bezahlen lassen."
    },
    options: [{ text: { en: "Continue", zh: "继续", de: "Weiter" }, nextNode: "center_round3_response" }]
  },

  center_round3_response: {
    speaker: {
      en: "Mrs. Zhang",
      zh: "张太太",
      de: "Frau Zhang"
    },
    text: {
      en: "Really, it is my pleasure.",
      zh: "真的，这是我的荣幸。",
      de: "Wirklich, es ist mir eine Freude."
    },
    expression: "neutral",
    options: [
      { text: { en: "Thank you very much.", zh: "非常感谢。", de: "Vielen Dank." }, nextNode: "center_give_in_round3" },
      { text: { en: "No, I insist.", zh: "不，我坚持。", de: "Nein, ich bestehe darauf." }, nextNode: "center_round4_overdo" }
    ]
  },

  // Sub-Path: You give in after 3 offers (Perfect Outcome)
  center_give_in_round3: {
    speaker: {
      en: "You",
      zh: "你",
      de: "Sie"
    },
    text: {
      en: "Thank you very much.",
      zh: "非常感谢。",
      de: "Vielen Dank."
    },
    options: [{ text: { en: "Continue", zh: "继续", de: "Weiter" }, nextNode: "center_g3_reaction" }]
  },

  center_g3_reaction: {
    speaker: {
      en: "Mrs. Zhang",
      zh: "张太太",
      de: "Frau Zhang"
    },
    text: {
      en: "You're very welcome. I'm glad we could have dinner together.",
      zh: "不客气。我很高兴我们能一起吃饭。",
      de: "Sehr gerne. Ich freue mich, dass wir zusammen essen konnten."
    },
    expression: "smile_polite",
    options: [{ text: { en: "Continue", zh: "继续", de: "Weiter" }, nextNode: "center_g3_outcome" }]
  },

  center_g3_outcome: {
    speaker: {
      en: "Mrs. Zhang",
      zh: "张太太",
      de: "Frau Zhang"
    },
    text: {
      en: "...",
      zh: "...",
      de: "..."
      // en: "Mrs Zhang pays the bill and smiles warmly. She is happy.",
      // zh: "张太太付了账，温暖地微笑着。她很快乐。",
      // de: "Frau Zhang bezahlt die Rechnung und lächelt warm. Sie ist glücklich."
    },
    expression: "smile_polite", // EXPRESS WARM & HAPPY SMILE
    options: [{ text: { en: "Show Feedback", zh: "显示反馈", de: "Feedback anzeigen" }, nextNode: "center_g3_feedback" }]
  },

  center_g3_feedback: {
    speaker: {
      en: "Learning Feedback",
      zh: "学习反馈",
      de: "Lernfeedback"
    },
    text: {
      en: "The interaction follows the expected social ritual. You handled this situation appropriately according to common Chinese business etiquette.\n\nAlthough Mrs. Zhang intended to pay from the beginning, it is customary to politely refuse the offer thrice before finally accepting. The purpose of this exchange is not to determine who actually pays, but to demonstrate sincerity, respect, and appreciation for the other person's generosity.\nBy offering to pay multiple times, you showed that you did not simply expect your host to cover the bill. By accepting the invitation after Mrs. Zhang continued to insist, you also respected her role as the host and her higher hierarchical position.",
      zh: "这种互动遵循了预期的社会仪式。你按照中国商业礼仪恰当地处理了这种情况。\n\n虽然张太太从一开始就打算付账，但通常在最终接受之前会礼貌地拒绝三次。这种交流的目的不是决定谁真正付账，而是展示真诚、尊重和对他人慷慨的感激。\n通过多次提出付账，你表明你并没有简单地期望主人付账。在张太太继续坚持后接受邀请，你也尊重了她作为主人的角色和她的更高职位。",
      de: "Die Interaktion folgt dem erwarteten sozialen Ritual. Sie haben diese Situation entsprechend der allgemeinen chinesischen Geschäftsetikette angemessen gehandelt.\n\nObwohl Frau Zhang von Anfang an beabsichtigte, zu bezahlen, ist es üblich, das Angebot höflich dreimal abzulehnen, bevor man es schließlich annimmt. Der Zweck dieses Austauschs ist nicht zu bestimmen, wer tatsächlich bezahlt, sondern Aufrichtigkeit, Respekt und Wertschätzung für die Großzügigkeit der anderen Person zu zeigen.\nIndem Sie mehrfach anboten, zu bezahlen, zeigten Sie, dass Sie nicht einfach erwarteten, dass Ihr Gastgeber die Rechnung bezahlt. Indem Sie die Einladung annahmen, nachdem Frau Zhang weiterhin darauf bestand, respektierten Sie auch ihre Rolle als Gastgeberin und ihre höhere hierarchische Position."
    },
    options: [{ text: { en: "Replay Scenario", zh: "重播场景", de: "Szenario wiederholen" }, nextNode: "bill_trigger" }]
  },


  // --- ROUND 4+ OVERDOING IT (Negative Path) ---
  center_round4_overdo: {
    speaker: {
      en: "You",
      zh: "你",
      de: "Sie"
    },
    text: {
      en: "No, I insist.",
      zh: "不，我坚持。",
      de: "Nein, ich bestehe darauf."
    },
    options: [{ text: { en: "Continue", zh: "继续", de: "Weiter" }, nextNode: "center_round4_response" }]
  },

  center_round4_response: {
    speaker: {
      en: "Mrs. Zhang",
      zh: "张太太",
      de: "Frau Zhang"
    },
    text: {
      en: "Please allow me.",
      zh: "请让我来。",
      de: "Bitte lassen Sie mich."
    },
    expression: "neutral", 
    options: [{ text: { en: "Continue", zh: "继续", de: "Weiter" }, nextNode: "center_round4_strained_reaction" }]
  },

  center_round4_strained_reaction: {
    speaker: {
      en: "Mrs. Zhang",
      zh: "张太太",
      de: "Frau Zhang"
    },
    text: {
      en: "...",
      zh: "...",
      de: "..."
      // en: "Mrs. Zhang only smiles lightly. But she seems to be ashamed.",
      // zh: "张太太只是淡淡地微笑着。但她似乎有些羞愧。",
      // de: "Frau Zhang lächelt nur leicht. Aber sie scheint beschämt zu sein."
    },
    expression: "smile_slight_ashamed", // EXPRESS SLIGHT SMILE AND ASHAMED
    options: [
      { text: { en: "Thank you very much.", zh: "非常感谢。", de: "Vielen Dank." }, nextNode: "center_overdone_give_in" },
      { text: { en: "No, I couldn't possibly.", zh: "不，我不能。", de: "Nein, ich könnte unmöglich." }, nextNode: "center_round5_break" }
    ]
  },

  // Sub-Path: You finally give in late (4th offer)
  center_overdone_give_in: {
    speaker: {
      en: "You",
      zh: "你",
      de: "Sie"
    },
    text: {
      en: "Thank you very much.",
      zh: "非常感谢。",
      de: "Vielen Dank."
    },
    options: [{ text: { en: "Continue", zh: "继续", de: "Weiter" }, nextNode: "center_overdone_give_in_reaction" }]
  },

  center_overdone_give_in_reaction: {
    speaker: {
      en: "Mrs. Zhang",
      zh: "张太太",
      de: "Frau Zhang"
    },
    text: {
      en: "...",
      zh: "...",
      de: "..."
      // en: "Mrs. Zhang smiles politely and pays. But she seems to be slightly ashamed",
      // zh: "张太太礼貌地微笑着付了账。但她似乎有些羞愧。",
      // de: "Frau Zhang lächelt höflich und bezahlt. Aber sie scheint leicht beschämt zu sein."
    },
    expression: "smile_slight_ashamed", // EXPRESS SLIGHT SMILE AND ASHAMED
    options: [{ text: { en: "Show Feedback", zh: "显示反馈", de: "Feedback anzeigen" }, nextNode: "center_overdone_give_in_feedback" }]
  },

  center_overdone_give_in_feedback: {
    speaker: {
      en: "Learning Feedback",
      zh: "学习反馈",
      de: "Lernfeedback"
    },
    text: {
      en: "You showed respect by repeatedly offering to pay the bill, which is an important part of Chinese dining etiquette. However, continuing to insist after three polite exchanges can eventually become counterproductive.\n\nIn many Chinese social and business settings, the host is expected to insist on paying several times as part of a ritual of politeness. Once this ritual has been completed, it is generally appropriate to graciously accept the invitation. Persisting beyond this point may unintentionally communicate that you do not trust your host to fulfill their role, or that you doubt their ability to treat you. This can place unnecessary pressure on the host and make the situation uncomfortable.",
      zh: "你通过反复提出付账表现了尊重，这是中国餐饮礼仪的重要组成部分。然而，在三次礼貌的交流之后继续坚持最终可能会适得其反。\n\n在许多中国社交和商业环境中，主人被期望多次坚持付账，作为礼貌仪式的一部分。一旦这个仪式完成，通常适当地优雅地接受邀请。坚持超过这一点可能会无意中传达你不信任主人履行他们的角色，或者你怀疑他们招待你的能力。这会给主人带来不必要的压力，使情况变得不舒服。",
      de: "Sie zeigten Respekt, indem Sie wiederholt anboten, die Rechnung zu bezahlen, was ein wichtiger Teil der chinesischen Essensetikette ist. Wenn Sie jedoch nach drei höflichen Austauschen weiterhin darauf bestehen, kann dies schließlich kontraproduktiv werden.\n\nIn vielen chinesischen sozialen und geschäftlichen Umgebungen wird vom Gastgeber erwartet, dass er mehrmals darauf besteht, zu bezahlen, als Teil eines Rituals der Höflichkeit. Sobald dieses Ritual abgeschlossen ist, ist es im Allgemeinen angemessen, die Einladung dankbar anzunehmen. Darüber hinaus zu bestehen kann unbeabsichtigt kommunizieren, dass Sie Ihrem Gastgeber nicht vertrauen, seine Rolle zu erfüllen, oder dass Sie an seiner Fähigkeit zweifeln, Sie zu bewirten. Dies kann unnötigen Druck auf den Gastgeber ausüben und die Situation unangenehm machen."
    },
    options: [{ text: { en: "Replay Scenario", zh: "重播场景", de: "Szenario wiederholen" }, nextNode: "bill_trigger" }]
  },

  // Sub-Path: The 5th offer where you break the ritual and force payment
  center_round5_break: {
    speaker: {
      en: "You",
      zh: "你",
      de: "Sie"
    },
    text: {
      en: "No, I couldn't possibly.",
      zh: "不，我不能。",
      de: "Nein, ich könnte unmöglich."
    },
    options: [{ text: { en: "Continue", zh: "继续", de: "Weiter" }, nextNode: "center_round5_reaction" }]
  },

  center_round5_reaction: {
    speaker: {
      en: "Mrs. Zhang",
      zh: "张太太",
      de: "Frau Zhang"
    },
    text: {
      en: "...",
      zh: "...",
      de: "..."
      // en: "Mrs. Zhang stops smiling and she seems to be ashamed.",
      // zh: "张太太停止微笑，她似乎有些羞愧。",
      // de: "Frau Zhang hört auf zu lächeln und sie scheint beschämt zu sein."
    },
    expression: "ashamed", // EXPRESS ASHAMED
    options: [{ text: { en: "Continue", zh: "继续", de: "Weiter" }, nextNode: "center_round5_take_bill" }]
  },

  center_round5_take_bill: {
    speaker: {
      en: "Mrs. Zhang",
      zh: "张太太",
      de: "Frau Zhang"
    },
    text: {
      en: "Oh... ok, thank you for taking the bill.",
      zh: "哦……好的，谢谢你拿账单。",
      de: "Oh... okay, danke, dass Sie die Rechnung übernehmen."
    },
    expression: "neutral",
    options: [{ text: { en: "Continue", zh: "继续", de: "Weiter" }, nextNode: "center_round5_outcome" }]
  },

  center_round5_outcome: {
    speaker: {
      en: "Mrs. Zhang",
      zh: "张太太",
      de: "Frau Zhang"
    },
    text: {
      en: "...",
      zh: "...",
      de: "..."
      // en: "You pay. Mrs. Zhang doesn't smile but shows sign of frustration and anger.",
      // zh: "你付了账。张太太没有微笑，但表现出沮丧和愤怒的迹象。",
      // de: "Sie bezahlen. Frau Zhang lächelt nicht, zeigt aber Anzeichen von Frustration und Wut."
    },
    expression: "angry", // EXPRESS FRUSTRATION AND ANGER
    options: [{ text: { en: "Show Feedback", zh: "显示反馈", de: "Feedback anzeigen" }, nextNode: "center_round5_feedback" }]
  },

  center_round5_feedback: {
    speaker: {
      en: "Learning Feedback",
      zh: "学习反馈",
      de: "Lernfeedback"
    },
    text: {
      en: "You showed generosity by insisting on paying the bill. However, continuing to insist after the host has repeatedly offered to pay can become inappropriate.\n\nIn Chinese culture, offering to pay the bill several times is a ritual of politeness. Once the host continues to insist after several exchanges, it is generally expected that the guest will graciously accept the invitation. By insisting a fifth time and ultimately taking over the bill, you interrupted this social ritual.\n\nYour actions may unintentionally suggest that you do not trust your host to fulfill their role or that you believe they are unable to afford the invitation. This can cause the host to lose face and may leave them feeling embarrassed or frustrated, even if they remain polite on the surface.\n\nA more culturally appropriate response would have been to accept the invitation after the ritual exchange and thank your host sincerely. You can always reciprocate by inviting them the next time you meet.",
      zh: "你通过坚持付账表现了慷慨。然而，在主人反复提出付账之后继续坚持可能会变得不合适。\n\n在中国文化中，多次提出付账是一种礼貌的仪式。一旦主人在几次交流后继续坚持，通常期望客人优雅地接受邀请。通过第五次坚持并最终接管账单，你打断了这个社会仪式。\n\n你的行为可能会无意中暗示你不信任主人履行他们的角色，或者你认为他们无法承担邀请的费用。这可能会导致主人丢面子，即使他们在表面上保持礼貌，也可能会让他们感到尴尬或沮丧。\n\n更符合文化的回应应该是在仪式交流后接受邀请，并真诚地感谢你的主人。你可以在下次见面时邀请他们来回报。",
      de: "Sie zeigten Großzügigkeit, indem Sie darauf bestanden, die Rechnung zu bezahlen. Wenn Sie jedoch weiterhin darauf bestehen, nachdem der Gastgeber mehrmals angeboten hat, zu bezahlen, kann dies unangemessen werden.\n\nIn der chinesischen Kultur ist das mehrfache Angebot, die Rechnung zu bezahlen, ein Ritual der Höflichkeit. Sobald der Gastgeber nach mehreren Austauschen weiterhin darauf besteht, wird im Allgemeinen erwartet, dass der Gast die Einladung dankbar annimmt. Indem Sie ein fünftes Mal darauf bestanden und schließlich die Rechnung übernahmen, unterbrachen Sie dieses soziale Ritual.\n\nIhre Handlungen können unbeabsichtigt andeuten, dass Sie Ihrem Gastgeber nicht vertrauen, seine Rolle zu erfüllen, oder dass Sie glauben, dass er sich die Einladung nicht leisten kann. Dies kann dazu führen, dass der Gastgeber das Gesicht verliert und sich beschämt oder frustriert fühlt, auch wenn er höflich bleibt.\n\nEine kulturell angemessenere Reaktion wäre, die Einladung nach dem Ritualaustausch anzunehmen und Ihren Gastgeber aufrichtig zu danken. Sie können immer revanchieren, indem Sie sie beim nächsten Treffen einladen."
    },
    options: [{ text: { en: "Replay Scenario", zh: "重播场景", de: "Szenario wiederholen" }, nextNode: "bill_trigger" }]
  },

  // Right Branch
  // Option 3
  // --- ROUND 1 SUGGESTION to SPLIT THE BILL ---
  right_branch_start: {
    speaker: {
      en: "You",
      zh: "你",
      de: "Sie"
    },
    text: {
      en: "How about we split the bill?",
      zh: "我们平摊账单怎么样？",
      de: "Wie wäre es, wenn wir die Rechnung teilen?"
    },
    expression: "neutral",
    options: [
      { text: { en: "Continue", zh: "继续", de: "Weiter" }, nextNode: "right_round1_reaction" }
    ]
  },

  right_round1_reaction: {
    speaker: {
      en: "Mrs. Zhang",
      zh: "张太太",
      de: "Frau Zhang"
    },
    text: {
      en: "...",
      zh: "...",
      de: "..."
      // en: "Mrs. Zhang stops smiling and seems surprised.",
      // zh: "张太太停止微笑，似乎有些惊讶。",
      // de: "Frau Zhang hört auf zu lächeln und scheint überrascht zu sein."
    },
    expression: "surprised", // EXPRESS SURPRISED
    options: [
      { text: { en: "Continue", zh: "继续", de: "Weiter" }, nextNode: "right_round1_response" }
    ]
  },

  right_round1_response: {
    speaker: {
      en: "Mrs. Zhang",
      zh: "张太太",
      de: "Frau Zhang"
    },
    text: {
      en: "Oh... that's really not necessary.",
      zh: "哦……这真的没必要。",
      de: "Oh... das ist wirklich nicht nötig."
    },
    expression: "neutral",
    options: [
      { text: { en: "I'm sorry. I didn't mean to refuse your kindness. Thank you for inviting me.", zh: "对不起。我不是想拒绝你的好意。谢谢你邀请我。", de: "Es tut mir leid. Ich wollte Ihre Freundlichkeit nicht ablehnen. Danke für die Einladung." }, nextNode: "right_backtrack" },
      { text: { en: "No, I really think splitting is the fairest option", zh: "不，我真的认为平摊是最公平的选择", de: "Nein, ich denke wirklich, dass Teilen die fairste Option ist" }, nextNode: "right_persist_split" }
    ]
  },

  // Sub-Path: You backtrack and apologize immediately (Left column of flowchart)
  right_backtrack: {
    speaker: {
      en: "You",
      zh: "你",
      de: "Sie"
    },
    text: {
      en: "I'm sorry. I didn't mean to refuse your kindness. Thank you for inviting me.",
      zh: "对不起。我不是想拒绝你的好意。谢谢你邀请我。",
      de: "Es tut mir leid. Ich wollte Ihre Freundlichkeit nicht ablehnen. Danke für die Einladung."
    },
    expression: "neutral",
    options: [
      { text: { en: "Continue", zh: "继续", de: "Weiter" }, nextNode: "right_backtrack_reaction" }
    ]
  },

  right_backtrack_reaction: {
    speaker: {
     en: "Mrs. Zhang",
      zh: "张太太",
      de: "Frau Zhang"
    },
    text: {
      en: "Mrs. Zhang smiles again and pays the bill.",
      zh: "张太太再次微笑着付了账。",
      de: "Frau Zhang lächelt wieder und bezahlt die Rechnung."
    },
    expression: "smile_polite", // EXPRESS SMILE
    options: [
      { text: { en: "Continue", zh: "继续", de: "Weiter" }, nextNode: "right_backtrack_statement" }
    ]
  },

  right_backtrack_statement: {
    speaker: {
      en: "Mrs. Zhang",
      zh: "张太太",
      de: "Frau Zhang"
    },
    text: {
      en: "Please don't worry. I'm happy we could have dinner together.",
      zh: "请别担心。我很高兴我们能一起吃饭。",
      de: "Bitte machen Sie sich keine Sorgen. Ich freue mich, dass wir zusammen essen konnten."
    },
    expression: "smile_polite",
    options: [
      { text: { en: "Show Feedback", zh: "显示反馈", de: "Feedback anzeigen" }, nextNode: "right_backtrack_feedback" }
    ]
  },

  right_backtrack_feedback: {
    speaker: {
      en: "Learning Feedback",
      zh: "学习反馈",
      de: "Lernfeedback"
    },
    text: {
      en: "Although suggesting to split the bill may be considered polite and fair in many Western cultures, it can be interpreted quite differently in this situation.\n\nMrs. Zhang explicitly invited you to dinner and, as the host and senior colleague, has taken responsibility for paying the bill. In many Chinese social and professional settings, paying for the meal is more than a financial transaction—it is a symbolic act of hospitality, generosity, and respect. By inviting someone, the host demonstrates care for the relationship and fulfills an important social role.\n\nSuggesting to split the bill interrupts this expected interaction. Instead of accepting the host's gesture, it may unintentionally signal that you are declining her hospitality or questioning her role as the host. It can also imply that you feel uncomfortable accepting the invitation or that you wish to avoid the social obligation created by being treated.\n\nFortunately, you quickly recognized the situation and accepted Mrs. Zhang's invitation with gratitude. By expressing sincere appreciation, you restored the expected social interaction and allowed Mrs. Zhang to fulfill her role as the host.",
      zh: "虽然在许多西方文化中，提出平摊账单可能被认为是礼貌和公平的，但在这种情况下可能会有完全不同的解释。\n\n张太太明确邀请你共进晚餐，作为主人和高级同事，她承担了付账的责任。在许多中国社交和专业环境中，为餐费买单不仅仅是财务交易——它是好客、慷慨和尊重的象征性行为。通过邀请某人，主人展示了对关系的关心并履行了重要的社会角色。\n\n提出平摊账单打断了这种预期的互动。与其接受主人的姿态，这可能会无意中传达你在拒绝她的好客或质疑她作为主人的角色。这也可能暗示你对接受邀请感到不舒服，或者你希望避免被招待所产生的社会义务。\n\n幸运的是，你很快意识到了情况，并感激地接受了张太太的邀请。通过表达真诚的感激，你恢复了预期的社会互动，让张太太能够履行她作为主人的角色。",
      de: "Obwohl das Angebot, die Rechnung zu teilen, in vielen westlichen Kulturen als höflich und fair angesehen werden kann, kann es in dieser Situation ganz anders interpretiert werden.\n\nFrau Zhang hat Sie ausdrücklich zum Abendessen eingeladen und hat als Gastgeberin und senior Kollegin die Verantwortung für die Bezahlung der Rechnung übernommen. In vielen chinesischen sozialen und professionellen Umgebungen ist das Bezahlen für das Essen mehr als eine finanzielle Transaktion—it ist ein symbolischer Akt der Gastfreundschaft, Großzügigkeit und des Respekts. Durch das Einladen einer Person zeigt der Gastgeber Fürsorge für die Beziehung und erfüllt eine wichtige soziale Rolle.\n\nDas Angebot, die Rechnung zu teilen, unterbricht diese erwartete Interaktion. Anstatt die Geste des Gastgebers anzunehmen, kann dies unbeabsichtigt signalisieren, dass Sie ihre Gastfreundschaft ablehnen oder ihre Rolle als Gastgeberin in Frage stellen. Es kann auch implizieren, dass Sie sich unwohl fühlen, die Einladung anzunehmen, oder dass Sie die durch die Bewirtung entstandene soziale Verpflichtung vermeiden möchten.\n\nGlücklicherweise haben Sie die Situation schnell erkannt und Frau Zhangs Einladung mit Dankbarkeit angenommen. Durch das Ausdrücken aufrichtiger Wertschätzung haben Sie die erwartete soziale Interaktion wiederhergestellt und Frau Zhang ermöglicht, ihre Rolle als Gastgeberin zu erfüllen."
    },
    options: [
      { text: { en: "Replay Scenario", zh: "重播场景", de: "Szenario wiederholen" }, nextNode: "bill_trigger" }
    ]
  },

  // Sub-Path: You insist on splitting (Middle and right columns of flowchart)
  right_persist_split: {
    speaker: {
      en: "You",
      zh: "你",
      de: "Sie"
    },
    text: {
      en: "No, I really think splitting is the fairest option",
      zh: "不，我真的认为平摊是最公平的选择",
      de: "Nein, ich denke wirklich, dass Teilen die fairste Option ist"
    },
    expression: "neutral",
    options: [
      { text: { en: "Continue", zh: "继续", de: "Weiter" }, nextNode: "right_persist_reaction" }
    ]
  },

  right_persist_reaction: {
    speaker: {
     en: "Mrs. Zhang",
      zh: "张太太",
      de: "Frau Zhang"
    },
    text: {
      en: "...",
      zh: "...",
      de: "..."
      // en: "Mrs. Zhang is now slightly frustrated in addition.",
      // zh: "张太太现在有些沮丧。",
      // de: "Frau Zhang ist jetzt zusätzlich leicht frustriert."
    },
    expression: "angry", // EXPRESS SLIGHT FRUSTRATION
    options: [
      { text: { en: "Continue", zh: "继续", de: "Weiter" }, nextNode: "right_persist_response" }
    ]
  },

  right_persist_response: {
    speaker: {
      en: "Mrs. Zhang",
      zh: "张太太",
      de: "Frau Zhang"
    },
    text: {
      en: "I appreciate your kindness... but I would really prefer to invite you.",
      zh: "我很感激你的好意……但我真的更想邀请你。",
      de: "Ich schätze Ihre Freundlichkeit... aber ich würde Sie wirklich lieber einladen."
    },
    expression: "neutral",
    options: [
      { text: { en: "Alright, then I'll invite you next time.", zh: "好吧，那下次我邀请你。", de: "Gut, dann lade ich Sie beim nächsten Mal ein." }, nextNode: "right_mitigate_future" },
      { text: { en: "No, I insist. Let's split it.", zh: "不，我坚持。让我们平摊吧。", de: "Nein, ich bestehe darauf. Lassen Sie uns teilen." }, nextNode: "right_force_split" }
    ]
  },

  // Sub-Path alternative A: You relent and promise to invite her next time (Center column)
  right_mitigate_future: {
    speaker: {
      en: "You",
      zh: "你",
      de: "Sie"
    },
    text: {
      en: "Alright, then I'll invite you next time.",
      zh: "好吧，那下次我邀请你。",
      de: "Gut, dann lade ich Sie beim nächsten Mal ein."
    },
    expression: "neutral",
    options: [
      { text: { en: "Continue", zh: "继续", de: "Weiter" }, nextNode: "right_mitigate_reaction" }
    ]
  },

  right_mitigate_reaction: {
    speaker: {
     en: "Mrs. Zhang",
      zh: "张太太",
      de: "Frau Zhang"
    },
    text: {
      en: "...",
      zh: "...",
      de: "..."
      // en: "Mrs. Zhang slightly smiles again and pays the bill.",
      // zh: "张太太再次淡淡地微笑着付了账。",
      // de: "Frau Zhang lächelt wieder leicht und bezahlt die Rechnung."
    },
    expression: "smile_polite", // EXPRESS SLIGHT SMILE
    options: [
      { text: { en: "Show Feedback", zh: "显示反馈", de: "Feedback anzeigen" }, nextNode: "right_mitigate_feedback" }
    ]
  },

  right_mitigate_feedback: {
    speaker: {
      en: "Learning Feedback",
      zh: "学习反馈",
      de: "Lernfeedback"
    },
    text: {
      en: "Although suggesting to split the bill may be considered polite and fair in many Western cultures, it can be interpreted quite differently in this situation.\n\nMrs. Zhang explicitly invited you to dinner and, as the host and senior colleague, has taken responsibility for paying the bill. In many Chinese social and professional settings, paying for the meal is more than a financial transaction—it is a symbolic act of hospitality, generosity, and respect. By inviting someone, the host demonstrates care for the relationship and fulfills an important social role.\n\nSuggesting to split the bill interrupts this expected interaction. Instead of accepting the host's gesture, it may unintentionally signal that you are declining her hospitality or questioning her role as the host. It can also imply that you feel uncomfortable accepting the invitation or that you wish to avoid the social obligation created by being treated.\n\nYou successfully repaired the interaction by offering to invite Mrs. Zhang next time. In many Chinese social and business settings, reciprocity is not expected to occur immediately. Instead of balancing the cost of a single meal, relationships are often strengthened through repeated acts of generosity over time. By offering to host the next dinner, you acknowledged Mrs. Zhang's hospitality while expressing your willingness to return the favor in the future.",
      zh: "虽然在许多西方文化中，提出平摊账单可能被认为是礼貌和公平的，但在这种情况下可能会有完全不同的解释。\n\n张太太明确邀请你共进晚餐，作为主人和高级同事，她承担了付账的责任。在许多中国社交和专业环境中，为餐费买单不仅仅是财务交易——它是好客、慷慨和尊重的象征性行为。通过邀请某人，主人展示了对关系的关心并履行了重要的社会角色。\n\n提出平摊账单打断了这种预期的互动。与其接受主人的姿态，这可能会无意中传达你在拒绝她的好客或质疑她作为主人的角色。这也可能暗示你对接受邀请感到不舒服，或者你希望避免被招待所产生的社会义务。\n\n你通过提出下次邀请张太太成功地修复了互动。在许多中国社交和商业环境中，互惠并不被期望立即发生。与其平衡一顿饭的费用，关系通常通过随时间的反复慷慨行为来加强。通过提出主持下一顿晚餐，你承认了张太太的好客，同时也表达了你在未来回报这份好意的意愿。",
      de: "Obwohl das Angebot, die Rechnung zu teilen, in vielen westlichen Kulturen als höflich und fair angesehen werden kann, kann es in dieser Situation ganz anders interpretiert werden.\n\nFrau Zhang hat Sie ausdrücklich zum Abendessen eingeladen und hat als Gastgeberin und senior Kollegin die Verantwortung für die Bezahlung der Rechnung übernommen. In vielen chinesischen sozialen und professionellen Umgebungen ist das Bezahlen für das Essen mehr als eine finanzielle Transaktion—it ist ein symbolischer Akt der Gastfreundschaft, Großzügigkeit und des Respekts. Durch das Einladen einer Person zeigt der Gastgeber Fürsorge für die Beziehung und erfüllt eine wichtige soziale Rolle.\n\nDas Angebot, die Rechnung zu teilen, unterbricht diese erwartete Interaktion. Anstatt die Geste des Gastgebers anzunehmen, kann dies unbeabsichtigt signalisieren, dass Sie ihre Gastfreundschaft ablehnen oder ihre Rolle als Gastgeberin in Frage stellen. Es kann auch implizieren, dass Sie sich unwohl fühlen, die Einladung anzunehmen, oder dass Sie die durch die Bewirtung entstandene soziale Verpflichtung vermeiden möchten.\n\nSie haben die Interaktion erfolgreich repariert, indem Sie anboten, Frau Zhang beim nächsten Mal einzuladen. In vielen chinesischen sozialen und geschäftlichen Umgebungen wird nicht erwartet, dass Gegenseitigkeit sofort erfolgt. Anstatt die Kosten eines einzelnen Essens auszugleichen, werden Beziehungen oft durch wiederholte Großzügigkeit über die Zeit gestärkt. Durch das Angebot, das nächste Abendessen auszurichten, haben Sie Frau Zhangs Gastfreundschaft anerkannt und gleichzeitig Ihre Bereitschaft signalisiert, die Gunst in Zukunft zu erwidern."
    },
    options: [
      { text: { en: "Replay Scenario", zh: "重播场景", de: "Szenario wiederholen" }, nextNode: "bill_trigger" }
    ]
  },

  // Sub-Path alternative B: You force the split (Rightmost column)
  right_force_split: {
    speaker: {
      en: "You",
      zh: "你",
      de: "Sie"
    },
    text: {
      en: "No, I insist. Let's split it.",
      zh: "不，我坚持。让我们平摊吧。",
      de: "Nein, ich bestehe darauf. Lassen Sie uns teilen."
    },
    expression: "neutral",
    options: [
      { text: { en: "Continue", zh: "继续", de: "Weiter" }, nextNode: "right_force_split_outcome" }
    ]
  },

  right_force_split_outcome: {
    speaker: {
     en: "Mrs. Zhang",
      zh: "张太太",
      de: "Frau Zhang"
    },
    text: {
      en: "...",
      zh: "...",
      de: "..."
      // en: "Mrs. Zhang seems more frustrated and you split the bill.",
      // zh: "张太太似乎更沮丧了，你们平摊了账单。",
      // de: "Frau Zhang scheint frustrierter zu sein und Sie teilen die Rechnung."
    },
    expression: "angry", // EXPRESS FRUSTRATION
    options: [
      { text: { en: "Show Feedback", zh: "显示反馈", de: "Feedback anzeigen" }, nextNode: "right_force_split_feedback" }
    ]
  },

  right_force_split_feedback: {
    speaker: {
      en: "Learning Feedback",
      zh: "学习反馈",
      de: "Lernfeedback"
    },
    text: {
      en: "Although suggesting to split the bill may be considered polite and fair in many Western cultures, it can be interpreted quite differently in this situation.\n\nMrs. Zhang explicitly invited you to dinner and, as the host and senior colleague, has taken responsibility for paying the bill. In many Chinese social and professional settings, paying for the meal is more than a financial transaction—it is a symbolic act of hospitality, generosity, and respect. By inviting someone, the host demonstrates care for the relationship and fulfills an important social role.\n\nSuggesting to split the bill interrupts this expected interaction. Instead of accepting the host's gesture, it may unintentionally signal that you are declining her hospitality or questioning her role as the host. It can also imply that you feel uncomfortable accepting the invitation or that you wish to avoid the social obligation created by being treated.",
      zh: "虽然在许多西方文化中，提出平摊账单可能被认为是礼貌和公平的，但在这种情况下可能会有完全不同的解释。\n\n张太太明确邀请你共进晚餐，作为主人和高级同事，她承担了付账的责任。在许多中国社交和专业环境中，为餐费买单不仅仅是财务交易——它是好客、慷慨和尊重的象征性行为。通过邀请某人，主人展示了对关系的关心并履行了重要的社会角色。\n\n提出平摊账单打断了这种预期的互动。与其接受主人的姿态，这可能会无意中传达你在拒绝她的好客或质疑她作为主人的角色。这也可能暗示你对接受邀请感到不舒服，或者你希望避免被招待所产生的社会义务。",
      de: "Obwohl das Angebot, die Rechnung zu teilen, in vielen westlichen Kulturen als höflich und fair angesehen werden kann, kann es in dieser Situation ganz anders interpretiert werden.\n\nFrau Zhang hat Sie ausdrücklich zum Abendessen eingeladen und hat als Gastgeberin und senior Kollegin die Verantwortung für die Bezahlung der Rechnung übernommen. In vielen chinesischen sozialen und professionellen Umgebungen ist das Bezahlen für das Essen mehr als eine finanzielle Transaktion—it ist ein symbolischer Akt der Gastfreundschaft, Großzügigkeit und des Respekts. Durch das Einladen einer Person zeigt der Gastgeber Fürsorge für die Beziehung und erfüllt eine wichtige soziale Rolle.\n\nDas Angebot, die Rechnung zu teilen, unterbricht diese erwartete Interaktion. Anstatt die Geste des Gastgebers anzunehmen, kann dies unbeabsichtigt signalisieren, dass Sie ihre Gastfreundschaft ablehnen oder ihre Rolle als Gastgeberin in Frage stellen. Es kann auch implizieren, dass Sie sich unwohl fühlen, die Einladung anzunehmen, oder dass Sie die durch die Bewirtung entstandene soziale Verpflichtung vermeiden möchten."
    },
    options: [
      { text: { en: "Replay Scenario", zh: "重播场景", de: "Szenario wiederholen" }, nextNode: "bill_trigger" }
    ]
  }
};

export default dialogueTree;