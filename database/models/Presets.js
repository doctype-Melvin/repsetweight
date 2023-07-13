import mongoose from "mongoose";

const { Schema } = mongoose;

const presetSchema = new Schema({
  name: String,
  focus: String,
  routine: Array,
  description: String,
  duration: Number,
  mode: String,
  level: String,
  increments: Object,
  exercises: Array,
  mutable: Boolean,
  isCurrent: Boolean,
});

const Preset = mongoose.models.Preset || mongoose.model("Preset", presetSchema);

export default Preset;
