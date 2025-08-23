import React, { useEffect, useState } from "react";
import { useParams } from "react-router-dom";
import { Link } from "react-router-dom";
import {CourseList} from "./CourseList";
import axios from "axios";

const ViewCourse = () => {
    const role = localStorage.getItem("role");
    const { courseId } = useParams();
    const [course, setCourse] = useState(null);
    const [courses, setCourses] = useState([]);
    const [loading, setLoading] = useState(true);

    useEffect(() => {
        fetch(`http://localhost:7001/api/course/course/${courseId}`)
            .then((res) => res.json())
            .then((data) => {
                setCourse(data);
                setLoading(false);
            })
            .catch(() => setLoading(false));
    }, [courseId]);

    useEffect(() => {
        const fetchCourses = async () => {
            try {
                const res = await axios.get("http://localhost:7001/api/course/listcourse");
                setCourses(res.data);
                setFilteredCourses(res.data);
            } catch (err) {
                console.error("Error fetching courses:", err);
            }
        };
        fetchCourses();
    }, []);

    if (loading) return <div>Loading course...</div>;
    if (!course) return <p>No course found.</p>;

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
                    <div className="col-md-7 mt-3">
                        <h1><b>{course.title}</b></h1>
                        <p>{course.subtitle}</p>
                        
                        <h4 className="fw-bold">Course Structure</h4>
                        {course.chapters?.length > 0 && (
                            <>
                                <div className="accordion" id="chaptersAccordion">
                                    {course.chapters.map((chapter, chapterIndex) => (
                                        <>
                                            <div className="accordion-item border-2" key={chapterIndex}>
                                                <h2 className="accordion-header" id={`heading${chapterIndex}`}>
                                                    <button
                                                        className="accordion-button collapsed py-3"
                                                        type="button"
                                                        data-bs-toggle="collapse"
                                                        data-bs-target={`#collapse${chapterIndex}`}
                                                        aria-expanded="false"
                                                        aria-controls={`collapse${chapterIndex}`}
                                                    >{chapter.title}
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
                                                                        className="list-group-item d-flex flex-row justify-content-between  border-0 p-0"
                                                                    >
                                                                        <p>
                                                                            <strong>{lecture.title}</strong>

                                                                        </p>
                                                                        <p className="d-flex gap-2">
                                                                            <a href={lecture.url} target="_blank" rel="noopener noreferrer">
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
                                        </>
                                    ))}
                                </div>
                                <br />
                            </>
                        )}
                        <p><h4><strong>Course Description:</strong></h4>
                            {course.description}
                        </p>
                        <div className="related">
                            <h4 className="fw-bold">Related course</h4>
                            {courses.map((cou) => (
                                cou.category === course.category ? (<p>{cou.title}</p>) : null
                            ))}
                            {/* <CourseList /> */}
                        </div>
                    </div>
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
                                {
                                    role === "user" ?
                                        <button className="btn btn-success">Enroll</button> :
                                        role === "admin" ?
                                            <div className="d-flex">
                                                <button
                                                    className="btn btn-primary btn-sm me-2 w-50">
                                                    <Link to={`/edit/${course._id}`} className='text-white hover:underline text-decoration-none'>
                                                        Edit
                                                    </Link>
                                                </button>
                                                <button
                                                    className="btn btn-danger btn-sm w-50"
                                                    onClick={() => handleDelete(course._id)}
                                                >
                                                    Delete
                                                </button>
                                            </div>
                                            : null
                                }
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
