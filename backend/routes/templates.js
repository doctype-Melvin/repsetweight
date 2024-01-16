const express = require("express");
const router = express.Router();

const templatesController = require("../controllers/templatesController");

router.get("/all", templatesController.get_templates);

module.exports = router;
