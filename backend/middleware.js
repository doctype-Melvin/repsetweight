const passport = require("passport");

const authCheck = (req, res, next) => {
  passport.authenticate("local", (err, user, info) => {
    if (err) {
      return res.status(500).json({ message: "Server Error" });
    }
    if (!user) {
      return res.status(401).json({ message: "Not authorised" });
    }
    req.login(user, (err) => {
      console.log("autchCheck", user);
      if (err) {
        return res.status(500).json({ message: "Server Error" });
      }
      next();
    });
  })(req, res, next);
};

module.exports = authCheck;
