const express = require("express");
const auth = require("../Controller/auth");
const router = express.Router();

router.route("/check-table").get(auth);

module.exports = router;