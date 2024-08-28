const { sql } = require("../config/db");
const getQueryFromXML = require("../XML/parser/XMLCardParser");
const fs = require("fs");

const Card = async (req, res) => {
  try {
    const widgetItems = await getQueryFromXML();

    const responses = await Promise.all(widgetItems.map(async (widgetItem) => {
      try {
        const queryResponse = await sql.query(widgetItem.query, widgetItem.parameters);
        return {
          widgetName: widgetItem.widgetName,
          parameters: widgetItem.parameters,
          response: queryResponse.recordset,
        };
      } catch (err) {
        console.error(err);
        return {
          widgetName: widgetItem.widgetName,
          parameters: widgetItem.parameters,
          error: err.message,
        };
      }
    }));

    res.send(responses);
  } catch (err) {
    res.status(500).send({
      error: err.message,
    });
  }
};
// const card2 = async (req, res) => {
//   try {
//     console.log("Hello card 2");
//     const request = new sql.Request(); // Ensure sql is imported
//     const root=await getQueryFromXML()
//     const response = await request.query(root.query[4]);
//     res.status(200).send({ data: response });
//   } catch (err) {
//     res.status(500).send({
//       error: err.message,
//     });
//   }
// };
// const card3 = async (req, res) => {
//   try {
//     console.log("Hello card 3");
//     const request = new sql.Request(); // Ensure sql is imported
//     const root=await getQueryFromXML()
//     const response = await request.query(root.query[5]);
//     res.status(200).send({ data: response });
//   } catch (err) {
//     res.status(500).send({
//       error: err.message,
//     });
//   }
// };
module.exports = {Card};
