const { models, sequelize } = require("../../database/dbConnect");
const asyncHandler = require("express-async-handler");

exports.find_user = asyncHandler(async (req, res, next) => {
  try {
    const user = await models.User.findOne({
      where: { username: req.body.username },
    });
    if (user.password !== req.body.password) {
      return res.status(401).json({
        message: "Incorrect username or password",
      });
    }
    req.user = user;
    return res.status(200).json({ user: user });
  } catch (err) {
    console.log("Couldn't find user", err);
    return res.status(500).json({
      message: "Couldn't find user",
    });
  }
});

exports.get_user = asyncHandler(async (req, res, next) => {
  try {
    const user = await models.User.findOne({
      where: { id: req.params.id },
    });
    if (!user) {
      return res.status(401).json({
        message: "User not found",
      });
    }
    // req.user = user;
    return res.status(200).json({ user });
  } catch (err) {
    console.log("Couldn't find user", err);
    return res.status(500).json({
      message: "Couldn't find user",
    });
  }
});
