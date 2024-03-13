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

// exports.post_login = asyncHandler(async (req, res, next) => {
//   passport.authenticate("local", (err, user, info) => {
//     if (err) {
//       return next(err);
//     }
//     if (!user) {
//       return res.status(401).json({ message: info.message });
//     }
//     req.logIn(user, (err) => {
//       if (err) {
//         return next(err);
//       }

//       return res.status(200).json({ message: "Login successful" });
//     });
//   })(req, res, next);
// });

// exports.post_login = passport.authenticate("local", {
//   failureRedirect: "http://localhost:5173/auth",
//   successRedirect: "http://localhost:5173/login",
// });

exports.post_login = (req, res, next) => {
  passport.authenticate("local", (err, user) => {
    console.log("Login attempt");
    if (err) {
      return next(err);
    }
    if (!user) {
      res
        .status(401)
        .json({ auth: false, message: "Incorrect username or password" });
    } else {
      res.status(200).json({ auth: true, message: "Login successful" });
    }
    next();
  })(req, res, next);
};

exports.get_logout = asyncHandler(async (req, res, next) => {
  // console.log("User logs out");
  req.logout((err) => {
    if (err) {
      return next(err);
    }
    res.redirect("/");
  });
});
