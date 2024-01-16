const express = require("express");
const router = express.Router();
const usersController = require("../controllers/usersController");

router.get("/", (req, res) => {
  res.send("Users API");
});

router.post("/find", usersController.find_user);

module.exports = router;
