import express from "express";
import upload from "../middlewares/uploadMiddleware.js";
import courseController from "../controllers/courseController.js";

const router = express.Router();

router.post("/addcourse", upload.single("thumbnail"), courseController.addCourse);
router.get("/listcourse",courseController.listCourse);
router.delete("/deletecourse/:id",courseController.deleteCourse);
router.put("/editcourse/:id", upload.single("thumbnail"), courseController.editCourse);
router.get("/course/:id", courseController.getCourseById);

export default router;
