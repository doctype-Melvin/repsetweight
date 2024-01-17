const asyncHandler = require("express-async-handler");
const { models, sequelize } = require("../../database/dbConnect");

exports.get_templates = asyncHandler(async (req, res, next) => {
  // Only find preset and user's private templates
  const allTemplates = await models.Template.findAll();

  if (!allTemplates) {
    res.status(404).json({ message: "No templates found" });
  }
  res.status(200).json({ data: allTemplates });
});

exports.get_template_detail = asyncHandler(async (req, res, next) => {
  const template = await models.Template.findOne({
    where: { id: req.params.id },
  });

  if (!template) {
    res.status(404).json({ message: "No template found" });
  }
  res.status(200).json({ data: template });
});
