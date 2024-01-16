const { Sequelize, DataTypes } = require("sequelize");

module.exports = (sequelize) => {
  const Session = sequelize.define("Session", {
    session_id: {
      type: DataTypes.INTEGER,
      allowNull: false,
      unique: true,
    },
    date: {
      type: DataTypes.DATEONLY,
      allowNull: false,
      unique: true,
    },
    isComplete: {
      type: DataTypes.BOOLEAN,
      allowNull: false,
    },
    templates_template_id: {
      type: DataTypes.INTEGER,
      allowNull: false,
    },
    users_user_id: {
      type: DataTypes.INTEGER,
      allowNull: false,
    },
  });
  return Session;
};
