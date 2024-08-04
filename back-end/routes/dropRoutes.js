import express from "express";
import {
  createDropRequest,
  getDropRequests,
  getDropRequestById,
  updateDropRequest,
  deleteDropRequest,
} from "../controllers/dropController.js";

const router = express.Router();

router.post("/drops", createDropRequest);
router.get("/drops", getDropRequests);
router.get("/drops/:id", getDropRequestById);
router.put("/drops/:id", updateDropRequest);
router.delete("/drops/:id", deleteDropRequest);

export default router;
