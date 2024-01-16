const express = require("express");
const cors = require("cors");
const cookieParser = require("cookie-parser");
const port = 3000;
const createError = require("http-errors");

const indexRouter = require("./routes/index");
const authRouter = require("./routes/auth");

const app = express();

app.use(cors());
app.use(express.json());
app.use(express.urlencoded({ extended: false }));
app.use(cookieParser());

app.use("/", indexRouter);
app.use("/auth", authRouter);

app.listen(port, () => {
  console.log(`Server listening at http://localhost:${port}`);
});

module.exports = app;
