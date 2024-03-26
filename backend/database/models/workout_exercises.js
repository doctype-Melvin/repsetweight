const { Sequelize, DataTypes } = require("sequelize");

module.exports = (sequelize) => {
  const WorkoutExercise = sequelize.define(
    "WorkoutExercise",
    {
      workout_id: {
        type: DataTypes.INTEGER,
        allowNull: false,
      },
      exercise_id: {
        type: DataTypes.INTEGER,
        allowNull: false,
      },
    },
    {
      tableName: "workout_exercises",
    }
  );
  return WorkoutExercise;
  w;
};
