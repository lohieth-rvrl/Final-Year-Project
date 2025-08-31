import React, { useEffect, useState } from "react";
import { Link } from "react-router-dom";
import { useCourses } from "../../context/CourseContext";
import { useUser } from "../../context/UserContext";

export const CourseList = () => {
  const { user } = useUser();
  const { courses, loading, fetchCourses } = useCourses();

  const [filteredCourses, setFilteredCourses] = useState([]);
  const [filters, setFilters] = useState({
    search: "",
    level: "",
    category: "",
    price: "",
  });

  useEffect(() => {
    fetchCourses();
  }, []);

  useEffect(() => { 
    applyFilters(filters);
  }, [courses]);

  const handleFilterChange = (e) => {
    const { name, value } = e.target;
    const updatedFilters = { ...filters, [name]: value };
    setFilters(updatedFilters);
    applyFilters(updatedFilters);
  };

  const applyFilters = (currentFilters) => {
    let filtered = [...courses];

    if (currentFilters.search) {
      filtered = filtered.filter((course) =>
        course.title.toLowerCase().includes(currentFilters.search.toLowerCase())
      );
    }
    if (currentFilters.level) {
      filtered = filtered.filter(
        (course) =>
          course.level.toLowerCase() === currentFilters.level.toLowerCase()
      );
    }
    if (currentFilters.category) {
      filtered = filtered.filter(
        (course) =>
          course.category.toLowerCase() === currentFilters.category.toLowerCase()
      );
    }
    if (currentFilters.price) {
      filtered = filtered.filter((course) => {
        if (currentFilters.price === "free") return course.price === 0;
        if (currentFilters.price === "paid") return course.price > 0;
        return true;
      });
    }

    setFilteredCourses(filtered);
  };

  return (
    <div className="container my-3">
      {/* Filters */}
      <div className="card p-3 mb-3">
        <div className="row g-2">
          <div className="col-md-3">
            <input
              type="text"
              name="search"
              placeholder="Search courses..."
              className="form-control"
              value={filters.search}
              onChange={handleFilterChange}
            />
          </div>
          <div className="col-md-3">
            <select
              name="level"
              className="form-control"
              value={filters.level}
              onChange={handleFilterChange}
            >
              <option value="">All Levels</option>
              <option value="Beginner">Beginner</option>
              <option value="Intermediate">Intermediate</option>
              <option value="Advanced">Advanced</option>
            </select>
          </div>
          <div className="col-md-3">
            <select
              name="category"
              className="form-control"
              value={filters.category}
              onChange={handleFilterChange}
            >
              <option value="">All Categories</option>
              <option value="web-development">Web Development</option>
              <option value="data-science">Data Science</option>
              <option value="machine-learning">Machine Learning</option>
              <option value="mobile-development">Mobile Development</option>
              <option value="design">Design</option>
              <option value="marketing">Marketing</option>
              <option value="business">Business</option>
              <option value="other">Other</option>
            </select>
          </div>
          <div className="col-md-3">
            <select
              name="price"
              className="form-control"
              value={filters.price}
              onChange={handleFilterChange}
            >
              <option value="">All Prices</option>
              <option value="free">Free</option>
              <option value="paid">Paid</option>
            </select>
          </div>
        </div>
      </div>

      {/* Courses */}
      <div className="row">
        {loading ? (
          <p className="text-center">Loading courses...</p>
        ) : filteredCourses.length > 0 ? (
          filteredCourses.map((course) => (
            <div className="col-lg-3 col-md-4 col-sm-6 mb-4" key={course._id}>
              <div
                className="card h-100 shadow-sm"
                style={{
                  transition: "transform 0.2s",
                  cursor: "pointer",
                }}
                onMouseEnter={(e) =>
                  (e.currentTarget.style.transform = "scale(1.03)")
                }
                onMouseLeave={(e) =>
                  (e.currentTarget.style.transform = "scale(1)")
                }
              >
                {course.thumbnail && (
                  <img
                    src={course.thumbnail}
                    className="card-img-top"
                    alt={course.title || "Course Thumbnail"}
                    style={{ height: "150px", objectFit: "cover" }}
                  />
                )}
                <div className="card-body d-flex flex-column">
                  <b className="card-title m-0">{course.title}</b>
                  <p className="m-0">
                    Instructor: {course.instructor?.username || "Unknown"}
                  </p>
                  <div className="mt-auto">
                    {course.price === 0 ? (
                      <p className="text-success m-0">Free</p>
                    ) : (
                      <p className="m-0">
                        ₹{course.price} ({course.discount || 0}%)
                      </p>
                    )}
                    <strong>Level:</strong> {course.level}
                    <p>{course.category}</p>
                    {user?.role === "user" ? (
                      <Link
                        to={`/course/${course._id}`}
                        className="btn btn-primary btn-sm w-100"
                      >
                        Enroll
                      </Link>
                    ) : user?.role === "admin" ? (
                      <Link
                        to={`/course/${course._id}`}
                        className="btn btn-primary btn-sm w-100"
                      >
                        View
                      </Link>
                    ) : (
                      <p className="text-muted">Login to access</p>
                    )}
                  </div>
                </div>
              </div>
            </div>
          ))
        ) : (
          <p className="text-center">No courses found</p>
        )}
      </div>
    </div>
  );
};