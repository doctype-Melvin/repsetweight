const { DataTypes } = require("sequelize");

module.exports = (sequelize) => {
  const user = sequelize.define(
    "user",
    {
      username: {
        type: DataTypes.STRING,
        allowNull: false,
        unique: true,
      },
      email: {
        type: DataTypes.STRING,
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
        primaryKey: true,
        autoIncrement: true,
      },
      active_template: {
        type: DataTypes.INTEGER,
        allowNull: true,
        defaultValue: 0,
      },
    },
    {
      timestamps: false,
    }
  );

  user.associate = (models) => {
    user.hasMany(models.session, {
      as: "sessions",
      foreignKey: "users_user_id",
    });
  };

  return user;
};
