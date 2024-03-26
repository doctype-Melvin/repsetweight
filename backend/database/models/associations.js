const associations = (models) => {
  // Junction table template_workouts
  models.TemplateWorkout.belongsTo(models.Template, {
    foreignKey: "template_id",
  });

  models.TemplateWorkout.belongsTo(models.Workout, {
    foreignKey: "workout_id",
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

  // Junction table workout_exercises
  models.WorkoutExercise.belongsTo(models.Workout, {
    foreignKey: "workout_id",
  });
  models.WorkoutExercise.belongsTo(models.Exercise, {
    foreignKey: "exercise_id",
  });
  models.Workout.belongsToMany(models.Exercise, {
    foreignKey: "workout_id",
    through: models.WorkoutExercise,
  });
  models.Exercise.belongsToMany(models.Workout, {
    foreignKey: "exercise_id",
    through: models.WorkoutExercise,
  });
};

module.exports = { associations };
