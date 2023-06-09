import mongoose from "mongoose";

const { Schema } = mongoose;

const exerciseSchema = new Schema({
    name: String,
    force: String,
    equipment: String,
    primaryMuscles: Array,
    secondaryMuscles: Array,
    category: String,
})

const Exercise = mongoose.models.Exercise || mongoose.model("Exercise", exerciseSchema)

export default Exercise;