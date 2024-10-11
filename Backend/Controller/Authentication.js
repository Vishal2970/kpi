const { sql } = require("../config/db");
const macaddress = require("macaddress");
const jwt = require("jsonwebtoken");
const { deletefromtable, insertintable } = require("./Functions");
const query =
  "SELECT * FROM tauser WHERE CopkUserId = @CopkUserId AND copassword = @copassword";
const check_Login = "usp_reportaccess";
let result = null;
let checked = null;
let alreadyLogined = null;
let macAddress = null;
macaddress.one((err, mac) => {
  if (err) {
    console.error(err);
    return;
  }

  macAddress = mac;
});

// async function deletefromtable(CopkUserId) {
//   const pool = await sql.connect();
//   try {
//     const request = pool
//       .request()
//       .input("flag", sql.Int, 2)
//       .input("UserID", sql.Int, CopkUserId);

//     const result = await request.execute(check_Login);
//     // console.log(result);
//   } catch (error) {
//     console.error(error);
//   }
// }
// async function insertintable(CopkUserId, mac) {
//   const pool = await sql.connect();
//   try {
//     // console.log("inserting");
//     const name = "Vishal test";
//     // console.log(CopkUserId);
//     // console.log(name);
//     // console.log(mac);

//     const request = pool
//       .request()
//       .input("flag", sql.Int, 4)
//       .input("UserID", sql.Int, CopkUserId)
//       .input("UserName", sql.NVarChar, name) // Changed to NVarChar for string type
//       .input("CurrentMacAddress", sql.NVarChar, mac); // Changed to NVarChar for string type

//     const result = await request.execute(check_Login);
//     // console.log(result);
//   } catch (error) {
//     console.error(error);
//   }
// }

const getAllShop = async () => {
  try {
    const response = await sql.query("select CopkShopNo from tashop");
    let dt = "";
    response.recordset.forEach((data) => {
      dt += data.CopkShopNo + ",";
    });
    // console.log(dt.substring(0, dt.length-1));

    return dt.substring(0, dt.length - 1).toString();
  } catch (error) {
    console.log(error);
  }
};

const Login = async (req, res) => {
  const { CopkUserId, copassword } = req.body;
  const pool = await sql.connect();

  try {
    // console.log(check_Login);
    const request = pool
      .request()
      .input("flag", sql.Int, 1)
      .input("UserID", sql.Int, CopkUserId);

    checked = await request.execute(check_Login);
    alreadyLogined = checked.rowsAffected[0];
    // console.log(checked.rowsAffected[0]);
  } catch (error) {
    console.log(checked);
  }

  if (alreadyLogined != 1) {
    result = await pool
      .request()
      .input("CopkUserId", sql.Int, CopkUserId)
      .input("copassword", sql.Int, copassword)
      .query(query);
  } else {
    deletefromtable(CopkUserId);
    result = await pool
      .request()
      .input("CopkUserId", sql.Int, CopkUserId)
      .input("copassword", sql.Int, copassword)
      .query(query);
  }

  // console.log(result);
  try {
    if (result.recordset.length > 0) {
      insertintable(CopkUserId, macAddress);
      const expiryDate = result.recordset[0].coExpdate.toLocaleDateString();
      const coshopno =
        result.recordset[0].CofkshopNo.replace(/#/g, ",").slice(1, -1) ||
        (await getAllShop());
      // console.log(coshopno);
      if (expiryDate.includes("1900") || expiryDate > new Date()) {
        const token = jwt.sign(
          { CopkUserId, copassword, expiryDate },
          process.env.SECRET_KEY,
          { expiresIn: "1D" }
        );
        res.status(200).json({ message: "Login Success", coshopno, token,CopkUserId,macAddress });
      } else {
        res.status(410).json({ message: "Your account has expired" });
      }
    } else {
      res.status(400).json({ message: "Invalid username or password" });
    }
  } catch (error) {}
};

module.exports = Login;
