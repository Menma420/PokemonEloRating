// const express = require('express');
// const cors = require('cors');
// const connectDB = require('./db'); // Import the MongoDB connection function
// require('dotenv').config(); // Load environment variables

// const app = express();

// // Middleware
// app.use(cors());
// app.use(express.json());

// // Connect to MongoDB
// connectDB();

// // Import routes
// const pokemonRouter = require('./Routes/Pokemon'); // Adjust path if needed
// app.use('/', pokemonRouter);

// // Start server
// const PORT = process.env.PORT || 4000;
// app.listen(PORT, () => {
//     console.log(`Server is running on port ${PORT}`);
// });

const express = require('express');
const cors = require('cors');
const ConnectDB = require('./config/db'); // Import the MongoDB connection function
require('dotenv').config(); // Load environment variables

const app = express();

// Middleware
app.use(cors());
app.use(express.json());

// Connect to MongoDB
ConnectDB();

// Import routes
const pokemonRouter = require('./Routes/Pokemon'); // Adjust path if needed
app.use('/', pokemonRouter);

// Start server
const PORT = process.env.PORT || 4000;
app.listen(PORT, () => {
    console.log(`Server is running on port ${PORT}`);
});
