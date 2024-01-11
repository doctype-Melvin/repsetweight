const { sequelize } = require("../dbConnect");
const asyncHandler = require("express-async-handler");

exports.index = asyncHandler(async (req, res) => {
  try {
    await sequelize.authenticate();
    console.log("Connection has been established successfully.");
  } catch (error) {
    console.log("Unable to connect to the database:", error);
  }
});
