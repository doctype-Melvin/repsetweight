const express = require("express");
const router = express.Router();
const usersController = require("../controllers/usersController");

// /api/users
router.get("/", (req, res) => {
  res.send("Users API");
});

router.post("/find", usersController.find_user);

router.get("/user/:id", usersController.get_user);

module.exports = router;
