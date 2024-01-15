const { sequelize } = require("../models/dbConnect");
const asyncHandler = require("express-async-handler");
const { models } = require("../models/dbConnect");
const passport = require("passport");

exports.form_get = asyncHandler(async (req, res) => {
  try {
    await sequelize.authenticate();
    console.log("BE: DB Connection and Sign Up Form");
    res.json({ auth_get: req.body });
  } catch (error) {
    console.log("Unable to connect to the database:", error);
    return;
  }
});

exports.form_post = asyncHandler(async (req, res) => {
  try {
    await sequelize.authenticate();
    const newUser = await models.user.create({
      username: req.body.username,
      password: req.body.password,
      email: req.body.email,
      birthday: req.body.birthday || null,
    });
    console.log("BE: Connection has been established successfully.");
    console.log("BE: New User Created", newUser.toJSON());
    res.json({ message: "Successfully create new user", code: 200 });
  } catch (error) {
    console.log("Unable to connect to the database:", error);
    return;
  }
});

exports.login_get = asyncHandler(async (req, res, next) => {
  res.json({ message: "Login Get", code: 200 });
  next();
});

// Investigate why this works
exports.login_post = asyncHandler(async (req, res, next) => {
  passport.authenticate("local", (err, user, info) => {
    if (err) {
      console.log("Auth Error", err);
      return res.status(500).json({ message: "Auth Error", code: 500 });
    }
    if (!user) {
      console.log("Auth Error", err);
      return res.status(401).json({ message: "Auth Error", code: 401 });
    }
    return res.status(200).json({ message: "Auth Success", code: 200 });
  })(req, res, next);
});
