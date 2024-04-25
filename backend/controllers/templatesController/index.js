const asyncHandler = require("express-async-handler");
const { models } = require("../../database/dbConnect");

exports.get_templates = asyncHandler(async (req, res, next) => {
  const data = await models.Template.findAll();

  if (!data) {
    res.status(404).json({ message: "No templates found" });
  }
  res.status(200).json(data);
});

exports.get_template_detail = asyncHandler(async (req, res, next) => {
  // Query all the template's associated data
  // Send all data to the frontend and pass data as props
  // Include the workout exercises also
  const data = await models.TemplateWorkout.findAll({
    include: [
      {
        model: models.Template,
        attributes: ["id", "name"],
      },
      {
        model: models.Workout,
        attributes: ["id", "name"],
        include: {
          model: models.Exercise,
          through: models.WorkoutExercise,
          attributes: ["id", "name"],
        },
      },
    ],
    where: { template_id: req.params.id },
  });

  if (!data) {
    res.status(404).json({ message: "No template found" });
  }

  // Here the data is put into an easy to consume
  // format. The template is reduced to a single object
  // that holds template details and puts the workouts
  // into an array of objects.
  const formattedData = {
    id: data[0].template.id,
    name: data[0].template.name,
    workouts: data.map((workout) => {
      return {
        id: workout.workout.id,
        name: workout.workout.name,
        exercises: workout.workout.exercises,
      };
    }),
  };

  res.status(200).json(formattedData);
});

exports.post_template = asyncHandler(async (req, res, next) => {
  const { name, description, workouts } = req.body;
  const userTemplate = await models.Template.create({
    name,
    description,
    user_generated: 1,
    adjustable: 1,
  });

  const userWorkouts = workouts.map(async (workout) => {
    const userWorkout = await models.Workout.create({
      name: workout.name,
      description: workout.description,
    });
    return { id: userWorkout.id, exercises: workout.exercises };
  });

  const workoutsData = await Promise.all(userWorkouts);
  const userTemplateWorkouts = workoutsData.map(async (workout) => {
    const userTemplateWorkout = await models.TemplateWorkout.create({
      template_id: userTemplate.id,
      workout_id: workout.id,
    });

    const userWorkoutExercises = workout.exercises.map(async (exercise) => {
      const userWorkoutExercise = await models.WorkoutExercise.create({
        workout_id: workout.id,
        exercise_id: exercise.id,
      });
    });
  });

  res.status(200).json({ message: "Successfully created user template" });
});

exports.get_workouts = asyncHandler(async (req, res, next) => {
  try {
    const data = await models.TemplateWorkout.findAll({
      attributes: ["workout_id"],
      include: [
        {
          model: models.Workout,
          attributes: ["id", "name"],
        },
        {
          model: models.Template,
          attributes: ["id", "name"],
        },
      ],
      where: { template_id: req.params.id },
    });

    if (!data) {
      res.status(404).json({ message: "No sessions found" });
    } else {
      // const dataJSON = data.map((workout) => session.toJSON());

      res.status(200).json(data);
    }
  } catch (error) {
    console.log(error.message);
    res.status(500).json({ message: "Error fetching workouts" });
  }
});
