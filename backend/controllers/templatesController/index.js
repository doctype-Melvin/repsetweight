const asyncHandler = require("express-async-handler");
const { models, sequelize } = require("../../database/dbConnect");

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

  if (data.length === 0) {
    return res.status(404).json({ message: "No template found" });
  }

  // Here the data is formatted for easy consumption.
  // The template is reduced to a single object
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
  const transaction = await sequelize.transaction();
  try {
    //  First create the template
    // to retreive the id
    const userTemplate = await models.Template.create(
      {
        name,
        description,
        user_generated: 1,
        adjustable: 1,
      },
      { transaction }
    );

    // Create the workouts
    for (const workout of workouts) {
      // Set the workout name and description
      const userWorkout = await models.Workout.create(
        {
          name: workout.name,
          description: workout.description,
        },
        { transaction }
      );
      // Create rows in junction table
      // to link the workout to the template
      await models.TemplateWorkout.create(
        {
          template_id: userTemplate.id,
          workout_id: userWorkout.id,
        },
        { transaction }
      );
      // Create rows in junction table
      // to link the exercises to the workout
      for (const exercise of workout.exercises) {
        await models.WorkoutExercise.create(
          {
            workout_id: userWorkout.id,
            exercise_id: exercise.id,
          },
          { transaction }
        );
      }
    }
    await transaction.commit();
    res
      .status(200)
      .json({ message: "Your template is now ready!", id: userTemplate.id });
  } catch (error) {
    await transaction.rollback();
    res.status(500).json({ message: "Error creating template" });
  }
});

exports.delete_template = asyncHandler(async (req, res, next) => {
  const transaction = await sequelize.transaction();

  try {
    const template = await models.Template.findByPk(req.params.id, {
      transaction,
    });
    if (!template) {
      res.status(404).json({ message: "No template found" });
    }

    const workouts = await models.TemplateWorkout.findAll({
      where: { template_id: req.params.id },
      transaction,
    });

    // Delete parts of the template sequentially
    // to avoid foreign key constraints
    for (const workout of workouts) {
      await models.WorkoutExercise.destroy({
        where: { workout_id: workout.workout_id },
        transaction,
      });
      await models.TemplateWorkout.destroy({
        where: { template_id: req.params.id },
        transaction,
      });
      await models.Workout.destroy({
        where: { id: workout.workout_id },
        transaction,
      });
    }

    await template.destroy({ transaction });

    await transaction.commit();

    res.status(200).json({ message: "Successfully deleted template" });
  } catch (error) {
    console.log(error.message);
    await transaction.rollback();
    res.status(500).json({ message: "Error fetching template" });
  }
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
