const { Sequelize, DataTypes } = require("sequelize");

module.exports = (sequelize) => {
  const UserExerciseProgress = sequelize.define(
    "UserExerciseProgress",
    {
      id: {
        type: DataTypes.INTEGER,
        primaryKey: true,
        allowNull: false,
        unique: true,
      },
      session_id: {
        type: DataTypes.INTEGER,
        allowNull: true,
      },
      exercise_id: {
        type: DataTypes.INTEGER,
        allowNull: true,
      },
      sets: {
        type: DataTypes.INTEGER,
        allowNull: true,
      },
      reps: {
        type: DataTypes.INTEGER,
        allowNull: true,
      },
      weight: {
        type: DataTypes.DECIMAL(10, 2),
        allowNull: true,
      },
      user_id: {
        type: DataTypes.INTEGER,
        foreignKey: true,
        allowNull: false,
      },
    },
    {
      tableName: "user_exercise_progress",
    }
  );
  return UserExerciseProgress;
};
