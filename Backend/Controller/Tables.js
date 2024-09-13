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
          // console.log(widgetItem.parameters);
          // console.log("HERE");
          let query = widgetItem.query || "";
          let parameters = widgetItem.parameters || [];
          query = conditionModification(query, sharedCondition);
          // console.log(query);
          const queryResponse = await sql.query(query, parameters);
          return {
            widgetName: widgetItem?.widgetName || null,
            parameters: widgetItem?.parameters || null,
            response: queryResponse?.recordset || null,
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
    // console.log("shopfilter");

    // console.log(sharedOrder);
    // console.log(sharedOrder[1]);

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
          // console.log("Vishal");
          let condi="";
          if (sharedOrder.length > 2) {
            // console.log("If me ghusa");
            condi= sharedOrder[1] + " and " + sharedOrder[2];
          } else {
            // console.log("else me ghusa");
            condi = sharedOrder[1];
          }
          // console.log("else se Bahar");
          // console.log(condi);

          query = conditionModification(query, condi);
          // query=conditionModification(query,sharedOrder[2])
          // console.log(query);
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
