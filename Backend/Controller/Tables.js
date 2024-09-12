// const { sql } = require("../config/db");
// const getQueryFromXML = require("../XML/parser/XMLTableParser");
// const fs = require("fs");

// const conditionModification = (query, condition) => {
//   // console.log("Condition called");
//   // console.log(condition);
//   // console.log(query);

//   const arrOfCondition = condition.toLowerCase().split(" and ");
//   let conditionModified = " where ";
//   let params = []; // define the params array

//   arrOfCondition.forEach((cond) => {
//     let [key, value] = cond.split("=");
//     value = value.trim().replace(/'/g, ""); // remove whitespace and quotes

//     // Skip appending conditions with empty values
//     if (value === "") {
//       // console.log(`Skipping condition: ${key} = ''`);
//       return;
//     }

//     // Append IS NULL for specific conditions, else append with the value
//     if (key === "coshopno" && value === "") {
//       // console.log(`Appending condition: ${key} IS NULL`);
//       conditionModified += ` ${key} IS NULL and `;
//     } else if (key === "coshopno") {
//       conditionModified += ` ${key} in (${value}) and `;
//     } else {
//       // console.log(`Appending condition: ${key} = ?`);
//       conditionModified += ` ${key} = '${value}' and `;
//       params.push(value); // add the value to the params array
//     }
//   });

//   // Remove the last " and " from conditionModified
//   conditionModified = conditionModified.slice(0, -5);

//   // Split the query into parts
//   let queryParts = query.split("order by");
//   let queryBeforeOrderBy = queryParts[0];
//   let orderByClause = queryParts[1] ? queryParts[1] : "";

//   // Check for other clauses
//   let groupByClause = "";
//   let havingClause = "";
//   if (queryBeforeOrderBy.includes("group by")) {
//     queryParts = queryBeforeOrderBy.split("group by");
//     queryBeforeOrderBy = queryParts[0];
//     groupByClause = queryParts[1];
//   }

//   if (groupByClause.includes("having")) {
//     queryParts = groupByClause.split("having");
//     groupByClause = queryParts[0];
//     havingClause = queryParts[1];
//   }

//   // Find the index of "from" in the query
//   const fromIndex = queryBeforeOrderBy.indexOf("from");

//   // Replace the original where condition with the modified one
//   let modifiedQuery = queryBeforeOrderBy.substring(0, fromIndex) +
//     queryBeforeOrderBy.substring(fromIndex).split("where")[0] +
//     conditionModified;

//   // Append other clauses
//   if (groupByClause) {
//     modifiedQuery += " group by " + groupByClause;
//   }

//   if (havingClause) {
//     modifiedQuery += " having " + havingClause;
//   }

//   // Append order by clause
//   modifiedQuery += " order by " + orderByClause;

//   // console.log(modifiedQuery);
//   // console.log("END");

//   return modifiedQuery; // Return the modified query
// };

// const table = async (req, res) => {
//   try {
//     const widgetItems = await getQueryFromXML();
//     const widgetName = req.query.widgetName || null;
//     const sharedCondition = req.query.sharedCondition || null;
//     const sharedOrder = req.query.sharedOrder || null;

//     // console.log(widgetName);
//     // console.log(sharedCondition);
//     // console.log(sharedOrder);

//     const filteredWidgetItems = widgetItems.filter((widgetItem) => {
//       return widgetName ? widgetItem.widgetName === widgetName : true;
//     });

//     const responses = await Promise.all(
//       filteredWidgetItems.map(async (widgetItem) => {
//         try {
//           let query = widgetItem.query || ""; // Ensure query is a string
//           let parameters = widgetItem.parameters || []; // Ensure parameters is an array

//           if (sharedCondition) {
//             const modifiedQuery = conditionModification(query, sharedCondition);
//             console.log(modifiedQuery);

//             query = modifiedQuery; // Use modified query
//           }

//           if (sharedOrder) {
//             if (query.toUpperCase().includes("ORDER BY")) {
//               query = query.toUpperCase().includes("ASC")
//                 ? query.replace(/ASC/i, sharedOrder)
//                 : query.replace(/DESC/i, sharedOrder);
//             }
//           }

//           // Safeguard against undefined parameters before SQL execution
//           if (!Array.isArray(parameters) || parameters.length === 0) {
//             parameters = []; // Default to an empty array if undefined
//           }
//           console.log(parameters);
          
//           const queryResponse = await sql.query(query, parameters);

//           return {
//             widgetName: widgetItem.widgetName,
//             parameters: widgetItem.parameters,
//             response: queryResponse.recordset,
//           };
//         } catch (err) {
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


