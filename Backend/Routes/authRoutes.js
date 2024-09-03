const express = require("express");
const Login = require("../Controller/Authentication")

const router = express.Router();

router.route("/Auth").post(Login);

module.exports=router;