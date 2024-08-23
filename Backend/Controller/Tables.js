const { sql } = require("../config/db");
const getQueryFromXML = require("../XMLParser");

const table1 = async (req, res) => {
  try {
    const root = await getQueryFromXML();
    console.log("Table 1 " + root.query[0]);

    const request = new sql.Request();
    const response = await request.query(root.query[0]);
    res.status(200).send({ data: response });
  } catch (err) {
    res.status(500).send({
      error: err.message,
    });
  }
};
const table2 = async (req, res) => {
  try {
    const root = await getQueryFromXML();
    const request = new sql.Request(); // Ensure sql is imported
    const response = await request.query(root.query[1]);
    res.status(200).send({ data: response });
  } catch (err) {
    res.status(500).send({
      error: err.message,
    });
  }
};
const table3 = async (req, res) => {
  try {
    const root = await getQueryFromXML();
    const request = new sql.Request(); // Ensure sql is imported
    const response = await request.query(root.query[2]);
    res.status(200).send({ data: response });
  } catch (err) {
    res.status(500).send({
      error: err.message,
    });
  }
};
module.exports = { table1, table2, table3 };
