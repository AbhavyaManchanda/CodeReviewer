const express = require('express');
const aiRoutes = require('./services/ai.routes'); // Import AI routes
const cors = require('cors'); // Import CORS middleware



const app = express(); // Create an instance of an Express application

app.use(cors()); // Enable CORS for all routes

app.use(express.json()); // Middleware to parse JSON bodies
app.use(express.urlencoded({ extended: true })); // Middleware to parse URL-encoded bodies


app.get('/', (req, res) => {
    res.send('Hello World!'); // Define a simple route
})



app.use('/ai', aiRoutes); // Use AI routes under the '/ai' path

module.exports = app; // Export the app instance for use in other modules