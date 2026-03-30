import { readJSONFile } from "../utils/fileHelper.js";

export const history = async (filePath) => {
  const json = await readJSONFile(filePath);
  const words = JSON.parse(json);

  console.log("HISTORY\n");
  words.forEach((word) => {
    console.log(`🇩🇪 ${word.german} — 🇷🇸 ${word.serbian}`);
    console.log(`📝 Primer korišćenja reči u rečenici: ${word.example}`);
    console.log("--------------------------------------------------------------");
  });
}