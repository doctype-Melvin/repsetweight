const express = require("express");
const router = express.Router();

const templatesController = require("../controllers/templatesController");

router.get("/all", templatesController.get_templates);

router.get("/detail/:id", templatesController.get_template_detail);

router.get("/detail/:id/workouts", templatesController.get_workouts);

router.post("/add", templatesController.post_template);

module.exports = router;
