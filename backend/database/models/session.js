const { Sequelize, DataTypes } = require("sequelize");

const Session = (sequelize) => {
  sequelize.define("Session", {
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
};

module.exports = Session;
