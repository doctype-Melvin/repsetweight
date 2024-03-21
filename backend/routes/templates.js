const express = require("express");
const router = express.Router();

const templatesController = require("../controllers/templatesController");

router.get("/all", templatesController.get_templates);

router.get("/detail/:id", templatesController.get_template_detail);

router.post("/add", templatesController.post_template);

router.get("/template-sessions/:id", templatesController.get_sessions);

module.exports = router;
