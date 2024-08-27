const { sql } = require("../config/db");
const getQueryFromXML = require("../XMLParser");

const card1 = async (req, res) => {
  try {
    console.log("Hello card 1");
    const request = new sql.Request(); // Ensure sql is imported
    const root=await getQueryFromXML()
    const response = await request.query(root.query[3]);
    res.status(200).send({ data: response });
  } catch (err) {
    res.status(500).send({
      error: err.message,
    });
  }
};
const card2 = async (req, res) => {
  try {
    console.log("Hello card 2");
    const request = new sql.Request(); // Ensure sql is imported
    const root=await getQueryFromXML()
    const response = await request.query(root.query[4]);
    res.status(200).send({ data: response });
  } catch (err) {
    res.status(500).send({
      error: err.message,
    });
  }
};
const card3 = async (req, res) => {
  try {
    console.log("Hello card 3");
    const request = new sql.Request(); // Ensure sql is imported
    const root=await getQueryFromXML()
    const response = await request.query(root.query[5]);
    res.status(200).send({ data: response });
  } catch (err) {
    res.status(500).send({
      error: err.message,
    });
  }
};
module.exports = { card1, card2, card3 };
