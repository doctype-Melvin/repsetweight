const express = require("express");
const router = express.Router();

const workoutsController = require("../controllers/workoutsController");

router.get("/:id", workoutsController.get_workout_detail);

router.put("/edit/:id", workoutsController.edit_workout);

module.exports = router;
