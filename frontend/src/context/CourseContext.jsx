import { createContext, useContext, useState, useEffect } from "react";
import axios from "axios";

const CourseContext = createContext();

export const useCourses = () => useContext(CourseContext);

export const CourseProvider = ({ children }) => {
  const [courses, setCourses] = useState([]);
  const [course, setCourse] = useState(null);
  const [loading, setLoading] = useState(false);

  const API_URL = import.meta.env.VITE_API_URL;

  const fetchCourses = async () => {
    try {
      setLoading(true);
      const res = await axios.get(`${API_URL}/course/listcourse`);
      setCourses(res.data);
    } catch (err) {
      console.error("Error fetching courses:", err);
    } finally {
      setLoading(false);
    }
  };

  const getCourseById = async (id) => {
    try {
      setLoading(true);
      const res = await axios.get(`${API_URL}/course/course/${id}`);
      setCourse(res.data);
      return res.data;
    } catch (err) {
      console.error("Error fetching course by ID:", err);
    } finally {
      setLoading(false);
    }
  };

  const addCourse = async (courseData) => {
    try {
      const formData = new FormData();
      for (let key in courseData) {
        formData.append(key, courseData[key]);
      }
      const res = await axios.post(`${API_URL}/course/addcourse`, formData, {
        headers: { "Content-Type": "multipart/form-data" },
      });
      fetchCourses();
      return res.data;
    } catch (err) {
      console.error("Error adding course:", err);
    }
  };

  const editCourse = async (id, courseData) => {
    try {
      const formData = new FormData();
      for (let key in courseData) {
        formData.append(key, courseData[key]);
      }
      const res = await axios.put(`${API_URL}/course/editcourse/${id}`, formData, {
        headers: { "Content-Type": "multipart/form-data" },
      });
      fetchCourses();
      return res.data;
    } catch (err) {
      console.error("Error editing course:", err);
    }
  };

  const deleteCourse = async (id) => {
    try {
      await axios.delete(`${API_URL}/course/deletecourse/${id}`); // ✅ fixed
      setCourses(courses.filter((c) => c._id !== id));
    } catch (err) {
      console.error("Error deleting course:", err);
    }
  };

  useEffect(() => {
    fetchCourses();
  }, []);

  return (
    <CourseContext.Provider
      value={{
        courses,
        course,
        loading,
        fetchCourses,
        addCourse,
        editCourse,
        deleteCourse,
        getCourseById,
      }}
    >
      {children}
    </CourseContext.Provider>
  );
};
