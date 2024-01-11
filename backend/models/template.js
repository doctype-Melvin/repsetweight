const { DataTypes } = require("sequelize");

module.exports = (sequelize) => {
  const template = sequelize.define("template", {
    template_id: {
      type: DataTypes.INTEGER,
      allowNull: false,
      primaryKey: true,
      autoIncrement: true,
    },
    name: {
      type: DataTypes.STRING,
      allowNull: false,
    },
    style: {
      type: DataTypes.STRING,
      allowNull: false,
    },
    description: {
      type: DataTypes.STRING,
      allowNull: false,
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
      allowNull: false,
    },
    user_generated: {
      type: DataTypes.BOOLEAN,
      allowNull: false,
    },
    adjustable: {
      type: DataTypes.BOOLEAN,
      allowNull: false,
    },
  });

  template.associate = (models) => {
    template.hasMany(models.session, {
      as: "sessions",
      foreignKey: "templates_template_id",
    });
  };

  return template;
};
