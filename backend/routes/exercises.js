const express = require("express");
const router = express.Router();

const exercisesController = require("../controllers/exercisesController");

router.get("/all", exercisesController.get_exercises);

router.get("/:id", exercisesController.get_exercise);

router.post("/add", exercisesController.add_exercise);

module.exports = router;
