const aiService= require('../services/ai.service'); // Import the AI service


module.exports = async (req, res) => {
    
    const code = req.body.code; // Get the prompt from query parameters
    
    if (!code) {
        return res.status(400).send("code is required"); // Return error if prompt is not provided
    }

    try {
        const response = await aiService.generate(code);
        const cleanResponse = response.trim();
        res.send({ response: cleanResponse });

    } catch (error) {
        console.error("Error generating AI response:", error);
        res.status(500).send("Error generating AI response");
    }
};