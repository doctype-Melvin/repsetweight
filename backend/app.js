const express = require("express");
const cors = require("cors");
const cookieParser = require("cookie-parser");
const session = require("express-session");

const createError = require("http-errors");

const indexRouter = require("./routes/index");

const authRouter = require("./routes/auth");
const usersRouter = require("./routes/users");
const templatesRouter = require("./routes/templates");
const exercisesRouter = require("./routes/exercises");

const passport = require("passport");

const app = express();

app.use(cors());
app.use(express.json());
app.use(express.urlencoded({ extended: false }));
app.use(cookieParser());

app.use(
  session({
    secret: "secret",
    resave: false,
    saveUninitialized: true,
  })
);
app.use(passport.authenticate("session"));

app.use("/api", indexRouter);

app.use("/api/auth", authRouter);
app.use("/api/users", usersRouter);
app.use("/api/templates", templatesRouter);
app.use("/api/exercises", exercisesRouter);

// app.listen(3000, () => {
//   console.log(`Server listening at http://localhost:3000`);
// });

module.exports = app;
