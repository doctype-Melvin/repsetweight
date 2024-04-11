const { Sequelize, DataTypes } = require("sequelize");

module.exports = (sequelize) => {
  const Template = sequelize.define("template", {
    name: {
      type: DataTypes.STRING,
      allowNull: false,
      unique: true,
    },
    style: {
      type: DataTypes.STRING(128),
      allowNull: true,
    },
    progression: {
      type: DataTypes.STRING,
      allowNull: true,
    },
    description: {
      type: DataTypes.STRING,
      allowNull: true,
    },
    user_generated: {
      type: DataTypes.BOOLEAN,
      allowNull: false,
    },
    adjustable: {
      type: DataTypes.BOOLEAN,
      allowNull: false,
    },
    id: {
      type: DataTypes.INTEGER,
      primaryKey: true,
      autoIncrement: true,
      allowNull: false,
    },
  });

  return Template;
};
