const express = require("express");
const cors = require("cors");
const cookieParser = require("cookie-parser");
const session = require("express-session");
const path = require("path");

const createError = require("http-errors");

const indexRouter = require("./routes/index");

const authRouter = require("./routes/auth");
const usersRouter = require("./routes/users");
const templatesRouter = require("./routes/templates");
const exercisesRouter = require("./routes/exercises");

const passport = require("passport");

const app = express();

// app.set("views", path.join(__dirname, "views"));
// app.set("view engine", "pug");

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

app.use("/api/auth", authRouter);
app.use("/api/users", usersRouter);
app.use("/api/templates", templatesRouter);
app.use("/api/exercises", exercisesRouter);

// app.listen(3000, () => {
//   console.log(`Server listening at http://localhost:3000`);
// });

module.exports = app;
