const express = require("express");
const { getAllData, getFilteredData} = require("../Controller/Tables");
const { Card, cardDetails } = require("../Controller/Cards");
const userAuth = require("../Middleware/userAuth");

const router = express.Router();

//for table add here
router.route("/check-table").get(userAuth,getAllData);
router.route("/check-filter").get(userAuth,getFilteredData);

// //for card add here
router.route("/check-card").get(userAuth,Card);
router.route("/check-cardDetails").get(userAuth,cardDetails);

module.exports = router;
