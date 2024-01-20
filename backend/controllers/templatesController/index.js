const asyncHandler = require("express-async-handler");
const { models, sequelize } = require("../../database/dbConnect");
const passport = require("passport");

exports.get_templates = asyncHandler(async (req, res, next) => {
  const allTemplates = await models.Template.findAll();

  if (!allTemplates) {
    res.status(404).json({ message: "No templates found" });
  }
  res.status(200).json({ data: allTemplates });
});

exports.get_template_detail = asyncHandler(async (req, res, next) => {
  const template = await models.Template.findOne({
    where: { template_id: req.params.id },
  });

  if (!template) {
    res.status(404).json({ message: "No template found" });
  }
  res.status(200).json({ data: template });
});

exports.post_template = asyncHandler(async (req, res, next) => {
  res.status(200).json({ message: "Post new template" });
});
