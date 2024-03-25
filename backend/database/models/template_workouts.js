const { Sequelize, DataTypes } = require("sequelize");

module.exports = (sequelize) => {
  const TemplateWorkout = sequelize.define(
    "TemplateWorkouts",
    {
      template_id: {
        type: DataTypes.INTEGER,
        allowNull: true,
      },
      workout_id: {
        type: DataTypes.INTEGER,
        allowNull: true,
      },
    },
    {
      tableName: "template_workouts",
    }
  );
  return TemplateWorkout;
};
