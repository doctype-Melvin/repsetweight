const { sequelize } = require("../../database/dbConnect");
const asyncHandler = require("express-async-handler");

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
