const { Sequelize, DataTypes } = require("sequelize");

module.exports = (sequelize) => {
  const WorkoutExercises = sequelize.define(
    "WorkoutExercises",
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
  return WorkoutExercises;
  w;
};
