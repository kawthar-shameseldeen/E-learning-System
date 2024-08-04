import Drop from "../models/dropModel.js";
import User from '../models/userModel.js'; 
import Class from "../models/classModel.js";

export const createDropRequest = async (req, res) => {
  const { student, class: classId, reason } = req.body;

  try {
    const studentExists = await User.findById(student);
    if (!studentExists) {
      return res.status(404).json({ message: "Student not found" });
    }

    const classExists = await Class.findById(classId);
    if (!classExists) {
      return res.status(404).json({ message: "Class not found" });
    }

    const newDropRequest = new Drop({
      student,
      class: classId,
      reason,
    });

    await newDropRequest.save();
    res
      .status(201)
      .json({
        message: "Drop request created successfully",
        drop: newDropRequest,
      });
  } catch (error) {
    console.error("Error creating drop request:", error);
    res.status(500).json({ message: "Server error", error: error.message });
  }
};

export const getDropRequests = async (req, res) => {
  try {
    const dropRequests = await Drop.find()
      .populate("student", "name email")
      .populate("class", "title description")
      .populate("reviewedBy", "name email");
    res.status(200).json(dropRequests);
  } catch (error) {
    console.error("Error fetching drop requests:", error);
    res.status(500).json({ message: "Server error", error: error.message });
  }
};

export const getDropRequestById = async (req, res) => {
  const { id } = req.params;

  try {
    const dropRequest = await Drop.findById(id)
      .populate("student", "name email")
      .populate("class", "title description")
      .populate("reviewedBy", "name email");
    if (!dropRequest) {
      return res.status(404).json({ message: "Drop request not found" });
    }
    res.status(200).json(dropRequest);
  } catch (error) {
    console.error("Error fetching drop request:", error);
    res.status(500).json({ message: "Server error", error: error.message });
  }
};

export const updateDropRequest = async (req, res) => {
  const { id } = req.params;
  const { status, reviewedBy } = req.body;

  try {
    const reviewerExists = await User.findById(reviewedBy);
    if (!reviewerExists) {
      return res.status(404).json({ message: "Reviewer not found" });
    }

    const updatedDropRequest = await Drop.findByIdAndUpdate(
      id,
      { status, reviewedBy, reviewedAt: Date.now() },
      { new: true, runValidators: true }
    );
    if (!updatedDropRequest) {
      return res.status(404).json({ message: "Drop request not found" });
    }
    res
      .status(200)
      .json({
        message: "Drop request updated successfully",
        drop: updatedDropRequest,
      });
  } catch (error) {
    console.error("Error updating drop request:", error);
    res.status(500).json({ message: "Server error", error: error.message });
  }
};

export const deleteDropRequest = async (req, res) => {
  const { id } = req.params;

  try {
    const deletedDropRequest = await Drop.findByIdAndDelete(id);
    if (!deletedDropRequest) {
      return res.status(404).json({ message: "Drop request not found" });
    }
    res.status(200).json({ message: "Drop request deleted successfully" });
  } catch (error) {
    console.error("Error deleting drop request:", error);
    res.status(500).json({ message: "Server error", error: error.message });
  }
};
