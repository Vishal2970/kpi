const { sql } = require("../config/db");
const getQueryFromXML = require("../XML/parser/XMLTableParser");
const fs = require("fs");

const table = async (req, res) => {
  try {
    const widgetItems = await getQueryFromXML();
    const widgetName = req.query.widgetName?req.query.widgetName:null; // assuming the widgetName is passed as a query parameter
    const sharedCondition = req.query.sharedCondition?req.query.sharedCondition:null; // assuming the sharedCondition is passed as a query parameter
    const sharedOrder = req.query.sharedOrder?req.query.sharedOrder:null;

    console.log(req.query);
    

    console.log("widgetName "+widgetName);
    console.log("sharedCondition "+sharedCondition);
    console.log("sharedOrder "+sharedOrder);

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
            if (query.includes("WHERE") || query.includes("Where") || query.includes("where")) {
              if (!query.toUpperCase().includes("ORDER BY")) {
                query += ` AND ${sharedCondition}`;
              } else {
                const orderByIndex = query.toUpperCase().indexOf("ORDER BY");
                query = `${query.substring(0, orderByIndex)} AND ${sharedCondition} ${query.substring(orderByIndex)}`;
              }
            } else {
              if (!query.toUpperCase().includes("ORDER BY")) {
                query += ` WHERE ${sharedCondition}`;
              } else {
                const orderByIndex = query.toUpperCase().indexOf("ORDER BY");
                query = `${query.substring(0, orderByIndex)} AND ${sharedCondition} ${query.substring(orderByIndex)}`;
              }
            }
          }
          
          // console.log(sharedOrder);

          if (sharedOrder) {
            if (query.toUpperCase().includes("ORDER BY")) {
              query = query.toUpperCase().includes("ASC")
                ? query.toUpperCase().replace("ASC", sharedOrder)
                : query.toUpperCase().replace("DESC", sharedOrder);
            }
          }
          console.log("final query " + query);

          const queryResponse = await sql.query(query, parameters);
          return {
            widgetName: widgetItem.widgetName,
            parameters: widgetItem.parameters,
            response: queryResponse.recordset,
          };
        } catch (err) {
          // console.error(err);
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

// const { sql } = require("../config/db");
// const getQueryFromXML = require("../XML/parser/XMLTableParser");
// const fs = require("fs");

// const table = async (req, res) => {
//   try {
//     console.log("hits");

//     const widgetItems = await getQueryFromXML();
//     const widgetName = req.query.widgetName; // assuming the widgetName is passed as a query parameter
//     const sharedCondition = req.query.sharedCondition; // assuming the sharedCondition is passed as a query parameter
//     const sharedOrder = req.query.sharedOrder;

//     console.log(sharedCondition);

//     // console.log(widgetName);

//     // Filter the widgetItems array based on the widgetName parameter
//     const filteredWidgetItems = widgetItems.filter((widgetItem) => {
//       if (widgetName) {
//         return widgetItem.widgetName === widgetName;
//       }
//       return true; // if no widgetName is provided, return all widgetItems
//     });

//     const responses = await Promise.all(
//       filteredWidgetItems.map(async (widgetItem) => {
//         try {
//           let query = widgetItem.query;
//           let parameters = widgetItem.parameters;
//           // console.log(query);

//           if (sharedCondition) {
//             // append the shared condition to the query
//             const conditionClauses = Object.keys(sharedCondition).map((key) => {
//               let value = sharedCondition[key];
//               // console.log(value);

//               if (value === null||value === "") {
//                 value = "";
//               }
//               return `${key} = '${value}'`;
//             });
//             const conditionString = conditionClauses.join(" AND ");

//             // console.log(conditionString);

//             if (query.includes("WHERE") || query.includes("Where") || query.includes("where")) {
//               query += ` AND ${conditionString}`;
//             } else {
//               query += ` WHERE ${conditionString}`;
//             }
//             parameters = { ...parameters, ...sharedCondition };
//           }

//           if (sharedOrder) {
//             const orderByClause = `ORDER BY ${sharedOrder}`;
//             if (query.toUpperCase().includes("ORDER BY")) {
//               query = query.replace(/ORDER BY.*$/, orderByClause);
//             } else {
//               query += ` ${orderByClause}`;
//             }
//           }
//           // console.log(parameters);

//           const queryResponse = await sql.query(query, parameters);
//           return {
//             widgetName: widgetItem.widgetName,
//             parameters: widgetItem.parameters,
//             response: queryResponse.recordset,
//           };
//         } catch (err) {
//           // console.error(err);
//           return {
//             widgetName: widgetItem.widgetName,
//             parameters: widgetItem.parameters,
//             error: err.message,
//           };
//         }
//       })
//     );

//     res.send(responses);
//   } catch (err) {
//     res.status(500).send({
//       error: err.message,
//     });
//   }
// };

// module.exports = { table };
