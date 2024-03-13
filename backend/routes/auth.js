const express = require("express");
const router = express.Router();
const passport = require("passport");
const LocalStrategy = require("passport-local").Strategy;
const { models } = require("../database/dbConnect");

const authController = require("../controllers/authController");

passport.use(
  new LocalStrategy(function (username, password, done) {
    try {
      models.User.findOne({ where: { username: username } }).then((user) => {
        const userObj = user?.toJSON();
        if (!user) {
          console.log("No user found");
          return done(null, false, { message: "Incorrect username." });
        }
        if (!(userObj.password === password)) {
          return done(null, false, { message: "Incorrect password." });
        }
        console.log("Passport Success!", userObj);
        return done(null, userObj);
      });
    } catch (err) {
      return done(err);
    }
  })
);

passport.serializeUser(function (user, done) {
  done(null, { id: user.user_id });
});

passport.deserializeUser(function (user, done) {
  done(null, user);
});

router.get("/", authController.get_db);
router.get("/login", authController.get_login);
router.post("/login", authController.post_login);
router.get("/logout", authController.get_logout);

module.exports = router;
