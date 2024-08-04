import File from "../models/fileModel.js";
import User from "../models/userModel.js";
import Class from "../models/classModel.js";
import fs from "fs";


export const uploadFile = async (req, res) => {
  const { name, uploadedBy, class: classId } = req.body;
  const filePath = req.file.path;

  try {
    const userExists = await User.findById(uploadedBy);
    if (!userExists) {
      fs.unlinkSync(filePath);
      return res.status(404).json({ message: "User not found" });
    }

    if (classId) {
      const classExists = await Class.findById(classId);
      if (!classExists) {
        fs.unlinkSync(filePath);
        return res.status(404).json({ message: "Class not found" });
      }
    }

    const newFile = new File({
      name,
      path: filePath,
      uploadedBy,
      class: classId,
    });

    await newFile.save();
    res
      .status(201)
      .json({ message: "File uploaded successfully", file: newFile });
  } catch (error) {
    console.error("Error uploading file:", error);

    fs.unlinkSync(filePath);
    res.status(500).json({ message: "Server error", error: error.message });
  }
};

export const getFiles = async (req, res) => {
  try {
    const files = await File.find()
      .populate("uploadedBy", "name email")
      .populate("class", "title description");
    res.status(200).json(files);
  } catch (error) {
    console.error("Error fetching files:", error);
    res.status(500).json({ message: "Server error", error: error.message });
  }
};

export const getFileById = async (req, res) => {
  const { id } = req.params;

  try {
    const file = await File.findById(id)
      .populate("uploadedBy", "name email")
      .populate("class", "title description");
    if (!file) {
      return res.status(404).json({ message: "File not found" });
    }
    res.status(200).json(file);
  } catch (error) {
    console.error("Error fetching file:", error);
    res.status(500).json({ message: "Server error", error: error.message });
  }
};

export const updateFile = async (req, res) => {
  const { id } = req.params;
  const { name, uploadedBy, class: classId } = req.body;

  try {
    const userExists = await User.findById(uploadedBy);
    if (!userExists) {
      return res.status(404).json({ message: "User not found" });
    }

    if (classId) {
      const classExists = await Class.findById(classId);
      if (!classExists) {
        return res.status(404).json({ message: "Class not found" });
      }
    }

    const updatedFile = await File.findByIdAndUpdate(
      id,
      { name, uploadedBy, class: classId },
      { new: true, runValidators: true }
    );
    if (!updatedFile) {
      return res.status(404).json({ message: "File not found" });
    }
    res
      .status(200)
      .json({ message: "File updated successfully", file: updatedFile });
  } catch (error) {
    console.error("Error updating file:", error);
    res.status(500).json({ message: "Server error", error: error.message });
  }
};

export const deleteFile = async (req, res) => {
  const { id } = req.params;

  try {
    const file = await File.findByIdAndDelete(id);
    if (!file) {
      return res.status(404).json({ message: "File not found" });
    }

    fs.unlinkSync(file.path);
    res.status(200).json({ message: "File deleted successfully" });
  } catch (error) {
    console.error("Error deleting file:", error);
    res.status(500).json({ message: "Server error", error: error.message });
  }
};
