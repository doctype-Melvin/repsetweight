const { Sequelize, DataTypes } = require("sequelize");

module.exports = (sequelize) => {
  const SessionSets = sequelize.define("SessionSets", {
    session_set_id: {
      type: DataTypes.INTEGER,
      allowNull: false,
      unique: true,
    },
    set_number: {
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
    pump: {
      type: DataTypes.INTEGER,
      allowNull: true,
    },
    joint_pain: {
      type: DataTypes.BOOLEAN,
      allowNull: true,
    },
    sessions_session_id: {
      type: DataTypes.INTEGER,
      allowNull: false,
    },
    sessions_templates_template_id: {
      type: DataTypes.INTEGER,
      allowNull: false,
    },
    sessions_users_user_id: {
      type: DataTypes.INTEGER,
      allowNull: false,
    },
    exercises_exercise_id: {
      type: DataTypes.INTEGER,
      allowNull: false,
    },
  });
  return SessionSets;
};
