import Course from "../models/courseModel.js";
import cloudinary from "../config/cloudinary.js";

const addCourse = async (req, res) => {
    try {
        const {
            title,
            subtitle,
            description,
            keypoints,
            price,
            discount,
            category,
            level,
            chapters
        } = req.body;

        let thumbnailUrl = "";

        if (req.file) {
            thumbnailUrl = await new Promise((resolve, reject) => {
                const stream = cloudinary.uploader.upload_stream(
                    { folder: "lms/courses", resource_type: "image" },
                    (error, result) => {
                        if (error) return reject(error);
                        resolve(result.secure_url);
                    }
                );
                stream.end(req.file.buffer);
            });
        }

        const keypointsArray = keypoints
            ? keypoints.split(",").map(p => p.trim())
            : [];

        let parsedChapters = [];
        if (chapters) {
            try {
                parsedChapters = JSON.parse(chapters);
            } catch (err) {
                return res.status(400).json({ message: "Invalid chapters format. Must be valid JSON." });
            }
        }

        const course = new Course({
            title,
            subtitle,
            description,
            keypoints: keypointsArray,
            thumbnail: thumbnailUrl,
            price,
            discount,
            category,
            level,
            chapters: parsedChapters
        });

        await course.save();

        res.status(201).json({ message: "Course added successfully", course });

    } catch (error) {
        console.error("Add Course Error:", error);
        res.status(500).json({ message: "Error adding course", error: error.message });
    }
};

const listCourse = async(req, res) => {
    try {
        const courses = await Course.find();
        res.status(200).json(courses);
    } catch (error) {
        res.status(500).json({ message: "Error fetching courses", error: error.message });
    }
}

const getCourseById = async (req, res) => {
  try {
    const courseId = req.params.id;
    const course = await Course.findById(courseId);
    if (!course) return res.status(404).json({ message: "Course not found" });
    res.status(200).json(course);
  } catch (error) {
    res.status(500).json({ message: "Failed to get course", error: error.message });
  }
};

const deleteCourse = async(req, res) => {
    try{
        const courseId = req.params.id;
        const deletecourse = await Course.findByIdAndDelete(courseId);
        if(!deletecourse){
            return res.status(404).json({ message: "Course not found" });
        }
        res.status(200).json({ message: "Course deleted successfully" });
        console.log("course deleted ");
    }catch (error) {
        res.status(500).json({ message: "Server Error", error: error.message });
    }
}

const editCourse = async (req, res) => {
  try {
    const courseId = req.params.id;

    const {
      title,
      subtitle,
      description,
      keypoints,
      price,
      discount,
      category,
      level,
      chapters
    } = req.body;

    const course = await Course.findById(courseId);
    if (!course) return res.status(404).json({ message: "Course not found" });

    let newThumbnailUrl = course.thumbnail || "";
    let newThumbnailPublicId = course.thumbnailPublicId || "";

    if (req.file) {
      // Upload new image to Cloudinary
      const uploadResult = await new Promise((resolve, reject) => {
        const stream = cloudinary.uploader.upload_stream(
          { folder: "lms/courses", resource_type: "image" },
          (error, result) => {
            if (error) return reject(error);
            resolve(result);
          }
        );
        stream.end(req.file.buffer);
      });

      newThumbnailUrl = uploadResult.secure_url;
      newThumbnailPublicId = uploadResult.public_id;

      // Delete old image from Cloudinary if exists
      if (course.thumbnailPublicId) {
        await cloudinary.uploader.destroy(course.thumbnailPublicId);
      }
    }

    const updatedData = {
      ...(title && { title }),
      ...(subtitle && { subtitle }),
      ...(description && { description }),
      ...(price && { price }),
      ...(discount && { discount }),
      ...(category && { category }),
      ...(level && { level }),
      ...(chapters && { chapters: JSON.parse(chapters) }),
      ...(keypoints && {
        keypoints: Array.isArray(keypoints)
          ? keypoints
          : keypoints.split(",").map((p) => p.trim()),
      }),
      thumbnail: newThumbnailUrl,
      thumbnailPublicId: newThumbnailPublicId,
    };

    const updatedCourse = await Course.findByIdAndUpdate(
      courseId,
      { $set: updatedData },
      { new: true, runValidators: true }
    );

    res.status(200).json({
      message: "Course updated successfully",
      course: updatedCourse,
    });
  } catch (error) {
    console.error("Edit Course Error:", error);
    res.status(500).json({
      message: "Error updating course",
      error: error.message,
    });
  }
};

export default { addCourse, listCourse, deleteCourse, editCourse, getCourseById };
