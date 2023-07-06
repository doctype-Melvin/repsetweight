import mongoose from "mongoose";

const { Schema } = mongoose;

const templateSchema = new Schema({
  name: String,
  focus: String,
  routine: Array,
  description: String,
  duration: Number,
  mode: String,
  level: String,
  increments: Object,
  exercises: Array,
});

const Template =
  mongoose.models.Template || mongoose.model("Template", templateSchema);

export default Template;
