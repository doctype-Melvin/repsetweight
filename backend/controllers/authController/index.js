const { sequelize } = require("../../database/dbConnect");
const asyncHandler = require("express-async-handler");
const passport = require("passport");

exports.get_db = asyncHandler(async (req, res, next) => {
  try {
    await sequelize.authenticate();
    console.log("Connected to MySQL DB!");
    res.status(200).json({ message: "DB connected" });
  } catch (error) {
    console.error("Unable to connect to the database:");
    res.status(500);
    return next(error);
  }
  next();
});

exports.get_login = asyncHandler(async (req, res, next) => {
  res.json({ status: 209 });
  next();
});

exports.post_login = (req, res, next) => {
  passport.authenticate("local", (err, user) => {
    if (err) {
      return next(err);
    }
    if (!user) {
      res
        .status(401)
        .json({ auth: false, message: "Incorrect username or password" });
    } else {
      const userId = user.user_id;
      res.cookie("session_id", userId, { httpOnly: true, sameSite: "strict" });
      res.status(200).json({ auth: true, message: "Login successful" });
    }
  })(req, res, next);
};

exports.get_logout = asyncHandler(async (req, res, next) => {
  req.logout((err) => {
    if (err) {
      return next(err);
    }
    res.redirect("/");
  });
});
