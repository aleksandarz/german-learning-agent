import { GoogleGenerativeAI } from "@google/generative-ai";
import dotenv from "dotenv";

dotenv.config();

const genAI = new GoogleGenerativeAI(process.env.GEMINI_API_KEY);

const model = genAI.getGenerativeModel({
  model: "gemini-2.5-flash",
});

const cleanJSONResponse = (text) => {
  return text
    .replace(/```json\s*/gi, "")
    .replace(/```/g, "")
    .trim();
};

export const callGeminiAPIForLearning = async (learnedWords = []) => {
  const prompt = `
    Generate exactly one RANDOM German word for learning.
    ${learnedWords.length > 0 ? `Do NOT use any of these words: ${learnedWords.join(", ")}` : ""}
    
    Return ONLY valid raw JSON.
    Do NOT use markdown.
    Do NOT wrap the response in code blocks.
    Do NOT add explanation text.
    
    Expected format:
    {
      "germanWord": "das Wasser",
      "serbianTranslation": "voda",
      "exampleUsage": "Ich trinke Wasser."
    }
  `;

  try {
    const result = await model.generateContent(prompt);
    const text = result.response.text();

    const cleanedText = cleanJSONResponse(text);
    const parsedData = JSON.parse(cleanedText);

    if (
      !parsedData.germanWord ||
      !parsedData.serbianTranslation ||
      !parsedData.exampleUsage
    ) {
      throw new Error("Invalid response shape from Gemini API");
    }

    return parsedData;
  } catch (error) {
    console.error("Gemini API error:", error.message);
    throw new Error("Failed to fetch German learning word");
  }
};

export const callGeminiAPIForSentence = async (userSentence) => {
  const prompt = `
    You are a German language teacher.
    A student wrote this German sentence: "${userSentence}"
    
    Note: The student may have used ae instead of ä, oe instead of ö, 
    ue instead of ü, ss instead of ß. Accept these as correct.
    Answer in Serbian always.
    
    Return ONLY valid JSON without markdown:
    {
      "correct": true,
      "correctedSentence": "Ich trinke Wasser.",
      "feedback": "Odlično napisana rečenica! Tvoja gramatika je tačna."
    }
  `;

  try {
    const result = await model.generateContent(prompt);
    const text = result.response.text();

    const cleanedText = cleanJSONResponse(text);
    const parsedData = JSON.parse(cleanedText);

    if (parsedData.correct === undefined || !parsedData.correctedSentence || !parsedData.feedback) {
      throw new Error("Invalid response shape from Gemini API");
    }

    return parsedData;
  } catch (error) {
    console.error("Gemini API error:", error.message);
    throw new Error("Failed to check sentence");
  }
}