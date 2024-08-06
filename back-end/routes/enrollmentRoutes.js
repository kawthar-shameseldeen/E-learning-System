import express from "express";
import {
  createEnrollment,
  getEnrollments,
  getEnrollmentById,
  updateEnrollment,
  deleteEnrollment,
  getEnrollmentsByStudentId,
} from "../controllers/enrollmentController.js";

const router = express.Router();

router.post("/enrollments", createEnrollment);
router.get("/enrollments", getEnrollments);
router.get("/enrollments/:id", getEnrollmentById);
router.put("/enrollments/:id", updateEnrollment);
router.delete("/enrollments/:id", deleteEnrollment);
router.get("/student/:studentId", getEnrollmentsByStudentId);

export default router;
