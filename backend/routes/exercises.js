const express = require("express");
const router = express.Router();
const passport = require("passport");
const { authCheck } = require("../middleware");

const exercisesController = require("../controllers/exercisesController");

router.get("/all", authCheck, exercisesController.get_exercises);

module.exports = router;
