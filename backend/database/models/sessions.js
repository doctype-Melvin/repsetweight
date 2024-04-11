const { Sequelize, DataTypes } = require("sequelize");

module.exports = (sequelize) => {
  const Session = sequelize.define("session", {
    id: {
      type: DataTypes.INTEGER,
      allowNull: false,
      primaryKey: true,
    },
    date: {
      type: DataTypes.DATEONLY,
      allowNull: false,
      unique: true,
    },
    user_id: {
      type: DataTypes.INTEGER,
      allowNull: false,
    },
    template_id: {
      type: DataTypes.INTEGER,
      foreignKey: true,
      allowNull: false,
    },
    workout_id: {
      type: DataTypes.INTEGER,
      foreignKey: true,
      allowNull: false,
    },
  });
  return Session;
};
