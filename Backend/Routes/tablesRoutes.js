const express = require("express");
const { table} = require("../Controller/Tables");
// const { card1, card2, card3 } = require("../Controller/Cards");

const router = express.Router();

//for table add here
router.route("/check-table").get(table);
// router.route("/check-table2").get(table2);
// router.route("/check-table3").get(table3);, table2, table3


// //for card add here
// router.route("/check-card1").get(card1);
// router.route("/check-card2").get(card2);
// router.route("/check-card3").get(card3);

module.exports = router;
