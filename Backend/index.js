require("dotenv").config();
const express = require("express");
const { connectToDatabase, sql } = require("./config/db");
const tablesRoutes = require("./Routes/tablesRoutes");
const cors = require("cors");

const app = express();


const corsOptions = {
  origin: "http://localhost:3000",
  method: "GET,POST,PUT,DELETE,PATCH,HEAD",
  credentials: true,
};
app.use(cors(corsOptions));
const port = process.env.PORT;
// vishal
// Connect to the database
connectToDatabase();

// API route to check the database connection
app.use("/api", tablesRoutes);

// Start the server
app.listen(port, () => {
  console.log(`Server is running on port ${port}`);
});
