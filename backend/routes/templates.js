const express = require("express");
const router = express.Router();

const templatesController = require("../controllers/templatesController");

router.get("/all", templatesController.get_templates);

router.get("/detail/:id", templatesController.get_template_detail);

router.post("/add", templatesController.post_template);

router.get("/detail/:id/workouts", templatesController.get_workouts);

module.exports = router;
