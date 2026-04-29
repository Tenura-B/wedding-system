import { GoogleGenerativeAI } from "@google/generative-ai";
import dotenv from "dotenv";

dotenv.config();

const apiKey = process.env.GEMINI_API_KEY;
const genAI = new GoogleGenerativeAI(apiKey);

async function run() {
  try {
    const model = genAI.getGenerativeModel({ 
      model: "gemini-flash-latest",
    });

    const prompt = "Hi";
    const result = await model.generateContent(prompt);
    const response = await result.response;
    console.log("Success:", response.text());
  } catch (error) {
    console.error("Error:", error.message);
  }
}

run();
