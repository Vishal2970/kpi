const express = require("express");
const { getAllData, getFilteredData} = require("../Controller/Tables");
const { Card, cardDetails } = require("../Controller/Cards");

const router = express.Router();

//for table add here
router.route("/check-table").get(getAllData);
router.route("/check-filter").get(getFilteredData);

// //for card add here
router.route("/check-card").get(Card);
router.route("/check-cardDetails").get(cardDetails);

module.exports = router;
