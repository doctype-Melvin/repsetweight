var express = require("express");
var router = express.Router();

const testController = require("../controllers/testController");

/* GET home page. */
router.get("/", testController.index);

module.exports = router;
