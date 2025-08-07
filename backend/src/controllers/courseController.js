import Course from "../models/courseModel.js";

const addCourse = async (req, res) => {
    try {
        console.log("BODY:", req.body);
        console.log("FILE:", req.file);

        const {
            title, subtitle, description,
            keypoints, price, discount, category, level
        } = req.body;

        const serverBaseUrl = `${req.protocol}://${req.get("host")}`;
        const thumbnailPath = req.file ? `${serverBaseUrl}/uploads/courses/${req.file.filename}` : "";

        const course = new Course({
            title,
            subtitle,
            description,
            keypoints: keypoints.split(',').map(p => p.trim()),
            thumbnail: thumbnailPath,
            price,
            discount,
            category,
            level
        });

        await course.save();

        res.status(201).json({ message: 'Course added successfully', course });
    } catch (error) {
        console.error("Add Course Error:", error);
        res.status(500).json({ message: 'Error adding course', error: error.message });
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


export default { addCourse, listCourse };
