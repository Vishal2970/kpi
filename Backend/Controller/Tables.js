const { sql } = require("../config/db");
const getQueryFromXML = require("../XMLParser");
const fs = require("fs");

const table = async (req, res) => {
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
module.exports = {table};
