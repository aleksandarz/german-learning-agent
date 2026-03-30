import { readJSONFile } from "../utils/fileHelper.js";
import readline from "readline";

export const quiz = async (filePath) => {
  const rl = readline.createInterface({
    input: process.stdin,
    output: process.stdout,
  });

  const json = await readJSONFile(filePath);
  const parsedWords = JSON.parse(json);

  if (parsedWords.length < 1) {
    console.log("Još uvek niste naucili nijednu reč! Pokreni: node index.js learn da bi naučio nove reči.");
    return;
  }

  const randomWord = parsedWords[Math.floor(Math.random() * parsedWords.length)];
  rl.question(
    `Koje je značenje reči ${randomWord.german}? `,
    (answer) => {
      if (
        answer.trim().toLowerCase() ===
        randomWord.serbian.toLowerCase()
      ) {
        console.log("Tačno! 🔥");
      } else {
        console.log(
          `Netačno. Tačan odgovor je: ${randomWord.serbian}`
        );
      }

      rl.close();
    }
  );
}