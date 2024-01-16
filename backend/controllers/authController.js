const sequelize = require("../database/dbConnect");
const asyncHandler = require("express-async-handler");
const passport = require("passport");

exports.get_db = asyncHandler(async (req, res, next) => {
  try {
    await sequelize.authenticate();
    console.log("Connection has been established successfully.");
    res.send("Connection has been established successfully.");
  } catch (error) {
    console.error("Unable to connect to the database:", error);
    res.send("Unable to connect to the database:", error);
  }
  next();
});

exports.get_login = asyncHandler(async (req, res, next) => {
  res.send("Login Page");
  next();
});

exports.post_login = asyncHandler(async (req, res, next) => {
  passport.authenticate("local", {
    successRedirect: "/",
    failureRedirect: "/login",
  })(req, res, next);
});
