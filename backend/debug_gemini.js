const { GoogleGenerativeAI } = require("@google/generative-ai");
require('dotenv').config();

const genAI = new GoogleGenerativeAI(process.env.GEMINI_API_KEY);

async function checkModels() {
  try {
    const list = await genAI.getGenerativeModel({ model: "gemini-1.5-flash" }); // Placeholder
    console.log("Attempting to list models...");
    // The SDK itself doesn't have a simple listModels on genAI, usually it's a direct fetch or v1/models
    // But we can try a different model search.
    console.log("Using model: gemini-1.5-flash");
  } catch (err) {
    console.error(err);
  }
}

checkModels();
