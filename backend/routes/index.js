var express = require("express");
var router = express.Router();

/* GET home page. */
router.get("/", function (req, res, next) {
  res.json({ msg: "This is the / route" });
});

module.exports = router;
