var express = require("express");
var router = express.Router();
const passport = require("passport");
const LocalStrategy = require("passport-local").Strategy;
const db = require("../models/dbConnect");

const authController = require("../controllers/authController");

// This works as intended
// Find out how to authenticate user after this check
passport.use(
  new LocalStrategy(function verify(username, password, done) {
    db.models.user
      .findOne({ where: { username: username } })
      .then((user) => {
        if (!user) {
          return done(null, false, { message: "Incorrect username." });
        }
        if (user.password !== password) {
          return done(null, false, { message: "Incorrect password." });
        }
        const userToJSON = user.toJSON();
        console.log("--Auth: Verified User--");
        return done(null, userToJSON);
      })
      .catch((err) => {
        console.log("LocalStrategy Error");
        done(err);
      });
  })
);

passport.serializeUser(function (user, done) {
  process.nextTick(() => {
    console.log("--Serialize: Auth User--");
    done(null, { id: user.user_id, username: user.username });
  });
});

passport.deserializeUser(function (id, done) {
  process.nextTick(() => {
    return done(null, id);
  });
});

router.get("/signup", authController.form_get);
router.post("/signup", authController.form_post);

router.get("/login", authController.login_get);
router.post("/login", authController.login_post);

module.exports = router;
