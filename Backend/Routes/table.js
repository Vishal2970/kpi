const express = require("express");
const router = express.Router();
const check = require("../Controller/check");

router.route("/check-db").get(check);

module.exports = router;
