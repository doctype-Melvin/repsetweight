const express = require("express");
const router = express.Router();

// This route handles muscle groups queries
// and the exercise_muscles schema

const muscleGroupsController = require("../controllers/muscleGroupsController");

router.get("/all", muscleGroupsController.get_muscleGroups);

router.get(
  "/exercise_and_muscle",
  muscleGroupsController.get_exercise_and_muscle
);

module.exports = router;
