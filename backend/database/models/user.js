const { Sequelize, DataTypes } = require("sequelize");

const User = (sequelize) => {
  sequelize.define("User", {
    username: {
      type: DataTypes.STRING,
      allowNull: false,
      unique: true,
    },
    email: {
      type: DataTypes.STRING(128),
      allowNull: false,
      unique: true,
    },
    password: {
      type: DataTypes.STRING,
      allowNull: false,
    },
    birthday: {
      type: DataTypes.DATEONLY,
      allowNull: false,
    },
    user_id: {
      type: DataTypes.INTEGER,
      allowNull: false,
    },
    active_template: {
      type: DataTypes.INTEGER,
      allowNull: true,
    },
  });
};

module.exports = User;
