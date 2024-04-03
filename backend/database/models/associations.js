const associations = (models) => {
  models.TemplateWorkout.belongsTo(models.Template, {
    foreignKey: "template_id",
  });

  models.TemplateWorkout.belongsTo(models.Workout, {
    foreignKey: "workout_id",
  });

  models.WorkoutExercise.belongsTo(models.Workout, {
    foreignKey: "workout_id",
  });

  models.WorkoutExercise.belongsTo(models.Exercise, {
    foreignKey: "exercise_id",
  });

  models.Template.belongsToMany(models.Workout, {
    through: models.TemplateWorkout,
    foreignKey: "template_id",
    otherKey: "workout_id",
  });

  models.Workout.belongsToMany(models.Template, {
    through: models.TemplateWorkout,
    foreignKey: "workout_id",
    otherKey: "template_id",
  });

  models.Workout.belongsToMany(models.Exercise, {
    through: models.WorkoutExercise,
    foreignKey: "workout_id",
    otherKey: "exercise_id",
  });

  models.Exercise.belongsToMany(models.Workout, {
    through: models.WorkoutExercise,
    foreignKey: "exercise_id",
    otherKey: "workout_id",
  });
};

module.exports = { associations };
