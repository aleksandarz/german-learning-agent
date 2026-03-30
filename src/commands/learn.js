import { callGeminiAPIForLearning } from "../utils/gemini.js";
import { readJSONFile, writeJSONFile } from "../utils/fileHelper.js";

export const learn = async (filePath) => {
  const json = await readJSONFile(filePath);
  const parsedWords = JSON.parse(json);

  const learnedWords = parsedWords.map(word => word.german);
  const { germanWord, serbianTranslation, exampleUsage } = await callGeminiAPIForLearning(learnedWords);

  console.log(`🇩🇪 ${germanWord} — 🇷🇸 ${serbianTranslation}`);
  console.log(`📝 Primer reči u upotrebi: ${exampleUsage}`);

  const formattedDate = new Date().toISOString().split("T")[0];

  const data = {
    id: Date.now(),
    german: germanWord,
    serbian: serbianTranslation,
    example: exampleUsage,
    learnAt: formattedDate,
  }

  parsedWords.push(data);
  await writeJSONFile(filePath, parsedWords);
}