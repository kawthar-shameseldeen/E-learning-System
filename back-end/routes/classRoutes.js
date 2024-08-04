import express from "express";
import {
  createClass,
  getClasses,
  getClassById,
  updateClass,
  deleteClass,
} from "../controllers/classController.js";

const router = express.Router();

router.post("/classes", createClass);
router.get("/classes", getClasses);
router.get("/classes/:id", getClassById);
router.put("/classes/:id", updateClass);
router.delete("/classes/:id", deleteClass);

export default router;
