var express = require("express");
var router = express.Router();

const authController = require("../controllers/authController");

router.get("/signup", authController.form_get);
router.post("/signup", authController.form_post);

router.post("/login", authController.login_post);

module.exports = router;
