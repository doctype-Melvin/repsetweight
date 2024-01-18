const express = require("express");
const router = express.Router();
const usersController = require("../controllers/usersController");
const authCheck = require("../middleware");

router.get("/", (req, res) => {
  res.send("Users API");
});

router.post("/find", authCheck, usersController.find_user);

module.exports = router;
