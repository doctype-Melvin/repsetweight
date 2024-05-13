const migrateExerciseMuscles = async (models) => {
  const allExercises = await models.Exercise.findAll();
  //   Find all exercises and
  // go through the target property of each exercise.
  // Split the target property value by comma and
  //   insert exercise id and muscle id into the exercise_muscles table.
  allExercises.forEach((item) => console.log(item.toJSON()));
};

module.exports = { migrateExerciseMuscles };
