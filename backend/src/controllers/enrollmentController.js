import Enrollment from "../models/enrollmentModel.js";

export const enrollStudent = async (req, res) => {
  try {
    const { studentId, courseId } = req.body;
    if (!studentId || !courseId) return res.status(400).json({ message: "Missing studentId or courseId" });

    const existing = await Enrollment.findOne({ student: studentId, course: courseId });
    if (existing) return res.status(400).json({ message: "Already enrolled" });

    const enrollment = new Enrollment({ student: studentId, course: courseId });
    await enrollment.save();
    res.status(201).json(enrollment);
  } catch (err) {
    res.status(500).json({ message: "Enrollment failed", error: err.message });
  }
};

export const getStudentEnrollments = async (req, res) => {
  try {
    const enrollments = await Enrollment.find({ student: req.params.studentId }).populate("course");
    res.json(enrollments);
  } catch (err) {
    res.status(500).json({ error: err.message });
  }
};

export const updateProgress = async (req, res) => {
  try {
    const { completedLectures, percentage } = req.body;
    const updated = await Enrollment.findByIdAndUpdate(
      req.params.enrollmentId,
      { "progress.completedLectures": completedLectures, "progress.percentage": percentage },
      { new: true }
    );
    res.json(updated);
  } catch (err) {
    res.status(500).json({ error: err.message });
  }
};

export const markCompleted = async (req, res) => {
  try {
    const updated = await Enrollment.findByIdAndUpdate(
      req.params.enrollmentId,
      { status: "completed", "progress.percentage": 100 },
      { new: true }
    );
    res.json(updated);
  } catch (err) {
    res.status(500).json({ error: err.message });
  }
};