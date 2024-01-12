const { sequelize } = require("../models/dbConnect");
const asyncHandler = require("express-async-handler");
const { models } = require("../models/dbConnect");

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

// This just receives the request from login form
// and checks if user exists
// Just a test - please implement passport.js
exports.login_post = asyncHandler(async (req, res) => {
  try {
    console.log("BE: Login Post", req.body);
    const user = await models.user.findOne({
      where: {
        username: req.body.username,
      },
    });

    if (!user) {
      res.json({ message: "User not found", code: 404 });
      return;
    }
    if (user.password !== req.body.password) {
      res.json({ message: "Wrong password", code: 401 });
      return;
    }
    res.json({ message: "Login success", code: 200, user: user.toJSON() });
  } catch (error) {
    console.log("Unable to connect to the database:", error);
    return;
  }
});
