const { sql } = require("../config/db");
const getQueryFromXML = require("../XML/parser/XMLTableParser");
const fs = require("fs");

// const table = async (req, res) => {
//   try {
//     const widgetItems = await getQueryFromXML();

//     const responses = await Promise.all(widgetItems.map(async (widgetItem) => {
//       try {
//         const queryResponse = await sql.query(widgetItem.query, widgetItem.parameters);
//         return {
//           widgetName: widgetItem.widgetName,
//           parameters: widgetItem.parameters,
//           response: queryResponse.recordset,
//         };
//       } catch (err) {
//         console.error(err);
//         return {
//           widgetName: widgetItem.widgetName,
//           parameters: widgetItem.parameters,
//           error: err.message,
//         };
//       }
//     }));

//     res.send(responses);
//   } catch (err) {
//     res.status(500).send({
//       error: err.message,
//     });
//   }
// };


const table = async (req, res) => {
  try {
    const widgetItems = await getQueryFromXML();
    const widgetName = req.query.widgetName; // assuming the widgetName is passed as a query parameter
    const sharedCondition = req.query.sharedCondition[0]; // assuming the sharedCondition is passed as a query parameter
    const sharedOrder = req.query.sharedOrder;

    console.log(sharedCondition);

    // console.log(widgetName);

    // Filter the widgetItems array based on the widgetName parameter
    const filteredWidgetItems = widgetItems.filter((widgetItem) => {
      if (widgetName) {
        return widgetItem.widgetName === widgetName;
      }
      return true; // if no widgetName is provided, return all widgetItems
    });

    const responses = await Promise.all(
      filteredWidgetItems.map(async (widgetItem) => {
        try {
          let query = widgetItem.query;
          let parameters = widgetItem.parameters;
          // console.log(query);

          if (sharedCondition) {
            // append the shared condition to the query
            if (query.includes("WHERE")||query.includes("Where")||query.includes("where")) {
              query += ` AND ${sharedCondition}`;
            } else {
              // query += {sharedCondition};
            }
          }
          // console.log(sharedOrder);
          
          if (sharedOrder) {
            if (query.toUpperCase().includes("ORDER BY")) {
              query = query.toUpperCase().includes("ASC")?query.toUpperCase().replace("ASC",sharedOrder):query.toUpperCase().replace("DESC",sharedOrder)

            }
          }
          // console.log("final query " + query);

          const queryResponse = await sql.query(query, parameters);
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
      })
    );

    res.send(responses);
  } catch (err) {
    res.status(500).send({
      error: err.message,
    });
  }
};

module.exports = { table };
