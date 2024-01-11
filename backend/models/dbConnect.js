require("dotenv").config();
const { Sequelize } = require("sequelize");
const UserModel = require("./user");
const TemplateModel = require("./template");
const SessionModel = require("./session");

const sequelize = new Sequelize({
  dialect: "mysql",
  host: process.env.MYSQL_HOST,
  port: process.env.MYSQL_PORT,
  database: process.env.MYSQL_DB,
  username: process.env.MYSQL_USER,
  password: process.env.MYSQL_PASSWORD,
});

const models = {
  user: UserModel(sequelize),
  template: TemplateModel(sequelize),
  session: SessionModel(sequelize),
};

Object.values(models).forEach((model) => {
  if (model.associate) {
    model.associate(models);
  }
});

module.exports = { sequelize, models };
