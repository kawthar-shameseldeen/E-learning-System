import express from "express";
import {
  createClass,
  getClasses,
  getClassById,
  updateClass,
  deleteClass,
  getClassesByInstructorId
} from "../controllers/classController.js";
import { protect } from "../utils/authMiddleware.js";
import { admin } from "../utils/authMiddleware.js";
const router = express.Router();

router.post("/classes", protect, createClass);
router.get("/classes", getClasses);
router.get("/classes/:id", getClassById);
router.put("/classes/:id", updateClass);
router.delete("/classes/:id", deleteClass);
router.get("/classes/instructor/:id", protect, admin, getClassesByInstructorId);
export default router;
