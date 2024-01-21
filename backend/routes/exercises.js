const express = require("express");
const router = express.Router();
const authCheck = require("../middleware");

const exercisesController = require("../controllers/exercisesController");

router.get("/all", authCheck, exercisesController.get_exercises);

router.get("/:id", authCheck, exercisesController.get_exercise);

router.post("/add", authCheck, exercisesController.add_exercise);

module.exports = router;
