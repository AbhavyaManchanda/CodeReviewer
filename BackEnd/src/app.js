const express = require('express');
const aiRoutes = require('./services/ai.routes'); // Import AI routes



const app = express(); // Create an instance of an Express application

app.get('/', (req, res) => {
    res.send('Hello World!'); // Define a simple route
})

app.use('/ai', aiRoutes); // Use AI routes under the '/ai' path

module.exports = app; // Export the app instance for use in other modules