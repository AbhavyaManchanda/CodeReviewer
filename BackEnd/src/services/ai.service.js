require("dotenv").config();
const { GoogleGenerativeAI } = require("@google/generative-ai");

const genAI = new GoogleGenerativeAI(process.env.GOOGLE_GEMINI_KEY);

async function generate(prompt) {
   const model = genAI.getGenerativeModel({ model: "gemini-2.5-flash" });
   const result = await model.generateContent(prompt);
   return result.response.text();
}

// await generate();
module.exports = { generate };
