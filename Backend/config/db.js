const sql = require("mssql");

const dbConfig = {
  user: 'erpbo'||process.env.DB_USER,
  password: 'erpbo'||process.env.DB_PASSWORD,
  server: '195.159.227.100'||process.env.DB_SERVER,
  database: 'YH_Optimize'||process.env.DB_DATABASE,
  port: 5555||parseInt(process.env.DB_PORT, 10),
  options: {
    encrypt: false,
    enableArithAbort: true,
    trustServerCertificate: true,
  },
  connectionString: `Server=${process.env.DB_SERVER},${process.env.DB_PORT};Database=${process.env.DB_DATABASE};User Id=${process.env.DB_USER};Password=${process.env.DB_PASSWORD};`,
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
