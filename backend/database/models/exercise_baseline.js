const { Sequelize, DataTypes } = require("sequelize");

module.exports = (sequelize) => {
  const ExerciseBaseline = sequelize.define(
    "exerciseBaseline",
    {
      id: {
        type: DataTypes.INTEGER,
        primaryKey: true,
        autoIncrement: true,
        allowNull: false,
      },
      exercise_uid: {
        type: DataTypes.STRING,
        foreignKey: true,
        allowNull: false,
        references: {
          model: "WorkoutExercise",
          key: "uid",
        },
      },
      sets: {
        type: DataTypes.INTEGER,
        allowNull: false,
      },
      reps: {
        type: DataTypes.INTEGER,
        allowNull: false,
      },
      weight: {
        type: DataTypes.FLOAT,
        allowNull: false,
      },
    },
    {
      tableName: "exercise_baselines",
    }
  );
  return ExerciseBaseline;
};
