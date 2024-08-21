const {sql}=require("../config/db")
const auth = async (req, res) => {
  try {
    console.log("Hiit");
    
    const request = new sql.Request(); // Ensure sql is imported
    const response = await request.query("select top 10 * from tadnreportchild");
    res
      .status(200)
      .send({ message: "Database connection is successful", data: response });
  } catch (err) {
    res.status(500).send({
      message: "Failed to connect to the database",
      error: err.message,
    });
  }
};
module.exports = auth;
