import React, { useEffect } from "react";
import { useParams, Link } from "react-router-dom";
import { useCourses } from "../../context/CourseContext";
import { useEnrollment } from "../../context/EnrollmentContext";
import { useUser } from "../../context/UserContext";

const ViewCourse = () => {
  const { courseId } = useParams();
  const { enrollInCourse } = useEnrollment();
  const { user } = useUser();
  // console.log("User context:", user);
  const {
    course,
    courses,
    loading,
    getCourseById,
    fetchCourses,
    deleteCourse,
  } = useCourses();

  useEffect(() => {
    if (courseId) getCourseById(courseId);
  }, [courseId]);

  useEffect(() => {
    fetchCourses();
  }, []);

  if (loading) return <div>Loading course...</div>;
  if (!course) return <p>No course found.</p>;

  const handleDelete = async (id) => {
    await deleteCourse(id);
  };

  const handleEnroll = async () => {
    if (!user) {
      alert("You must be logged in to enroll.");
      return;
    }

    try {
      const result = await enrollInCourse(user.id, course._id);
      if (result) {
        alert("Enrolled successfully!");
      } else {
        alert("Enrollment failed. Check console.");
      }
    } catch (err) {
      console.error(err);
      alert("Error during enrollment.");
    }
  };

  return (
    <div className="container my-4">
      <div className="row p-3">
        {course.thumbnail && (
          <img
            src={course.thumbnail}
            alt={course.title}
            className="mb-3 img-thumbnail opacity-75"
            style={{ maxHeight: "250px", objectFit: "cover" }}
          />
        )}

        <div className="row">
          {/* LEFT SECTION */}
          <div className="col-md-7 mt-3">
            <h1><b>{course.title}</b></h1>
            <p>{course.subtitle}</p>

            <h4 className="fw-bold">Course Structure</h4>
            {course.chapters?.length > 0 && (
              <div className="accordion" id="chaptersAccordion">
                {course.chapters.map((chapter, chapterIndex) => (
                  <div className="accordion-item border-2" key={chapterIndex}>
                    <h2 className="accordion-header" id={`heading${chapterIndex}`}>
                      <button
                        className="accordion-button collapsed py-3"
                        type="button"
                        data-bs-toggle="collapse"
                        data-bs-target={`#collapse${chapterIndex}`}
                        aria-expanded="false"
                        aria-controls={`collapse${chapterIndex}`}
                      >
                        {chapter.title}
                      </button>
                      <hr className="p-0 m-0" />
                    </h2>
                    <div
                      id={`collapse${chapterIndex}`}
                      className="accordion-collapse collapse"
                      aria-labelledby={`heading${chapterIndex}`}
                      data-bs-parent="#chaptersAccordion"
                    >
                      <div className="accordion-body py-0">
                        {chapter.lectures?.length > 0 ? (
                          <ul className="list-group py-2">
                            {chapter.lectures.map((lecture, lectureIndex) => (
                              <li
                                key={lectureIndex}
                                className="list-group-item d-flex flex-row justify-content-between border-0 p-0"
                              >
                                <p><strong>{lecture.title}</strong></p>
                                <p className="d-flex gap-2">
                                  <a
                                    href={lecture.url}
                                    target="_blank"
                                    rel="noopener noreferrer"
                                  >
                                    Preview
                                  </a>
                                  <small>{lecture.duration} min</small>
                                </p>
                              </li>
                            ))}
                          </ul>
                        ) : (
                          <p>No lectures available</p>
                        )}
                      </div>
                    </div>
                  </div>
                ))}
              </div>
            )}

            <h4><strong>Course Description:</strong></h4>
            <p>{course.description}</p>

            <div className="related">
              <h4 className="fw-bold">Related Courses</h4>
              {courses
                .filter((cou) => cou.category === course.category && cou._id !== course._id)
                .map((cou) => (
                  <p key={cou._id}>{cou.title}</p>
                ))}
            </div>
          </div>

          {/* RIGHT SECTION */}
          <div className="col-md-5 mt-3 d-flex align-items-start justify-content-center">
            <div className="col-md-9 card">
              {course.thumbnail && (
                <img
                  src={course.thumbnail}
                  alt={course.title}
                  className="mb-3 p-0 m-0"
                  style={{ maxHeight: "250px", objectFit: "cover" }}
                />
              )}
              <div className="p-4">
                <p><strong>Price:</strong> ₹{course.price} (Discount: {course.discount}%)</p>
                <p><strong>Category:</strong> {course.category}</p>
                <p><strong>Level:</strong> {course.level}</p>

                {user?.role === "user" ? (
                  <button className="btn btn-success" onClick={handleEnroll}>
                    Enroll
                  </button>
                ) : user?.role === "admin" ? (
                  <div className="d-flex">
                    <Link
                      to={`/edit/${course._id}`}
                      className="btn btn-primary btn-sm me-2 w-50 text-white text-decoration-none"
                    >
                      Edit
                    </Link>
                    <button
                      className="btn btn-danger btn-sm w-50"
                      onClick={() => handleDelete(course._id)}
                    >
                      Delete
                    </button>
                  </div>
                ) : (
                  <p className="text-muted">Login to enroll or manage this course.</p>
                )}

                <br />

                {course.keypoints?.length > 0 && (
                  <>
                    <h5>Key Points:</h5>
                    <ul>
                      {course.keypoints.map((point, i) => (
                        <li key={i}>{point}</li>
                      ))}
                    </ul>
                  </>
                )}
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default ViewCourse;