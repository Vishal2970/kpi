const fs = require('fs');
const xml2js = require('xml2js');

const getQueryFromXML = async () => {
  try {
    //const filePath = 'C:\\Users\\trainings\\Desktop\\KPI React\\kpi\\Backend\\XML\\Query.xml';
    const filePath = './XML/Query.xml';
    const data = await fs.promises.readFile(filePath, 'utf8');
    const parser = new xml2js.Parser();
    const result = await parser.parseStringPromise(data);
    const root = result.root;
    return root;
  } catch (err) {
    console.error(err);
    throw err;
  }
};
module.exports=getQueryFromXML;