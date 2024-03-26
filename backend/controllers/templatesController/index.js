const asyncHandler = require("express-async-handler");
const { models, sequelize } = require("../../database/dbConnect");
const { lookUpExercise } = require("../../middleware");

exports.get_templates = asyncHandler(async (req, res, next) => {
  const data = await models.Template.findAll();

  if (!data) {
    res.status(404).json({ message: "No templates found" });
  }
  res.status(200).json(data);
});

exports.get_template_detail = asyncHandler(async (req, res, next) => {
  const data = await models.Template.findOne({
    where: { id: req.params.id },
  });

  if (!data) {
    res.status(404).json({ message: "No template found" });
  }
  res.status(200).json(data);
});

exports.post_template = asyncHandler(async (req, res, next) => {
  res.status(200).json({ message: "Post new template" });
});

exports.get_sessions = asyncHandler(async (req, res, next) => {
  try {
    const data = await models.TemplateSession.findAll({
      where: { template_id: req.params.id },
    });

    if (!data) {
      res.status(404).json({ message: "No sessions found" });
    } else {
      const dataJSON = data.map((session) => session.toJSON());

      res.status(200).json(dataJSON);
    }
  } catch (error) {
    res.status(500).json({ message: "Error fetching sessions" });
  }
});
