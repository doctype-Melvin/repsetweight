const express = require("express");
const router = express.Router();

router.get("/", (req, res, next) => {
  res.send("API root");
});

module.exports = router;
