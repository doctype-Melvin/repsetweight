const { Sequelize, DataTypes } = require("sequelize");

module.exports = (sequelize) => {
  const TemplateSession = sequelize.define(
    "TemplateSession",
    {
      name: {
        type: DataTypes.STRING,
        allowNull: true,
      },
      session_exercises: {
        type: DataTypes.JSON,
        allowNull: true,
      },
      template_id: {
        type: DataTypes.INTEGER,
        foreignKey: true,
        allowNull: false,
      },
      template_session_id: {
        type: DataTypes.INTEGER,
        primaryKey: true,
        allowNull: false,
      },
    },
    {
      tableName: "template_sessions",
    }
  );
  return TemplateSession;
};
