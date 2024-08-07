import Upload from "../models/fileModel.js";
import multer from "multer";
import path from "path";

const storage = multer.diskStorage({
  destination: "uploads/", 
  filename: (req, file, cb) => {
    cb(null, file.originalname); 
  },
});

const upload = multer({ storage: storage });

export const uploadFile = upload.single("file");

export const handleFileUpload = async (req, res) => {
  if (!req.file) {
    return res.status(400).json({ error: "No file uploaded" });
  }

  const { filename } = req.file;
  const filePath = path.join("uploads", filename).replace(/\\/g, "/"); 
  const uploadedBy = req.user._id;
  const { classId } = req.body;

  try {
    const newFile = new Upload({
      filename,
      path: filePath,
      uploadedBy,
      class: classId,
    });
    await newFile.save();
    res.status(201).json(newFile);
  } catch (error) {
    res.status(500).json({ error: error.message });
  }
};

export const getAllUploads = async (req, res) => {
  try {
    const files = await Upload.find()
      .populate("uploadedBy", "name email")
      .populate("class", "title");
    res.status(200).json(files);
  } catch (error) {
    res.status(500).json({ error: error.message });
  }
};

export const getUploadsByClass = async (req, res) => {
  const { classId } = req.params;

  try {
    const files = await Upload.find({ class: classId })
      .populate("uploadedBy", "name email")
      .populate("class", "title");
    res.status(200).json(files);
  } catch (error) {
    res.status(500).json({ error: error.message });
  }
};