// const fs = require('fs');
// const xml2js = require('xml2js');

// const getQueryFromXML = async () => {
//   try {
//     //const filePath = 'C:\\Users\\trainings\\Desktop\\KPI React\\kpi\\Backend\\XML\\Query.xml';
//     const filePath = './XML/Query.xml';
//     const data = await fs.promises.readFile(filePath, 'utf8');
//     const parser = new xml2js.Parser();
//     const result = await parser.parseStringPromise(data);
//     const root = result.root;
//     return root;
//   } catch (err) {
//     console.error(err);
//     throw err;
//   }
// };


// const getQueryFromXML = async () => {
//   const xmlString = fs.readFileSync("./XML/Query.xml", "utf8");
//   const root = js2xml.parse("root", xmljs.xml2js(xmlString, { compact: true, ignoreComment: true }));
//   const widgetItems = root.KPIs.KPI.widget.widgetitem || [];
//   return { widgetItems };
// };


const fs = require('fs');
const xml2js = require('xml2js');

// const getQueryFromXML = () => {
//   return new Promise((resolve, reject) => {
//     const xmlString = fs.readFileSync("./XML/Query.xml", "utf8");
//     const parser = new xml2js.Parser({ compact: true, ignoreComment: true });

//     parser.parseString(xmlString, (err, result) => {
//       if (err) {
//         reject(err);
//         return;
//       }

//       const root = result;
//       if (!root || !root.KPIs || !root.KPIs.KPI) {
//         reject(new Error("Invalid XML structure"));
//         return;
//       }

//       const widgets = root.KPIs.KPI;
//       const widgetItems = [];
//       console.log("1");
      
//       widgets.forEach((widget) => {
//         console.log("print");
        


//           const widgetName = widget.$.name;
//           //printXML(widgetName);
//           //console.log("print widgetName        "+widgetName);
//           const query = widget.$.query;
//           printXML(widget);
//           //console.log("print query "+query);
//           const parameters = widget.parameter;
//           //console.log("print parameters "+parameters);

//           const widgetItemObject = {
//             widgetName,
//             query,
//             parameters: parameters ? Object.keys(parameters).map(key => ({ [key]: parameters[key] })) : [],
//           };

//           widgetItems.push(widgetItemObject);
//         // printXML(widget);

//         function printXML(obj) {
//           Object.keys(obj).forEach((key) => {
//             console.log(obj[0]+" "+key);
            
//             if (typeof obj[key] === 'object') {
//               printXML(obj[key]);
//             } else {
//               console.log(obj[key]);
//             }
//           });
//         }
//         // printXML(widget);
//         // widget.forEach((widgetItem) => {
//         //   console.log("Enter  "+widgetItem);
          
//         //   const widgetName = widget.$.name;
//         //   const query = widgetItem.$.query;
//         //   const parameters = widgetItem.parameter;

//         //   const widgetItemObject = {
//         //     widgetName,
//         //     query,
//         //     parameters: parameters ? Object.keys(parameters).map(key => ({ [key]: parameters[key] })) : [],
//         //   };

//         //   widgetItems.push(widgetItemObject);
//         // });
//       });

//       console.log("Final    "+widgetItems);

//       resolve(widgetItems);
//     });
//   });
// };



const getQueryFromXML = async () => {
  try {
    const xmlString = fs.readFileSync("./XML/Table.xml", "utf8");
    const parser = new xml2js.Parser({ compact: true, ignoreComment: true });

    const result = await parser.parseStringPromise(xmlString);

    const root = result;
    if (!root || !root.KPIs || !root.KPIs.KPI) {
      throw new Error("Invalid XML structure");
    }

    const kpi = root.KPIs.KPI[0]; // Access the first element of the kpi array
    // console.log("KPI:", kpi);

    if (!kpi.widget) {
      console.log("No widgets found in KPI");
      return [];
    }

    const widgets = kpi.widget;
    // console.log("Widgets:", widgets);

    const widgetItems = [];

    widgets.forEach((widget) => {
      // console.log("Widget:", widget);
      const widgetName = widget.$.name;
      const widgetItem = widget.widgetitem[0];
      const query = widgetItem.$.query;
      const parameters = widgetItem.parameter[0];

      // console.log(`Widget Name: ${widgetName}`);
      // console.log(`Query: ${query}`);
      // console.log(`Parameters: ${JSON.stringify(parameters)}`);

      const widgetItemObject = {
        widgetName,
        query,
        parameters: parameters ? Object.keys(parameters).map(key => ({ [key]: parameters[key] })) : [],
      };

      widgetItems.push(widgetItemObject);
    });

    // console.log("Final:", widgetItems);
    return widgetItems;
  } catch (err) {
    console.error(err);
  }
};


module.exports = getQueryFromXML;