const express = require("express");
const router = express.Router();
const passport = require("passport");

const exercisesController = require("../controllers/exercisesController");

router.get(
  "/all",
  //   passport.authenticate("local", { session: true }),
  exercisesController.get_exercises
);

module.exports = router;
