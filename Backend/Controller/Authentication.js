const { sql } = require("../config/db");
const jwt = require("jsonwebtoken")

const Login = async (req, res) => {
  const { CopkUserId, copassword } = req.body;
  //   console.log(CopkUserId);
  //   console.log(copassword);

  const query =
    "SELECT * FROM tauser WHERE CopkUserId = @CopkUserId AND copassword = @copassword";
  //   console.log(query);

  const pool = await sql.connect();
  const result = await pool
    .request()
    .input("CopkUserId", sql.Int, CopkUserId)
    .input("copassword", sql.Int, copassword)
    .query(query);
  //   console.log(result);

  if (result.recordset.length > 0) {
    const expiryDate = result.recordset[0].coExpdate.toLocaleDateString();
    const coshopno = result.recordset[0].CofkshopNo.replace(/#/g, ",").slice(1,-1);
    console.log(coshopno);
    if (expiryDate.includes("1900") || expiryDate > new Date()) {
      const token = jwt.sign(
        { coshopno, expiryDate },
        "process.env.SECRET_KEY", // Replace with your secret key
        { expiresIn: "1D" } // Token expires in 1 Day
      );
      res.status(200).json({ message: "Login Success", coshopno ,token});
    } else {
      res.status(410).json({ message: "Your account has expired" });
    }
  } else {
    res.status(401).json({ message: "Invalid username or password" });
  }
};

module.exports = Login;
