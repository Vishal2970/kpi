const {sql}=require("../config/db")
const table0 = async (req, res) => {
  try {
    const request = new sql.Request(); // Ensure sql is imported
    const response = await request.query("select CopkchildId,CopkChildName,CoViewName from tadnreportchild where copkchildid='11.2'");
    // console.log(response);
    
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
const table1 = async (req, res) => {
  try {
    const request = new sql.Request(); // Ensure sql is imported
    const response = await request.query("select CopkchildId,CopkChildName,CoViewName from tadnreportchild where copkchildid='11.3'");
    // console.log(response);
    
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
const table2 = async (req, res) => {
  try {
    const request = new sql.Request(); // Ensure sql is imported
    const response = await request.query("select CopkchildId,CopkChildName,CoViewName from tadnreportchild where copkchildid='11.5'");
    // console.log(response);
    
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
const table3 = async (req, res) => {
  try {
    const request = new sql.Request(); // Ensure sql is imported
    const response = await request.query("select top 1 CopkchildId from tadnreportchild where copkchildid='11.5'");
    // console.log(response);
    
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
const table4 = async (req, res) => {
  try {
    const request = new sql.Request(); // Ensure sql is imported
    const response = await request.query("select top 1 CopkchildId from tadnreportchild where copkchildid='11.3'");
    // console.log(response);
    
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
const table5 = async (req, res) => {
  try {
    const request = new sql.Request(); // Ensure sql is imported
    const response = await request.query("select top 1 CopkchildId from tadnreportchild where copkchildid='11.2'");
    // console.log(response);
    
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
module.exports = {table0,table1,table2,table3,table4,table5};
