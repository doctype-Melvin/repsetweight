const { Sequelize, DataTypes } = require("sequelize");

module.exports = (sequelize) => {
  const WorkoutExercise = sequelize.define(
    "workoutExercise",
    {
      workout_id: {
        type: DataTypes.INTEGER,
        foreignKey: true,
        allowNull: false,
        references: {
          model: "Workout",
          key: "id",
        },
      },
      exercise_id: {
        type: DataTypes.INTEGER,
        foreignKey: true,
        allowNull: false,
        references: {
          model: "Exercise",
          key: "id",
        },
      },
    },
    {
      tableName: "workout_exercises",
    }
  );
  return WorkoutExercise;
};
