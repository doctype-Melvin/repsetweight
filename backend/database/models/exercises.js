const { Sequelize, DataTypes } = require("sequelize");

module.exports = (sequelize) => {
  const Exercise = sequelize.define("exercise", {
    id: {
      type: DataTypes.INTEGER,
      allowNull: false,
      primaryKey: true,
      autoIncrement: true,
    },
    name: {
      type: DataTypes.STRING(128),
      allowNull: false,
      unique: true,
    },
    category: {
      type: DataTypes.STRING,
      allowNull: false,
    },
    target: {
      type: DataTypes.STRING,
      allowNull: false,
    },
    equipment: {
      type: DataTypes.STRING,
      allowNull: true,
    },
    user_added: {
      type: DataTypes.BOOLEAN,
      allowNull: false,
    },
  });
  return Exercise;
};
