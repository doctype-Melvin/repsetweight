const asyncHandler = require("express-async-handler");
const { models, sequelize } = require("../../database/dbConnect");

exports.get_muscleGroups = asyncHandler(async (req, res, next) => {
  try {
    const data = await models.MuscleGroup.findAll();

    if (!data) {
      res.status(404).json({ message: "No muscle groups found" });
    }
    res.status(200).json(data);
  } catch (error) {
    console.log(error.message);
    res.status(500).json({ message: "Error fetching muscle groups" });
  }
});

exports.get_exercise_and_muscle = asyncHandler(async (req, res, next) => {
  try {
    const data = await models.ExerciseMuscle.findAll();

    if (!data) {
      res.status(404).json({ message: "No exercises found" });
    }
    res.status(200).json(data);
  } catch (error) {
    console.error(error.message);
    res.status(500).json({ message: "Error fetching exercises" });
  }
});
