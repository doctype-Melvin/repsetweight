const { sequelize } = require("../models/dbConnect");
const asyncHandler = require("express-async-handler");
const { models } = require("../models/dbConnect");

exports.index = asyncHandler(async (req, res) => {
  try {
    await sequelize.authenticate();
    const users = await models.user.findAll();
    console.log("BE: Connection has been established successfully.");
    res.json(users);
  } catch (error) {
    console.log("Unable to connect to the database:", error);
  }
});
