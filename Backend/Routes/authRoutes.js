const express = require("express");
const {table0,table1,table2} = require("../Controller/auth");
const router = express.Router();

router.route("/check-table").get(table0);
router.route("/check-table1").get(table1);
router.route("/check-table2").get(table2);


module.exports = router;