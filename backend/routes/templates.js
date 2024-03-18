const express = require("express");
const router = express.Router();
const authCheck = require("../middleware");

const templatesController = require("../controllers/templatesController");

router.get("/all", templatesController.get_templates);

router.get("/:id", templatesController.get_template_detail);

router.post("/add", templatesController.post_template);

module.exports = router;
