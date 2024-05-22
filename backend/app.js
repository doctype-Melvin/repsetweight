const express = require("express");
const cors = require("cors");
const cookieParser = require("cookie-parser");
const session = require("express-session");

const createError = require("http-errors");

const indexRouter = require("./routes/index");

const usersRouter = require("./routes/users");
const templatesRouter = require("./routes/templates");
const exercisesRouter = require("./routes/exercises");
const workoutsRouter = require("./routes/workouts");
const muscleGroupsRouter = require("./routes/muscleGroups");

const passport = require("passport");

const app = express();

app.use(
  cors({
    origin: "http://localhost:5173",
    credentials: true,
  })
);
app.use(express.json());
app.use(express.urlencoded({ extended: false }));
app.use(cookieParser());

app.use(
  session({
    secret: "secret",
    resave: false,
    saveUninitialized: false,
  })
);
app.use(passport.initialize());
app.use(passport.session());

app.use("/api", indexRouter);

app.use("/api/users", usersRouter);
app.use("/api/templates", templatesRouter);
app.use("/api/exercises", exercisesRouter);
app.use("/api/workouts", workoutsRouter);
app.use("/api/muscle-groups", muscleGroupsRouter);

// app.listen(3000, () => {
//   console.log(`Server listening at http://localhost:3000`);
// });

module.exports = app;
