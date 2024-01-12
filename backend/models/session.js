const { DataTypes } = require("sequelize");

module.exports = (sequelize) => {
  const session = sequelize.define("session", {
    session_id: {
      type: DataTypes.INTEGER,
      allowNull: false,
      primaryKey: true,
      autoIncrement: true,
    },
    date: {
      type: DataTypes.DATEONLY,
      allowNull: false,
    },
    isComplete: {
      type: DataTypes.BOOLEAN,
      allowNull: false,
    },
  });
  return session;
};
