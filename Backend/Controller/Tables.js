const { sql } = require("../config/db");
const getQueryFromXML = require("../XML/parser/XMLTableParser");
const fs = require("fs");

const conditionModification = (query, condition) => {
  // console.log("Condition called");
  // console.log(condition);
  // console.log(query);

  const arrOfCondition = condition.toLowerCase().split(" and ");
  let conditionModified = " where ";
  let params = []; // define the params array

  arrOfCondition.forEach((cond) => {
    let [key, value] = cond.split("=");
    value = value.trim().replace(/'/g, ""); // remove whitespace and quotes

    // Skip appending conditions with empty values
    if (value === "") {
      // console.log(`Skipping condition: ${key} = ''`);
      return;
    }

    // Append IS NULL for specific conditions, else append with the value
    if (key === "coshopno" && value === "") {
      // console.log(`Appending condition: ${key} IS NULL`);
      conditionModified += ` ${key} IS NULL and `;
    } else if (key === "coshopno") {
      conditionModified += ` ${key} in (${value}) and `;
    } else {
      // console.log(`Appending condition: ${key} = ?`);
      conditionModified += ` ${key} = '${value}' and `;
      params.push(value); // add the value to the params array
    }
  });

  // Remove the last " and " from conditionModified
  conditionModified = conditionModified.slice(0, -5);

  // Split the query into parts
  const queryParts = query.split("order by");
  const queryBeforeOrderBy = queryParts[0];
  const orderByClause = queryParts[1];

  // Find the index of "from" in the query
  const fromIndex = queryBeforeOrderBy.indexOf("from");

  // Replace the original where condition with the modified one
  query =
    queryBeforeOrderBy.substring(0, fromIndex) +
    queryBeforeOrderBy.substring(fromIndex).split("where")[0] +
    conditionModified +
    " order by " +
    orderByClause;

  // console.log(query);
  // console.log("END");

  return query; // Return the modified query
};

const table = async (req, res) => {
  try {
    const widgetItems = await getQueryFromXML();
    const widgetName = req.query.widgetName || null;
    const sharedCondition = req.query.sharedCondition || null;
    const sharedOrder = req.query.sharedOrder || null;

    // console.log(widgetName);
    // console.log(sharedCondition);
    // console.log(sharedOrder);

    const filteredWidgetItems = widgetItems.filter((widgetItem) => {
      return widgetName ? widgetItem.widgetName === widgetName : true;
    });

    const responses = await Promise.all(
      filteredWidgetItems.map(async (widgetItem) => {
        try {
          let query = widgetItem.query || ""; // Ensure query is a string
          let parameters = widgetItem.parameters || []; // Ensure parameters is an array

          if (sharedCondition) {
            const modifiedQuery = conditionModification(query, sharedCondition);
            console.log(modifiedQuery);

            query = modifiedQuery; // Use modified query
          }

          if (sharedOrder) {
            if (query.toUpperCase().includes("ORDER BY")) {
              query = query.toUpperCase().includes("ASC")
                ? query.replace(/ASC/i, sharedOrder)
                : query.replace(/DESC/i, sharedOrder);
            }
          }

          // Safeguard against undefined parameters before SQL execution
          if (!Array.isArray(parameters) || parameters.length === 0) {
            parameters = []; // Default to an empty array if undefined
          }
          console.log(parameters);
          
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

module.exports = { table };
