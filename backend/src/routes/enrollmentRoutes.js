import express from "express";
import {
  enrollStudent,
  getStudentEnrollments,
  updateProgress,
  markCompleted,
} from "../controllers/enrollmentController.js";

const router = express.Router();

router.post("/enroll", enrollStudent);
router.get("/student/:studentId", getStudentEnrollments);
router.put("/:enrollmentId/progress", updateProgress);
router.put("/:enrollmentId/complete", markCompleted);

export default router;