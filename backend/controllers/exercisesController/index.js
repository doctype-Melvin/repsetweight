const asyncHandler = require("express-async-handler");
const { models, sequelize } = require("../../database/dbConnect");

exports.get_exercises = asyncHandler(async (req, res, next) => {
  const allExercises = await models.Exercise.findAll();

  if (!allExercises) {
    res.status(404).json({ message: "No exercises found" });
  }
  res.status(200).json({ data: allExercises });
});

exports.get_exercise = asyncHandler(async (req, res, next) => {
  const exercise = await models.Exercise.findOne({
    where: { exercise_id: req.params.id },
  });

  if (!exercise) {
    res.status(404).json({ message: "Exercise not found" });
  }

  res.status(200).json({ data: exercise });
});

exports.add_exercise = asyncHandler(async (req, res, next) => {
  const { name, category, target, equipment } = req.body;

  const exercise = await models.Exercise.create({
    name,
    category,
    target,
    equipment,
  });

  if (!exercise) {
    res.status(500).json({ message: "Exercise could not be created" });
  }

  res.status(201).json({ data: exercise });
});
