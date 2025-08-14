const aiService= require('../services/ai.service'); // Import the AI service


module.exports = async(req, res) => {
  const prompt = req.query.prompt; // Get the prompt from query parameters
  if (!prompt) {
    return res.status(400).send("Prompt is required"); // Return error if prompt is not provided
    }
    try {
        const response = await aiService.generate(prompt);
        const cleanResponse = response.replace(/\n+/g,' ').trim();
        res.json({ response: cleanResponse });
    } catch (error) {
        console.error("Error generating AI response:", error);
        res.status(500).send("Error generating AI response");
    }
};