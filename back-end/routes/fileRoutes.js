import express from "express";
import {
  uploadFile,
  handleFileUpload,
  getAllUploads,
  getUploadsByClass,
} from "../controllers/fileController.js";
import { protect } from "../utils/authMiddleware.js";
import { admin } from "../utils/authMiddleware.js";

const router = express.Router();

router.post("/files", protect, admin, uploadFile, handleFileUpload);
router.get("/files", protect, admin, getAllUploads);
router.get("/files/class/:classId", getUploadsByClass);

export default router;
