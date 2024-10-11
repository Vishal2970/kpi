require("dotenv").config();
const express = require("express");
const { connectToDatabase, sql } = require("./config/db");
const tablesRoutes = require("./Routes/tablesRoutes");
const authRoutes = require("./Routes/authRoutes")
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

app.use(express.json());

//routes
app.use("/api",authRoutes)
app.use("/api", tablesRoutes);




app.listen(port, () => {
  console.log(`Server is running on port ${port}`);
});
