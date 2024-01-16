const express = require("express");
const router = express.Router();

const authController = require("../controllers/authController");

router.get("/", authController.get_db);
router.get("/login", authController.get_login);

module.exports = router;
