const sql = require("mssql");

const dbConfig = {
  user: process.env.DB_USER || 'erpbo',  // Default value to 'erpbo' if env variable is not set
  password: process.env.DB_PASSWORD || 'erpbo',
  server: process.env.DB_SERVER || '195.159.227.100',
  database: process.env.DB_DATABASE || 'YH_Optimize',
  port: parseInt(process.env.DB_PORT, 10) || 5555,
  options: {
    encrypt: false,
    enableArithAbort: true,
    trustServerCertificate: true,
  },
};

const connectToDatabase = async () => {
  try {
    await sql.connect(dbConfig);
    console.log("Connected to the SQL Server database");
  } catch (err) {
    console.error("Database connection failed: ", err);
  }
};

module.exports = { connectToDatabase, sql };
