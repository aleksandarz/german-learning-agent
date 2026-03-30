import * as fs from "fs/promises";

export const readJSONFile = async (filePath) => {
  return await fs.readFile(filePath, "utf-8");
}

export const writeJSONFile = async (filePath, data) => {
  await fs.writeFile(filePath, JSON.stringify(data, null, 2), "utf-8");
}