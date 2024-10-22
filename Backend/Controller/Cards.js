const { sql } = require("../config/db");
const {getQueryFromXML,getCardDetails,} = require("../XML/parser/XMLCardParser");
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
  const id = req.query.id;
  // console.log(id)

  try {
    const request = new sql.Request();
    const cardDetail = await getCardDetails();
    const cardDetailResponse = {
      widgetItem: [],
      viewDetails: [],
      graphDetail: [],
    };

    for (const card of cardDetail) {
      if (card.id === id) {
        // widget details
        const widgetDetails = card.widgetDetails;
        const widgetItemArray = widgetDetails[0].widgetItem;

        for (const widgetItem of widgetItemArray) {
          const name = widgetItem.name;
          const caption = widgetItem.caption;
          const query = widgetItem.query;
          let widgetItemParameter = "";

          const parameter = widgetItem?.parameter;
          if (parameter) {
            parameter.forEach((param) => {
              for (const propertyName in param) {
                const params = param[propertyName][0];
                widgetItemParameter += params + ",";
              }
            });
          }
          const response = await request.query(query);
          const widgetItemResponse = {
            name: name,
            caption: caption,
            widgetItemParameter: widgetItemParameter.slice(
              0,
              widgetItemParameter.length - 1
            ),
            response: response.recordset.map((obj) => Object.values(obj)[0]), 
          };
          cardDetailResponse.widgetItem.push(widgetItemResponse);
        }

        // viewDetails
        const viewDetails = card.Viewdetail;
        for (const viewDetail of viewDetails) {
          const viewQuery = viewDetail.query;
          const viewName = viewDetail.name;
          let viewParameters = "";
          const viewParameter = viewDetail.parameter;
          viewParameter &&
            Object.keys(viewParameter).forEach((propertyName) => {
              const viewParamts = viewParameter[propertyName][0];
              viewParameters += viewParamts + ",";
            });

          const resp = {
            colname: [],
            value: [],
          };
          const viewResponse = await request.query(viewQuery);

          if (viewResponse.rowsAffected[0] === 0) {
            continue; 
          } else {
            const keys = Object.keys(viewResponse.recordset[0]); // Get keys if it's not null
          }
          //const keys = Object.keys(viewResponse.recordset[0]);
          keys?.forEach((key) => {
            resp.colname.push(key);
          });

          viewResponse.recordset.forEach((i, index) => {
            const values = Object.values(i);
            resp.value.push(values);
          });
          cardDetailResponse.viewDetails.push({
            name: viewName,
            viewResponse: resp,
            parameter: viewParameters.slice(0, viewParameters.length - 1),
          });
        }
        // Graph
        const graph = card.graphData;

        for (const graphItem of graph) {
          const graphName = graphItem.name;
          const graphDisplayName = graphItem.displayName;

          for (const dt of graphItem.widgetItem) {
            const graphQuery = dt.$.query;
            const name = dt.$.name;
            const caption = dt.$.caption;
            const graphResponse = await request.query(graphQuery);
            cardDetailResponse.graphDetail.push({
              name: graphName,
              displayName: graphDisplayName,
              graphResponse: graphResponse.recordset,
              caption: caption,
            });
          }
        }
      }
    }
    return res.status(200).send({ cardDetailResponse });
  } catch (err) {
    console.log(err);
    res.status(500).send({
      error: err.message,
    });
  }
};

module.exports = { Card, cardDetails };
