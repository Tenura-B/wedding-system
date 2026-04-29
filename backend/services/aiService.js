import { GoogleGenerativeAI } from "@google/generative-ai";
import dotenv from "dotenv";

dotenv.config();

const apiKey = process.env.GEMINI_API_KEY;
const genAI = apiKey ? new GoogleGenerativeAI(apiKey) : null;

export const getAIResponse = async (prompt, contextData) => {
  if (!genAI) {
    throw new Error("GEMINI_API_KEY is missing from .env file. Please add it to enable the AI assistant.");
  }
  try {
    const config = { 
      model: "gemini-1.5-flash",
      systemInstruction: {
        role: "system",
        parts: [{ text: `
          You are Aura, an elite AI Wedding Assistant for the "Tenura Wedding System". 
          Your tone is elegant, professional, and helpful. 
          You have access to the user's wedding data below.
          
          USER DATA:
          ${JSON.stringify(contextData, null, 2)}
          
          GUIDELINES:
          1. Always use the user's data to provide accurate answers.
          2. If you don't have enough information, ask the user instead of guessing.
          3. For budget questions, be precise.
          4. For invitation messages, match the template style if known.
          5. Keep responses concise but premium.
        `}]
      }
    };

    let model = genAI.getGenerativeModel(config);
    let result;

    try {
      result = await model.generateContent(prompt);
    } catch (error) {
      console.error("Primary AI Model Error:", error.message);
      if (error.status === 404 || error.message.includes('not found')) {
        console.log("Attempting fallback to gemini-flash-latest...");
        config.model = "gemini-flash-latest";
        model = genAI.getGenerativeModel(config);
        result = await model.generateContent(prompt);
      } else {
        throw error;
      }
    }

    const response = await result.response;
    return response.text();
  } catch (error) {
    console.error("AI Service Error:", error);
    throw new Error(error.message || "Failed to get response from AI assistant.");
  }
};
