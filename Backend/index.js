const express = require("express");
const dotenv = require("dotenv");
const { connectToDatabase } = require("./config/db");

// Load environment variables from .env file
dotenv.config();

const app = express();
const port = process.env.PORT || 3000;

// Connect to the database
connectToDatabase()

// API route to check the database connection
app.get("/api/check-db", async (req, res) => {
  try {
    const request = new sql.Request();
    await request.query("SELECT 1 AS isConnected");
    res.status(200).send({ message: "Database connection is successful" });
  } catch (err) {
    res.status(500).send({ message: "Failed to connect to the database", error: err.message });
  }
});

// Start the server
app.listen(port, () => {
  console.log(`Server is running on port ${port}`);
});