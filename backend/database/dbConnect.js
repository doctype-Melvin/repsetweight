require("dotenv").config();
const Sequelize = require("sequelize");
const Exercise = require("./models/exercises");
const UserProgress = require("./models/user_exercise_progress");
const Session = require("./models/sessions");
const TemplateWorkout = require("./models/template_workouts");
const Workout = require("./models/workouts");
const Template = require("./models/templates");
const User = require("./models/users");

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
  define: {
    timestamps: false,
  },
});

const models = {
  Exercise: Exercise(sequelize),
  UserProgress: UserProgress(sequelize),
  Session: Session(sequelize),
  TemplateWorkout: TemplateWorkout(sequelize),
  Template: Template(sequelize),
  Workout: Workout(sequelize),
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
