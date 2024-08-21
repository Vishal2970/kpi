const {sql}=require("../config/db")
const check = async (req, res) => {
  try {
    const request = new sql.Request(); // Ensure sql is imported
    await request.query("SELECT 1 AS isConnected");
    res.status(200).send({ message: "Database connection is successful" });
  } catch (err) {
    res.status(500).send({
      message: "Failed to connect to the database",
      error: err.message,
    });
  }
};
module.exports = check;
