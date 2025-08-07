import express from "express";
import upload from "../middlewares/uploadMiddleware.js";
import courseController from "../controllers/courseController.js";

const router = express.Router();

router.post("/addcourse", upload.single("thumbnail"), courseController.addCourse);
router.get("/listcourse",courseController.listCourse);

export default router;
