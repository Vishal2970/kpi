const fs = require('fs');
const xml2js = require('xml2js');

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
    const did=kpi.$.did;
    // console.log("DID:", did);

    const widgetItems = [];

    widgets.forEach((widget) => {
      // console.log("Widget:", widget);
      const widgetName = widget.$.name;
      const widgetItem = widget.widgetitem[0];
      const query = widgetItem.$.query;
      const parameters = widgetItem.parameter[0];
      const id= widgetItem.$.id;

      

      const widgetItemObject = {
        widgetName,
        query,
        parameters: parameters ? Object.keys(parameters).map(key => ({ [key]: parameters[key] })) : [],
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

const getCardDetails = async () => {
  return true;
};

module.exports = { getQueryFromXML, getCardDetails };