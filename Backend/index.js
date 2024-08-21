const express = require("express");
const dotenv = require("dotenv");
const { connectToDatabase, sql } = require("./config/db"); // Import sql here
const table = require("./Routes/table");
const authRoute = require("./Routes/authRoutes")

// Load environment variables from .env file
dotenv.config();

const app = express();
const port = process.env.PORT || 5000;
// vishal
// Connect to the database
connectToDatabase();

// API route to check the database connection
app.use("/api", table);
app.use("/api", authRoute);

// Start the server
app.listen(port, () => {
  console.log(`Server is running on port ${port}`);
});
