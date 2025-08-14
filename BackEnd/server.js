const app = require('./src/app'); // Import the Express app instance
const dotenv = require('dotenv');
dotenv.config(); // Load environment variables from .env file

app.listen(3000, () => {
    console.log('Server is running on port 3000'); 
})