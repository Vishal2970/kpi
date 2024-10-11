//function
const { sql } = require("../config/db");
const check_Login = "usp_reportaccess";
async function deletefromtable(CopkUserId) {
    const pool = await sql.connect();
    try {
      const request = pool
        .request()
        .input("flag", sql.Int, 2)
        .input("UserID", sql.Int, CopkUserId);
  
      const result = await request.execute(check_Login);
      // console.log(result);
    } catch (error) {
      console.error(error);
    }
  }
  async function insertintable(CopkUserId, mac) {
    const pool = await sql.connect();
    try {

      // console.log(CopkUserId);
      // console.log(name);
      // console.log(mac);
  
      const request = pool
        .request()
        .input("flag", sql.Int, 4)
        .input("UserID", sql.Int, CopkUserId)
        .input("UserName", sql.NVarChar, CopkUserId) // Changed to NVarChar for string type
        .input("CurrentMacAddress", sql.NVarChar, mac); // Changed to NVarChar for string type
  
      const result = await request.execute(check_Login);
      // console.log(result);
    } catch (error) {
      console.error(error);
    }
  }
  
  module.exports = {insertintable,deletefromtable};