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
    const {id}=req.body
    const request = new sql.Request();
    const cardDetail=await getCardDetails();
    // const result=
    cardDetail.forEach((card)=>{
      
      if(card.id===id){

//create logic here for particular card



      }
    })
    return true

    // const response = await request.query(root.query[4]);
    // return res.status(200).send({ data: response });
  } catch (err) {
    res.status(500).send({
      error: err.message,
    });
  }
};

module.exports = {Card,cardDetails};
