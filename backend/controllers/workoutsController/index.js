const asyncHandler = require("express-async-handler");
const { models } = require("../../database/dbConnect");

exports.get_workout_detail = asyncHandler(async (req, res, next) => {
  try {
    const data = await models.WorkoutExercise.findAll({
      include: [
        {
          model: models.Exercise,
          attributes: ["id", "name"],
        },
        {
          model: models.Workout,
          attributes: ["name"],
        },
      ],
      where: { workout_id: req.params.id },
    });
    if (!data) {
      res.status(404).json({ message: "No workout found" });
    }
    const dataJSON = data.map((workout) => workout.toJSON());

    res.status(200).json(dataJSON);
  } catch (error) {
    console.log(error.message);
  }
});

exports.edit_workout = asyncHandler(async (req, res, next) => {
  try {
    const data = await models.WorkoutExercise.update(
      {
        exercise_id: req.body.insertExercise,
      },
      {
        where: {
          workout_id: req.params.id,
          exercise_id: req.body.removeExercise,
        },
      }
    );

    if (!data) {
      res.status(404).json({ message: "Updating exercise in workout failed" });
    }

    res.status(200).json({ message: "Exercise updated" });
  } catch (error) {
    console.log(error.message);
  }
});
