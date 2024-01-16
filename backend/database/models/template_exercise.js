const { Sequelize, DataTypes } = require("sequelize");

module.exports = (sequelize) => {
  const TemplateExercise = sequelize.define("TemplateExercise", {
    sets: {
      type: DataTypes.INTEGER,
      allowNull: true,
    },
    reps: {
      type: DataTypes.INTEGER,
      allowNull: true,
    },
    weight: {
      type: DataTypes.INTEGER,
      allowNull: true,
    },
    templates_template_id: {
      type: DataTypes.INTEGER,
      allowNull: false,
    },
    exercises_exercise_id: {
      type: DataTypes.INTEGER,
      allowNull: false,
    },
  });
  return TemplateExercise;
};
