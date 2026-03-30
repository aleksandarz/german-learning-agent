import { callGeminiAPIForSentence } from "../utils/gemini.js";
import readline from "readline";

export const sentence = async () => {
  const rl = readline.createInterface({
    input: process.stdin,
    output: process.stdout,
    terminal: false
  });

  const userSentence = await new Promise((resolve) => {
    rl.question("✏️  Napiši rečenicu na nemačkom: ", (input) => {
      resolve(input);
      rl.close();
    });
  });

  const result = await callGeminiAPIForSentence(userSentence);

  if (result.correct) {
    console.log("✅ Tačno!");
  } else {
    console.log("❌ Netačno.");
    console.log(`📝 Ispravljena rečenica: ${result.correctedSentence}`);
  }
  console.log(`💬 Feedback: ${result.feedback}`);
}