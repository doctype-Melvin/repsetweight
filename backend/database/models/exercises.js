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
    target: {
      type: DataTypes.STRING,
      allowNull: false,
    },
    user_added: {
      type: DataTypes.BOOLEAN,
      allowNull: true,
    },
  });
  return Exercise;
};
