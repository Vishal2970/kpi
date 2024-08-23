const { sql } = require("../config/db");

const card1 = async (req, res) => {
  try {
    const request = new sql.Request(); // Ensure sql is imported
    const response = await request.query(
      "select top 1 CopkchildId from tadnreportchild where copkchildid='11.5'"
    );
    res.status(200).send({ data: response });
  } catch (err) {
    res.status(500).send({
      error: err.message,
    });
  }
};
const card2 = async (req, res) => {
  try {
    const request = new sql.Request(); // Ensure sql is imported
    const response = await request.query(
      "select top 1 CopkchildId from tadnreportchild where copkchildid='11.3'"
    );
    res.status(200).send({ data: response });
  } catch (err) {
    res.status(500).send({
      error: err.message,
    });
  }
};
const card3 = async (req, res) => {
  try {
    const request = new sql.Request(); // Ensure sql is imported
    const response = await request.query(
      "select top 1 CopkchildId from tadnreportchild where copkchildid='11.2'"
    );
    res.status(200).send({ data: response });
  } catch (err) {
    res.status(500).send({
      error: err.message,
    });
  }
};
module.exports = { card1, card2, card3 };
