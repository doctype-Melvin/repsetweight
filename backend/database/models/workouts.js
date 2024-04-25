const { Sequelize, DataTypes } = require("sequelize");

module.exports = (sequelize) => {
  const Workout = sequelize.define("workout", {
    name: {
      type: DataTypes.STRING,
      allowNull: true,
    },
    id: {
      type: DataTypes.INTEGER,
      primaryKey: true,
      autoIncrement: true,
      allowNull: false,
    },
    description: {
      type: DataTypes.TEXT,
      allowNull: false,
    },
  });
  return Workout;
};
