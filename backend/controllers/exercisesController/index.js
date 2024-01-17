const asyncHandler = require("express-async-handler");
const { models, sequelize } = require("../../database/dbConnect");

exports.get_exercises = asyncHandler(async (req, res, next) => {
  const allExercises = await models.Exercise.findAll();

  if (!allExercises) {
    res.status(404).json({ message: "No exercises found" });
  }
  res.status(200).json({ data: allExercises });
});
