const { Sequelize, DataTypes } = require("sequelize");

module.exports = (sequelize) => {
  const ExerciseMuscle = sequelize.define(
    "exerciseMuscle",
    {
      exercise_id: {
        type: DataTypes.INTEGER,
        foreignKey: true,
        allowNull: false,
        references: {
          model: "Exercise",
          key: "id",
        },
      },
      muscle_id: {
        type: DataTypes.INTEGER,
        foreignKey: true,
        allowNull: false,
        references: {
          model: "MuscleGroup",
          key: "id",
        },
      },
    },
    {
      tableName: "exercise_muscles",
    }
  );
  return ExerciseMuscle;
};
