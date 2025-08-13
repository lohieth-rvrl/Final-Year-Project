import React, { useEffect, useState } from "react";
import axios from "axios";
import { Link } from "react-router-dom";

export const CourseList = () => {
    const role = localStorage.getItem("role");
    console.log(role);
    const [courses, setCourses] = useState([]);
    const [filteredCourses, setFilteredCourses] = useState([]);
    const [filters, setFilters] = useState({
        search: "",
        level: "",
        category: "",
        price: ""
    });

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

    const handleFilterChange = (e) => {
        const { name, value } = e.target;
        const updatedFilters = { ...filters, [name]: value };
        setFilters(updatedFilters);
        applyFilters(updatedFilters);
    };

    const applyFilters = (currentFilters) => {
        let filtered = [...courses];

        if (currentFilters.search) {
            filtered = filtered.filter(course =>
                course.title.toLowerCase().includes(currentFilters.search.toLowerCase())
            );
        }
        if (currentFilters.level) {
            filtered = filtered.filter(course => course.level === currentFilters.level.toLowerCase());
        }
        if (currentFilters.category) {
            filtered = filtered.filter(course => course.category === currentFilters.category.toLowerCase());
        }
        if (currentFilters.price) {
            filtered = filtered.filter(course => {
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
                            {/* 'web-development', 'data-science', 'machine-learning', 'mobile-development', 'design', 'marketing', 'business', 'other' */}
                            <option value="">All Categories</option>
                            <option value="web-development">web-development</option>
                            <option value="data-science">data-science</option>
                            <option value="machine-learning">machine-learning</option>
                            <option value="mobile-development">mobile-development</option>
                            <option value="design">design</option>
                            <option value="marketing">marketing</option>
                            <option value="business">business</option>
                            <option value="other">other</option>
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
                {filteredCourses.length > 0 ? (
                    filteredCourses.map((course) => (
                        <div className="col-lg-3 col-md-4 col-sm-4 mb-4" key={course._id}>
                            <div
                                className="card h-100 shadow-sm"
                                style={{
                                    transition: "transform 0.2s",
                                    cursor: "pointer"
                                }}
                                onMouseEnter={(e) => e.currentTarget.style.transform = "scale(1.03)"}
                                onMouseLeave={(e) => e.currentTarget.style.transform = "scale(1)"}
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
                                    <b className="card-title m-0    ">{course.title}</b>
                                    <p className="m-0">Instrcutor name</p>
                                    <div className="mt-auto">
                                        {course.price === 0 ? <p className="text-success m-0">Free</p> :
                                            <p className="m-0">₹{course.price} ({course.discount}%)</p>}
                                        <strong className="">Level:</strong> {course.level}
                                        <p>{course.category}</p>
                                        {
                                            role === "user" ? (
                                                <Link to={`/course/${course._id}`} className='btn btn-primary btn-sm w-100'>
                                                    Enroll
                                                </Link>
                                            ) : role === "admin" ?
                                                <Link to={`/course/${course._id}`} className='btn btn-primary btn-sm w-100'>
                                                    View
                                                </Link> : null
                                        }
                                        {/* <Link to={`/course/${course._id}`} className='btn btn-primary btn-sm w-100'>
                                            {role === "admin" ? (<p>View</p>) : (<p>Enroll</p>)}
                                            Edit
                                        </Link> */}
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


// {/* Full course details */}
//                 {courses.map((course) => (
//                     <div className="course-card border p-3 mb-3" key={course._id}>
//                         {/* Thumbnail */}
//                         {course.thumbnail && (
//                             <img
//                                 src={course.thumbnail}
//                                 alt={course.title}
//                                 width="200"
//                                 className="mb-2"
//                             />
//                         )}

//                         {/* Basic Info */}
//                         <h3>{course.title}</h3>
//                         <p>
//                             <strong>Subtitle:</strong> {course.subtitle}
//                         </p>
//                         <p>
//                             <strong>Description:</strong> {course.description}
//                         </p>
//                         <p>
//                             <strong>Price:</strong> ₹{course.price} (Discount: {course.discount}
//                             %)
//                         </p>
//                         <p>
//                             <strong>Category:</strong> {course.category}
//                         </p>
//                         <p>
//                             <strong>Level:</strong> {course.level}
//                         </p>

//                         {/* Keypoints */}
//                         {course.keypoints?.length > 0 && (
//                             <>
//                                 <h5>Key Points:</h5>
//                                 <ul>
//                                     {course.keypoints.map((point, i) => (
//                                         <li key={i}>{point}</li>
//                                     ))}
//                                 </ul>
//                             </>
//                         )}

//                         {/* Chapters */}
//                         {course.chapters && course.chapters.length > 0 && (
//                             <>
//                                 <h4>Chapters:</h4>
//                                 {course.chapters.map((chapter, chapterIndex) => (
//                                     <div key={chapterIndex} className="border p-2 mb-2">
//                                         <h5>
//                                             Chapter {chapterIndex + 1}: {chapter.title}
//                                         </h5>

//                                         {/* Lectures inside chapter */}
//                                         {chapter.lectures && chapter.lectures.length > 0 ? (
//                                             <ul>
//                                                 {chapter.lectures.map((lecture, lectureIndex) => (
//                                                     <li key={lectureIndex}>
//                                                         <strong>{lecture.title}</strong> - {lecture.duration}{" "}
//                                                         min
//                                                         <br />
//                                                         <a
//                                                             href={lecture.url}
//                                                             target="_blank"
//                                                             rel="noopener noreferrer"
//                                                         >
//                                                             Watch Lecture
//                                                         </a>
//                                                         <br />
//                                                         {lecture.isPreviewFree && (
//                                                             <span className="text-success">Free Preview</span>
//                                                         )}
//                                                     </li>
//                                                 ))}
//                                             </ul>
//                                         ) : (
//                                             <p>No lectures available</p>
//                                         )}
//                                     </div>
//                                 ))}
//                             </>
//                         )}
//                     </div>
//                 ))}
