const asyncHandler = require("express-async-handler");
const { models, sequelize } = require("../../database/dbConnect");

exports.get_exercises = asyncHandler(async (req, res, next) => {
  const allExercises = await models.Exercise.findAll();
  const data = allExercises.map((exercise) => exercise.toJSON());
  if (!allExercises) {
    res.status(404).json({ message: "No exercises found" });
  }

  res.status(200).json(data);
});

exports.get_exercise = asyncHandler(async (req, res, next) => {
  const exercise = await models.Exercise.findOne({
    where: { exercise_id: req.params.id },
  });

  const toJson = exercise.toJSON();

  if (!exercise) {
    res.status(404).json({ message: "Exercise not found" });
  }

  res.status(200).json({ data: toJson });
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
