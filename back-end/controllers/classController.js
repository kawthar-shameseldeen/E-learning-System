import Class from "../models/classModel.js";
import User from "../models/userModel.js";

export const createClass = async (req, res) => {
  const { title, description, instructor } = req.body;

  try {
    const instructorExists = await User.findById(instructor);
    if (!instructorExists) {
      return res.status(404).json({ message: "Instructor not found" });
    }

    const newClass = new Class({
      title,
      description,
      instructor,
    });

    await newClass.save();
    res
      .status(201)
      .json({ message: "Class created successfully", class: newClass });
  } catch (error) {
    console.error("Error creating class:", error);
    res.status(500).json({ message: "Server error", error: error.message });
  }
};

export const getClasses = async (req, res) => {
  try {
    const classes = await Class.find().populate("instructor", "name email");
    res.status(200).json(classes);
  } catch (error) {
    console.error("Error fetching classes:", error);
    res.status(500).json({ message: "Server error", error: error.message });
  }
};

export const getClassById = async (req, res) => {
  const { id } = req.params;

  try {
    const classItem = await Class.findById(id).populate(
      "instructor",
      "name email"
    );
    if (!classItem) {
      return res.status(404).json({ message: "Class not found" });
    }
    res.status(200).json(classItem);
  } catch (error) {
    console.error("Error fetching class:", error);
    res.status(500).json({ message: "Server error", error: error.message });
  }
};

export const updateClass = async (req, res) => {
  const { id } = req.params;
  const { title, description, instructor } = req.body;

  try {
    const instructorExists = await User.findById(instructor);
    if (!instructorExists) {
      return res.status(404).json({ message: "Instructor not found" });
    }

    const updatedClass = await Class.findByIdAndUpdate(
      id,
      { title, description, instructor },
      { new: true, runValidators: true }
    );
    if (!updatedClass) {
      return res.status(404).json({ message: "Class not found" });
    }
    res
      .status(200)
      .json({ message: "Class updated successfully", class: updatedClass });
  } catch (error) {
    console.error("Error updating class:", error);
    res.status(500).json({ message: "Server error", error: error.message });
  }
};

export const deleteClass = async (req, res) => {
  const { id } = req.params;

  try {
    const deletedClass = await Class.findByIdAndDelete(id);
    if (!deletedClass) {
      return res.status(404).json({ message: "Class not found" });
    }
    res.status(200).json({ message: "Class deleted successfully" });
  } catch (error) {
    console.error("Error deleting class:", error);
    res.status(500).json({ message: "Server error", error: error.message });
  }
};

export const getClassesByInstructorId = async (req, res) => {
  try {
    const classes = await Class.find({ instructor: req.params.id });
    res.status(200).json(classes);
  } catch (error) {
    console.error("Error fetching classes by instructor ID:", error);
    res.status(500).json({ message: "Server error", error: error.message });
  }
};
