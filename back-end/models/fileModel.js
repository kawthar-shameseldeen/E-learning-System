import mongoose from "mongoose";

const fileSchema = new mongoose.Schema({
  name: {
    type: String,
    required: true,
  },
  path: {
    type: String,
    required: true,
  },
  uploadedBy: {
    type: mongoose.Schema.Types.ObjectId,
    ref: "User",
    required: true,
  },
  class: {
    type: mongoose.Schema.Types.ObjectId,
    ref: "Class",
  },
  uploadedAt: {
    type: Date,
    default: Date.now,
  },
});
const File = mongoose.model("File", fileSchema);

export default File;
