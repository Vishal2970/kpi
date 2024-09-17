const fs = require("fs");
const xml2js = require("xml2js");

const getQueryFromXML = async () => {
  try {
    const xmlString = fs.readFileSync("./XML/Card.xml", "utf8");
    const parser = new xml2js.Parser({ compact: true, ignoreComment: true });

    // console.log(xmlString);
    const result = await parser.parseStringPromise(xmlString);
    // console.log(result);

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
    const did = kpi.$.did;
    // console.log("DID:", did);

    const widgetItems = [];

    widgets.forEach((widget) => {
      // console.log("Widget:", widget);
      const widgetName = widget.$.name;
      const widgetItem = widget.widgetitem[0];
      const query = widgetItem.$.query;
      const parameters = widgetItem.parameter[0];
      const id = widgetItem.$.id;

      const widgetItemObject = {
        widgetName,
        query,
        parameters: parameters
          ? Object.keys(parameters).map((key) => ({ [key]: parameters[key] }))
          : [],
        id,
      };

      widgetItems.push(widgetItemObject);
    });

    // console.log("Final:", widgetItems);
    return widgetItems;
  } catch (err) {
    console.error(err);
  }
};

// const getCardDetails = async () => {
//   try {
//     const xmlString = fs.readFileSync("./XML/cardDetails.xml", "utf8");
//     const parser = new xml2js.Parser({ compact: true, ignoreComment: true });
//     console.log("XML STRING");

//     // console.log(xmlString);
//     const result = await parser.parseStringPromise(xmlString);
//     // console.log(result);

//     const root = result;
//     if (!root || !root.Widgets || !root.Widgets.KPI) {
//       throw new Error("Invalid XML structure");
//     }
//     const data = root.Widgets.KPI;
//     data.forEach((kpi) => {
//       // console.log(kpi.$.did);
//       //widget
//       kpi.widget.forEach((widgets) => {
//         // console.log(widgets.$.name);
//         widgets.widgetitem.forEach((widgetitem) => {
//           // console.log(widgetitem.$.name);
//           // console.log(widgetitem.$.query);
//         });
//       });

//       //Views   working
//       kpi.Viewdetail.forEach((views) => {
//         console.log(views.widgetitem[0].$.name);
//         console.log(views.widgetitem[0].$.query);
//         console.log(views.parameter);
//       });

//     });

//     const cardDetails = [];

//     return cardDetails;

//   } catch (err) {
//     console.error(err);
//   }
// };

const getCardDetails = async () => {
  try {
    const xmlString = fs.readFileSync("./XML/cardDetails.xml", "utf8");
    const parser = new xml2js.Parser({ compact: true, ignoreComment: true });

    const result = await parser.parseStringPromise(xmlString);
    const root = result;

    if (!root || !root.Widgets || !root.Widgets.KPI) {
      throw new Error("Invalid XML structure");
    }

    const cardDetails = [];
    const data = root.Widgets.KPI;

    if (data) {
      data.forEach((kpi) => {
        const cardData = {
          id: kpi.$.did,
          widgetDetails: [],
          Viewdetail: [],
        };

        if (kpi.widget) {
          kpi.widget.forEach((widget) => {
            const widgetDetails = {
              name: widget.$.name,
              widgetItem: [],
            };

            if (widget.widgetitem) {
              widget.widgetitem.forEach((widgetitem) => {
                const widgetItem = {
                  name: widgetitem.$.name,
                  query: widgetitem.$.query,
                  parameter: widgetitem.parameter,
                };
                // console.log(widgetItem.parameter);
                
                widgetDetails.widgetItem.push(widgetItem);
              });
            }

            cardData.widgetDetails.push(widgetDetails);
          });
        }

        if (kpi.Viewdetail) {
          kpi.Viewdetail.forEach((view) => {
           // console.log(view.widgetitem[0].parameter[0]);
            
            const viewDetails = {
              name: view.widgetitem[0].$.name,
              query: view.widgetitem[0].$.query,
              parameter: view.widgetitem[0].parameter[0],
            };
            cardData.Viewdetail.push(viewDetails);
          });
        }

        cardDetails.push(cardData);
      });
    } else {
      console.log("No KPI data found in XML");
    }

    // console.log(cardDetails);
    return cardDetails;
  } catch (err) {
    console.error(err);
  }
};
module.exports = { getQueryFromXML, getCardDetails };