const { sql } = require("../config/db");
const getQueryFromXML = require("../XML/parser/XMLTableParser");

// Function to modify query based on conditions
const conditionModification = (query, condition) => {
  const arrOfCondition = condition.toLowerCase().split(" and ");
  let conditionModified = " where ";
  let params = [];

  arrOfCondition.forEach((cond) => {
    let [key, value] = cond.split("=");
    value = value.trim().replace(/'/g, "");

    if (value === "") {
      return;
    }

    if (key === "coshopno" && value === "") {
      conditionModified += ` ${key} IS NULL and `;
    } else if (key === "coshopno") {
      conditionModified += ` ${key} in (${value}) and `;
    } else {
      conditionModified += ` ${key} = '${value}' and `;
      params.push(value);
    }
  });

  conditionModified = conditionModified.slice(0, -5);

  let queryParts = query.split("order by");
  let queryBeforeOrderBy = queryParts[0];
  let orderByClause = queryParts[1] ? queryParts[1] : "";

  let groupByClause = "";
  let havingClause = "";
  if (queryBeforeOrderBy.includes("group by")) {
    queryParts = queryBeforeOrderBy.split("group by");
    queryBeforeOrderBy = queryParts[0];
    groupByClause = queryParts[1];
  }

  if (groupByClause.includes("having")) {
    queryParts = groupByClause.split("having");
    groupByClause = queryParts[0];
    havingClause = queryParts[1];
  }

  const fromIndex = queryBeforeOrderBy.indexOf("from");

  let modifiedQuery =
    queryBeforeOrderBy.substring(0, fromIndex) +
    queryBeforeOrderBy.substring(fromIndex).split("where")[0] +
    conditionModified;

  if (groupByClause) {
    modifiedQuery += " group by " + groupByClause;
  }

  if (havingClause) {
    modifiedQuery += " having " + havingClause;
  }

  modifiedQuery += " order by " + orderByClause;

  return modifiedQuery;
};

// Endpoint 1: Fetch all data without filters
const getAllData = async (req, res) => {
  try {
    const sharedCondition = req.query.sharedCondition || null;
    const widgetItems = await getQueryFromXML();
    const responses = await Promise.all(
      widgetItems.map(async (widgetItem) => {
        try {
          let query = widgetItem.query || "";
          let parameters = widgetItem.parameters || [];
          query=conditionModification(query,sharedCondition);
          console.log(query);
          const queryResponse = await sql.query(query, parameters);
          return {
            widgetName: widgetItem?.widgetName||null,
            parameters: widgetItem?.parameters||null,
            response: queryResponse?.recordset||null,
          };
        } catch (err) {
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

// Endpoint 2: Fetch filtered data based on filters
const getFilteredData = async (req, res) => {
  try {
    const widgetItems = await getQueryFromXML();
    const widgetName = req.query.widgetName || null;
    const sharedCondition = req.query.sharedCondition || null;
    const sharedOrder = req.query.sharedOrder || null;
    // Filter items based on widgetName if provided
    console.log(sharedOrder[2]);
    
    const filteredWidgetItems = widgetItems.filter((widgetItem) => {
      if (widgetName && widgetItem.widgetName === widgetName) {
        return true;
      }
      return !widgetName;
    });

    const responses = await Promise.all(
      filteredWidgetItems.map(async (widgetItem) => {
        try {
          let query = widgetItem.query || "";
          let parameters = widgetItem.parameters || [];

          // Apply sharedCondition if provided
          if (sharedCondition) {
            query = conditionModification(query, sharedCondition);
          }

          // Apply sharedOrder if provided
          if (sharedOrder) {
            if (query.toUpperCase().includes("ORDER BY")) {
              query = query.toUpperCase().includes("ASC")
                ? query.replace(/ASC/i, sharedOrder[0])
                : query.replace(/DESC/i, sharedOrder[0]);
            }
          }

          if (!Array.isArray(parameters) || parameters.length === 0) {
            parameters = [];
          }
          const condi=sharedOrder[1]+" and "+sharedOrder[2];
          query=conditionModification(query,condi)
          // query=conditionModification(query,sharedOrder[2])
          console.log(query);
          // console.log(parameters);
          const queryResponse = await sql.query(query, parameters);

          return {
            widgetName: widgetItem.widgetName,
            parameters: widgetItem.parameters,
            response: queryResponse.recordset,
          };
        } catch (err) {
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

module.exports = { getAllData, getFilteredData };