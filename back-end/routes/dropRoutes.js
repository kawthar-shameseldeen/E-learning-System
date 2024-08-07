import express from "express";
import {
  createDropRequest,
  getDropRequests,
  getDropRequestById,
  updateDropRequest,
  deleteDropRequest,
  approveDropRequest,
  rejectDropRequest,
} from "../controllers/dropController.js";

const router = express.Router();
import { protect, admin } from "../utils/authMiddleware.js";
router.post("/drops", createDropRequest);
router.get("/drops", getDropRequests);
router.get("/drops/:id", getDropRequestById);
router.put("/drops/:id", updateDropRequest);
router.delete("/drops/:id", deleteDropRequest);
router.put("/drops/approve/:id", protect, admin, approveDropRequest);
router.put("/drops/reject/:id", protect, admin, rejectDropRequest);

export default router;
