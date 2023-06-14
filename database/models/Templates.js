import mongoose from "mongoose";

const { Schema } = mongoose;

const templateSchema = new Schema({
  name: String,
  focus: String,
  frequency: Number,
});

const Template =
  mongoose.models.Template || mongoose.model("Template", templateSchema);

export default Template;
