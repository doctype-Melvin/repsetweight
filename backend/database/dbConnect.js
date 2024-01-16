require("dotenv").config();
const Sequelize = require("sequelize");
const Exercise = require("./models/exercise");
const SessionSets = require("./models/session_set");
const Session = require("./models/session");
const TemplateExercise = require("./models/template_exercise");
const Template = require("./models/template");
const User = require("./models/user");

const sequelize = new Sequelize({
  database: process.env.DB_DATABASE,
  username: process.env.DB_USERNAME,
  password: process.env.DB_PASSWORD,
  dialect: "mysql",
  host: process.env.DB_HOST,
  port: process.env.DB_PORT,
  logging: false,
  dialectOptions: {
    charset: "utf8",
  },
});

const models = {
  Exercise: Exercise(sequelize),
  SessionSets: SessionSets(sequelize),
  Session: Session(sequelize),
  TemplateExercise: TemplateExercise(sequelize),
  Template: Template(sequelize),
  User: User(sequelize),
};

// Test db connection
// sequelize
//   .authenticate()
//   .then(() => {
//     console.log("Connection has been established successfully.");
//   })
//   .catch((error) => {
//     console.error("Unable to connect to the database:", error);
//   });

module.exports = { sequelize, models };
