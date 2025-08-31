import { createContext, useContext, useState, useEffect } from "react";
import axios from "axios";
import { useUser } from "../context/UserContext";

const EnrollmentContext = createContext();

export function useEnrollment() {
  return useContext(EnrollmentContext);
}

export function EnrollmentProvider({ children }) {
  const [enrollments, setEnrollments] = useState([]);
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState("");
  const { user } = useUser();
  const API_URL = import.meta.env.VITE_API_URL;

  const fetchEnrollments = async () => {
    if (!user?._id) return;
    setLoading(true);
    try {
      const res = await axios.get(`${API_URL}/enrollments/student/${user._id}`);
      setEnrollments(res.data);
    } catch (err) {
      console.error("Failed to fetch enrollments:", err);
      setError(err.response?.data?.message || "Error fetching enrollments");
    } finally {
      setLoading(false);
    }
  };

  const enrollInCourse = async (studentId, courseId) => {
  if (!studentId || !courseId) {
    console.warn("Missing studentId or courseId", { studentId, courseId });
    return null;
  }

  try {
    const res = await axios.post(`${API_URL}/enrollments/enroll`, {
      studentId, // ✅ directly use _id passed in
      courseId,
    });
    setEnrollments((prev) => [...prev, res.data]);
    return res.data;
  } catch (err) {
    console.error("Enrollment failed:", err.response?.data || err.message);
    return null;
  }
};

  const updateProgress = async (enrollmentId, completedLectures, percentage) => {
    try {
      const res = await axios.put(
        `${API_URL}/enrollments/${enrollmentId}/progress`,
        { completedLectures, percentage }
      );
      setEnrollments((prev) =>
        prev.map((e) => (e._id === enrollmentId ? res.data : e))
      );
    } catch (err) {
      console.error("Progress update failed:", err);
      setError(err.response?.data?.message || "Progress update failed");
    }
  };

  const markCompleted = async (enrollmentId) => {
    try {
      const res = await axios.put(`${API_URL}/enrollments/${enrollmentId}/complete`);
      setEnrollments((prev) =>
        prev.map((e) => (e._id === enrollmentId ? res.data : e))
      );
    } catch (err) {
      console.error("Completion failed:", err);
      setError(err.response?.data?.message || "Completion failed");
    }
  };

  useEffect(() => {
    fetchEnrollments();
  }, [user?._id]);

  return (
    <EnrollmentContext.Provider
      value={{
        enrollments,
        loading,
        error,
        fetchEnrollments, // ✅ expose this so UI can refresh
        enrollInCourse,
        updateProgress,
        markCompleted,
      }}
    >
      {children}
    </EnrollmentContext.Provider>
  );
}
