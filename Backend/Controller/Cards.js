const { sql } = require("../config/db");
const { getQueryFromXML, getCardDetails } = require("../XML/parser/XMLCardParser");
const fs = require("fs");

const Card = async (req, res) => {
  try {
    const widgetItems = await getQueryFromXML();

    const responses = await Promise.all(widgetItems.map(async (widgetItem) => {
      try {
        const queryResponse = await sql.query(widgetItem.query, widgetItem.parameters);
        const values = [];
        queryResponse.recordset.forEach(obj => {
          const value = Object.values(obj)[0];
          values.push(value);
        });
        // console.log(values); 
        
        return {
          widgetName: widgetItem.widgetName,
          parameters: widgetItem.parameters,
          response: values,
          id:widgetItem.id,
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

const cardDetails = async (req, res) => {
  try {
    // console.log("Hello card 2");
    const request = new sql.Request();
    const CardDetails=await getCardDetails();
    // console.log(CardDetails);
    
    const response = await request.query(root.query[4]);
    return res.status(200).send({ data: response });
  } catch (err) {
    res.status(500).send({
      error: err.message,
    });
  }
};

module.exports = {Card,cardDetails};
