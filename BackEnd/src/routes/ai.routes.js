const express = require('express');
const aiController = require('../controller/ai.controller'); // Import the AI controller

const router = express.Router(); // Create a new router instance

router.post('/getReview',aiController); // Define a route for getting AI responses




module.exports = router; // Export the router for use in other modules