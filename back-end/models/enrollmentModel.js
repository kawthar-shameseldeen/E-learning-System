import mongoose from "mongoose";
const Schema = mongoose.Schema;

const enrollmentSchema = new mongoose.Schema({
  student: {
    type: mongoose.Schema.Types.ObjectId,
    ref: "User",
    required: true,
  },
  class: {
    type: mongoose.Schema.Types.ObjectId,
    ref: "Class",
    required: true,
  },
  enrolledAt: {
    type: Date,
    default: Date.now,
  },
});

const Enroll = mongoose.model("Enrollment", enrollmentSchema);

export default Enroll;
