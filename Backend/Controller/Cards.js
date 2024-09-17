const { sql } = require("../config/db");
const {
  getQueryFromXML,
  getCardDetails,
} = require("../XML/parser/XMLCardParser");
const fs = require("fs");

const Card = async (req, res) => {
  try {
    const widgetItems = await getQueryFromXML();

    const responses = await Promise.all(
      widgetItems.map(async (widgetItem) => {
        try {
          const queryResponse = await sql.query(
            widgetItem.query,
            widgetItem.parameters
          );
          const values = [];
          queryResponse.recordset.forEach((obj) => {
            const value = Object.values(obj)[0];
            values.push(value);
          });
          // console.log(values);

          return {
            widgetName: widgetItem.widgetName,
            parameters: widgetItem.parameters,
            response: values,
            id: widgetItem.id,
          };
        } catch (err) {
          console.error(err);
          return {
            widgetName: widgetItem.widgetName,
            parameters: widgetItem.parameters,
            error: err.message,
          };
        }
      })
    );

    res.send(responses);
  } catch (err) {
    res.status(500).send({
      error: err.message,
    });
  }
};

const cardDetails = async (req, res) => {
  try {
    const { id } = req.body;
    const request = new sql.Request();
    const cardDetail = await getCardDetails();
    // const result=
    cardDetail.forEach((card) => {
      // console.log(card);

      if (card.id === id) {
        // console.log(card);




        //widget details
        const widgetDetails = card.widgetDetails;
        const wigetDetailsName = widgetDetails[0].name;




        //widget item details
        const widgetItemArray = widgetDetails[0].widgetItem;
        widgetItemArray.forEach((widgetItem) => {
          const query = widgetItem.query;
          const name = widgetItem.name;

          const parameter = widgetItem?.parameter;
          if (parameter) {
            parameter.forEach((param) => {
              for (const propertyName in param) {
                const params = param[propertyName][0];
                // console.log(params);
              }
            });
          }
        });




        //viewDetails
        const viewDetails = card.Viewdetail;
        viewDetails?.forEach((viewDetail) => {
          const viewQuery = viewDetail.query;
          const viewName = viewDetail.name;

          const viewParameter = viewDetail.parameter;
          viewParameter &&
            Object.keys(viewParameter).forEach((propertyName) => {
              const viewParameters = viewParameter[propertyName][0];
              // console.log(viewParameters);
            });
        });





        //Graph
        const graph = card.graphData;

        graph.forEach((graphItem) => {
          const graphName = graphItem.name;
          const graphDisplayName = graphItem.displayName;

          graphItem.widgetItem.forEach((dt)=>{
            const query = dt.$.query;
            const name = dt.$.name;
            const caption=dt.$.caption
            console.log(name);
            console.log(query);
            console.log(caption);
          })
        })




      }
    });
    return true;

    // const response = await request.query(root.query[4]);
    // return res.status(200).send({ data: response });
  } catch (err) {
    res.status(500).send({
      error: err.message,
    });
  }
};
module.exports = { Card, cardDetails };
