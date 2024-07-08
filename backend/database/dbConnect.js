require("dotenv").config();
const Sequelize = require("sequelize");
const Exercise = require("./models/exercises");
const UserProgress = require("./models/user_exercise_progress");
const Session = require("./models/sessions");
const TemplateWorkout = require("./models/template_workouts");
const Workout = require("./models/workouts");
const Template = require("./models/templates");
const User = require("./models/users");
const WorkoutExercise = require("./models/workout_exercises");
const ExerciseBaseline = require("./models/exercise_baseline");
const ExerciseMuscle = require("./models/exercise_muscles");
const MuscleGroup = require("./models/muscle_groups");
const { associations } = require("./models/associations");
const { migrateExerciseMuscles } = require("./migration");

// Initialize Sequelize
const sequelize = new Sequelize({
  database: process.env.DB_DATABASE,
  username: process.env.DB_USERNAME,
  password: process.env.DB_PASSWORD,
  dialect: "mysql",
  host: process.env.DB_HOST,
  port: process.env.DB_PORT,
  // logging: (msg) => console.log(msg),
  logging: false,
  dialectOptions: {
    charset: "utf8",
  },
  define: {
    timestamps: false,
  },
});

const models = {
  ExerciseMuscle: ExerciseMuscle(sequelize),
  MuscleGroup: MuscleGroup(sequelize),
  ExerciseBaseline: ExerciseBaseline(sequelize),
  WorkoutExercise: WorkoutExercise(sequelize),
  Exercise: Exercise(sequelize),
  UserProgress: UserProgress(sequelize),
  Session: Session(sequelize),
  TemplateWorkout: TemplateWorkout(sequelize),
  Template: Template(sequelize),
  Workout: Workout(sequelize),
  User: User(sequelize),
};

associations(models);
// migrateExerciseMuscles(models, sequelize);

module.exports = { sequelize, models };
