const express = require("express");
const cors = require("cors");
const cookieParser = require("cookie-parser");
const port = 3000;
const createError = require("http-errors");

const indexRouter = require("./routes/index");

const authRouter = require("./routes/auth");
const usersRouter = require("./routes/users");

const app = express();

app.use(cors());
app.use(express.json());
app.use(express.urlencoded({ extended: false }));
app.use(cookieParser());

app.use("/api", indexRouter);

app.use("/api/auth", authRouter);
app.use("/api/users", usersRouter);

app.listen(port, () => {
  console.log(`Server listening at http://localhost:${port}`);
});

module.exports = app;
