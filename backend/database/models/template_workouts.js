const { Sequelize, DataTypes } = require("sequelize");

module.exports = (sequelize) => {
  const TemplateWorkout = sequelize.define(
    "TemplateWorkout",
    {
      template_id: {
        type: DataTypes.INTEGER,
        foreignKey: true,
        allowNull: false,
        references: {
          model: "Template",
          key: "id",
        },
      },
      workout_id: {
        type: DataTypes.INTEGER,
        foreignKey: true,
        allowNull: false,
        references: {
          model: "Workout",
          key: "id",
        },
      },
    },
    {
      tableName: "template_workouts",
    }
  );
  return TemplateWorkout;
};
