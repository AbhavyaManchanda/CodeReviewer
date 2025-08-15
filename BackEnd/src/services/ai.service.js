require("dotenv").config();
const { GoogleGenerativeAI } = require("@google/generative-ai");

const genAI = new GoogleGenerativeAI(process.env.GOOGLE_GEMINI_KEY);

async function generate(prompt) {
   const model = genAI.getGenerativeModel({
      model: "gemini-2.5-flash",
      systemInstruction: "You are a helpful assistant that provides concise and accurate responses. you are a code reviewer, you will review the code and provide feedback on the code quality, performance, and security. You will also provide suggestions for improvement. You will also provide a summary of the code and will try to make the code more readable and understandable and efficient."
      


   });
   const result = await model.generateContent(prompt);
   return result.response.text();
}

// await generate();
module.exports = { generate };
