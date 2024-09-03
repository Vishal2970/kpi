const express = require("express");
const userAuth = require("../Middleware/userAuth")
const Login = require("../Controller/Authentication")

const router = express.Router();

router.route("/Auth").post(Login);

router.route("/userAuth").get(userAuth, (req, res) => {
    res.status(200).send({ ok: true });
  });

module.exports=router;