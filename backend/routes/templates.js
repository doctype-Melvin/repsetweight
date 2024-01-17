const express = require("express");
const router = express.Router();
const authCheck = require("../middleware");

const templatesController = require("../controllers/templatesController");

router.get("/all", authCheck, templatesController.get_templates);

router.get("/:id", authCheck, templatesController.get_template_detail);

module.exports = router;
