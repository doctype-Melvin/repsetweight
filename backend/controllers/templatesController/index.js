const asyncHandler = require("express-async-handler");
const { models, sequelize } = require("../../database/dbConnect");

exports.get_templates = asyncHandler(async (req, res, next) => {
  const allTemplates = await models.Template.findAll();

  if (!allTemplates) {
    res.status(404).json({ message: "No templates found" });
  }
  res.status(200).json({ data: allTemplates });
});
