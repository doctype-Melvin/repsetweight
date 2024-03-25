const { models } = require("./database/dbConnect");

const authCheck = (req, res, next) => {
  // console.log("authCheck", req.isAuthenticated());
  if (!req.isAuthenticated()) {
    return res.status(401).json({ message: "Unauthorized" });
  }
  next();
};
