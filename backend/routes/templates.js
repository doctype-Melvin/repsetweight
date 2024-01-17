const express = require("express");
const router = express.Router();

const templatesController = require("../controllers/templatesController");

router.get(
  "/all",
  (req, res, next) => {
    if (!req.isAuthenticated()) {
      return res.status(401).json({ message: "Unauthorized" });
    }
    next();
  },
  templatesController.get_templates
);

module.exports = router;
