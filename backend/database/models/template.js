const { Sequelize, DataTypes } = require("sequelize");

module.exports = (sequelize) => {
  const Template = sequelize.define("Template", {
    name: {
      type: DataTypes.STRING,
      allowNull: false,
      unique: true,
    },
    style: {
      type: DataTypes.STRING(128),
      allowNull: true,
    },
    focus: {
      type: DataTypes.STRING,
      allowNull: false,
    },
    frequency: {
      type: DataTypes.INTEGER,
      allowNull: false,
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
    template_id: {
      type: DataTypes.INTEGER,
      primaryKey: true,
      allowNull: false,
    },
  });
  return Template;
};
