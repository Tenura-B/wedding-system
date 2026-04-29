import axios from "axios";
import dotenv from "dotenv";

dotenv.config();

const apiKey = process.env.GEMINI_API_KEY;

async function run() {
  try {
    const url = `https://generativelanguage.googleapis.com/v1beta/models?key=${apiKey}`;
    const response = await axios.get(url);
    console.log("Models found:", response.data.models.map(m => m.name));
  } catch (error) {
    console.error("Error listing models:", error.response?.data || error.message);
  }
}

run();
