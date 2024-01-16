const express = require("express");
const router = express.Router();
const passport = require("passport");
const LocalStrategy = require("passport-local").Strategy;
const { models, sequelize } = require("../database/dbConnect");

const authController = require("../controllers/authController");

passport.use(
  new LocalStrategy(function verify(username, password, done) {
    try {
      models.User.findOne({ where: { username: username } }).then((user) => {
        if (!user) {
          return done(null, false, { message: "Incorrect username." });
        }
        if (!user.password === password) {
          return done(null, false, { message: "Incorrect password." });
        }
        return done(null, user);
      });
    } catch (err) {
      return done(err);
    }
  })
);

router.get("/", authController.get_db);
router.get("/login", authController.get_login);
router.post("/login", authController.post_login);

module.exports = router;
