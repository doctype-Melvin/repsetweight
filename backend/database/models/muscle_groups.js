const { Sequelize, DataTypes } = require("sequelize");

module.exports = (sequelize) => {
  const MuscleGroup = sequelize.define(
    "muscleGroup",
    {
      id: {
        type: DataTypes.INTEGER,
        primaryKey: true,
        autoIncrement: true,
      },
      name: {
        type: DataTypes.STRING,
        allowNull: false,
      },
    },
    {
      tableName: "muscle_groups",
    }
  );
  return MuscleGroup;
};
