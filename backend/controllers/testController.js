const asyncHandler = require("express-async-handler");
const { models } = require("../models/dbConnect");

exports.index = asyncHandler(async (req, res) => {
  try {
    const users = await models.user.findAll();
    console.log("BE: DB Connection success!");
    res.json(users);
  } catch (error) {
    console.log("Unable to connect to the database:", error);
    return;
  }
});
