const express = require("express");
const router = express.Router();
const passport = require("passport");

const exercisesController = require("../controllers/exercisesController");

router.get(
  "/all",
  (req, res, next) => {
    if (!req.isAuthenticated()) {
      return res.status(401).json({ message: "Unauthorized" });
    }
    next();
  },
  exercisesController.get_exercises
);

module.exports = router;
