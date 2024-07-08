const migrateExerciseMuscles = async (models, sequelize) => {
  const transaction = await sequelize.transaction();
  try {
    const allExercises = await models.Exercise.findAll();

    //   Find all exercises and
    //   go through the target property of each exercise.
    //   Split the target property value by comma and
    //   insert exercise id and muscle id into the exercise_muscles table.

    for (const exercise of allExercises) {
      const muscles = exercise.target.split(",");

      for (const muscle of muscles) {
        const formatMuscleString = muscle.trim();
        const muscleGroup = await models.MuscleGroup.findOne({
          where: { name: formatMuscleString },
        });

        // console.log(exercise.id, muscleGroup.id);
        await models.ExerciseMuscle.create(
          {
            exercise_id: exercise.id,
            muscle_id: muscleGroup.id,
          },
          { transaction }
        );
      }
    }
    await transaction.commit();
  } catch (error) {
    console.log(error.message);
    transaction.rollback();
  }
};

module.exports = { migrateExerciseMuscles };
