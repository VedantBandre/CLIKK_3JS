/**
 * GAME DIALOGUE TREE (Your Flowchart Structure)
 */

const dialogueTree = {
  start: {
    speaker: "Mrs. Zhang",
    text: "Welcome. We need to discuss the project timeline. I hope you have the results ready.",
    expression: "neutral", 
    options: [
      { text: "Yes, Mrs. Zhang. Here is the complete breakdown.", nextNode: "provide_results" },
      { text: "Uh, about that... we hit a couple of unexpected delays.", nextNode: "angry_confrontation" }
    ]
  },
  provide_results: {
    speaker: "Mrs. Zhang",
    text: "Impressive work. This is exactly what I was looking for. Let us move to the next phase.",
    expression: "surprised",
    options: [
      { text: "Thank you. Let's look at the deployment phase.", nextNode: "start" }
    ]
  },
  angry_confrontation: {
    speaker: "Mrs. Zhang",
    text: "Delays?! Again? We cannot afford another setback on this contract!",
    expression: "fearful",
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

export default dialogueTree;
