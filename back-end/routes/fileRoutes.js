import express from "express";
import multer from "multer";
import {
  uploadFile,
  getFiles,
  getFileById,
  updateFile,
  deleteFile,
} from "../controllers/fileController.js";

const router = express.Router();

const storage = multer.diskStorage({
  destination: (req, file, cb) => {
    cb(null, "uploads/");
  },
  filename: (req, file, cb) => {
    cb(null, `${Date.now()}-${file.originalname}`);
  },
});
const upload = multer({ storage });

router.post("/files", upload.single("file"), uploadFile);
router.get("/files", getFiles);
router.get("/files/:id", getFileById);
router.put("/files/:id", updateFile);
router.delete("/files/:id", deleteFile);

export default router;
