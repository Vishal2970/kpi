const express = require("express");
const { sql } = require("../config/db");
const userAuth = require("../Middleware/userAuth");
const Login = require("../Controller/Authentication");

const router = express.Router();

router.route("/Auth").post(Login);

router.route("/userAuth").get(userAuth, (req, res) => {
  res.status(200).send({ ok: true });
});

router.route("/macAddressVerification").get(userAuth,async (req, res) => {
  try {
    const { userId } = req.query;
    // console.log(req);
    
    const pool = await sql.connect();
    const request = pool
      .request()
      .input("flag", sql.Int,3)
      .input("UserID", sql.Int, userId); 
    const result = await request.execute("usp_reportaccess"); 

    // console.log("result");
    // console.log(result);
    
    if (result.recordset.length > 0) {
      res.status(200).send({ ok: true ,macAddress:result.recordset[0]['']});
    } else {
      res.status(404).send({ ok: false, message: "No records found" });
    }
  } catch (error) {
    console.error(error); 
    res.status(500).send({ ok: false, message: "Error occurred" });
  }
});

module.exports = router;







  