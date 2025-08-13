const express = require('express');



const app = express(); // Create an instance of an Express application

app.get('/', (req, res) => {
    res.send('Hello World!'); // Define a simple route
})

module.exports = app; // Export the app instance for use in other modules