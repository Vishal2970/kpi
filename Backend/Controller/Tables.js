// const { sql } = require("../config/db");
// const getQueryFromXML = require("../XMLParser");
// const {js2xml} = require('xml-js');
// const fs = require("fs");
// const { xml2js } = require("xml-js");

const { sql } = require("../config/db");
const getQueryFromXML = require("../XMLParser");
const fs = require("fs");

const table1 = async (req, res) => {
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

// const table1 = async (req, res) => {
//   try {
//     const xmlString = fs.readFileSync("./XML/Query.xml", "utf8");
//     const root = xml2js(xmlString, { compact: true, ignoreComment: true, spaces: 4 });

//     const xmlStringOutput = js2xml(root, { compact: true, ignoreComment: true, spaces: 4 });
//     res.type('xml');
//     res.send(xmlStringOutput);
//   } catch (err) {
//     res.status(500).send({
//       error: err.message,
//     });
//   }
// };




// const { sql } = require("../config/db");
// const fs = require("fs");
// const { xml2js } = require("xml-js");

// const table1 = async (req, res) => {
//   try {
//     const xmlString = fs.readFileSync("./XML/Query.xml", "utf8");
//     const root = xml2js(xmlString, { compact: true, ignoreComment: true, spaces: 4 });

//     const widgets = root.KPIs.KPI.widget;

//     const result = [];

//     widgets.forEach((widget) => {
//       const widgetName = widget._attributes.name;
//       const widgetItems = widget.widgetitem;

//       widgetItems.forEach((widgetItem) => {
//         const query = widgetItem._attributes.query;
//         const parameters = widgetItem.parameter;

//         const paramResult = {};

//         parameters.Shopno.forEach((param) => {
//           paramResult[param._text] = param._text;
//         });

//         result.push({
//           widgetName,
//           query,
//           parameters: paramResult,
//         });
//       });
//     });

//     res.send(result);
//   } catch (err) {
//     res.status(500).send({
//       error: err.message,
//     });
//   }
// };







// const table2 = async (req, res) => {
//   try {
//     console.log("Hello table 2");
//     const root = await getQueryFromXML();
//     const request = new sql.Request(); // Ensure sql is imported
//     const response = await request.query(root.query[1]);
//     res.status(200).send({ data: response });
//   } catch (err) {
//     res.status(500).send({
//       error: err.message,
//     });
//   }
// };
// const table3 = async (req, res) => {
//   try {
//     console.log("Hello table 3");
//     const root = await getQueryFromXML();
//     const request = new sql.Request(); // Ensure sql is imported
//     const response = await request.query(root.query[2]);
//     res.status(200).send({ data: response });
//   } catch (err) {
//     res.status(500).send({
//       error: err.message,
//     });
//   }
// };, table2, table3 
module.exports = { table1};
