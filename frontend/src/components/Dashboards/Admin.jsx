import React, { useEffect, useState } from "react";
import axios from "axios";
import { Link } from "react-router-dom";
import { AddCourse } from '../ManageCourses/AddCourse';
import { CourseList } from '../ManageCourses/CourseList';

export const Admin = () => {
    const [activeTab, setActiveTab] = useState('dashboard')

    const handleLogout = () => {
        localStorage.removeItem("token");
        localStorage.removeItem("user");
        localStorage.removeItem("role");
        window.location.href = "/"; // Redirect to login page
    }

    const [courses, setCourses] = useState([]);

    useEffect(() => {
        const fetchCourses = async () => {
            try {
                const res = await axios.get("http://localhost:7001/api/course/listcourse");
                setCourses(res.data);
            } catch (err) {
                console.error("Error fetching courses:", err);
            }
        };

        fetchCourses();
    }, []);

    const handleDelete = async (id) => {
        try {
            await axios.delete(`http://localhost:7001/api/course/deletecourse/${id}`);
            setCourses((prev) => prev.filter((course) => course._id !== id));
        } catch (error) {
            console.error(error);
            alert("Error deleting course");
        }
    };

    return (
        <div className='container-fluid'>
            <div className="row">
                {/* Sidebar */}
                <div className="col-md-3 text-center border-end p-3">
                    <ul className="nav flex-column">
                        <li className="nav-item mb-2">
                            <button className={`nav-link btn ${activeTab === 'dashboard' ? 'active fw-bold' : ''}`} onClick={() => setActiveTab('dashboard')}>
                                📊 Dashboard
                            </button>
                        </li>
                        <li className="nav-item mb-2">
                            <button className={`nav-link btn ${activeTab === 'courses' ? 'active fw-bold' : ''}`} onClick={() => setActiveTab('courses')}>
                                📚 Courses
                            </button>
                        </li>
                        <li className="nav-item mb-2">
                            <button className={`nav-link btn ${activeTab === 'instructors' ? 'active fw-bold' : ''}`} onClick={() => setActiveTab('instructors')}>
                                📚 Instructors
                            </button>
                        </li>
                        <li className="nav-item mb-2">
                            <button className={`nav-link btn ${activeTab === 'students' ? 'active fw-bold' : ''}`} onClick={() => setActiveTab('students')}>
                                📚 Students
                            </button>
                        </li>
                        <li className="nav-item">
                            <button className="nav-link btn text-danger" onClick={() => setActiveTab('logout')}>
                                🔓 Logout
                            </button>
                        </li>
                    </ul>
                </div>

                {/* Main Content */}
                <div className="col-md-9 p-4">
                    {activeTab === 'dashboard' && (
                        <>
                            <h2 className="fw-bold mb-3">Dashboard Overview</h2>
                            <p>Welcome to the admin dashboard! You can manage courses and users here.
                                <br />
                                1. add courses, Delete courses, Update courses
                                <br />
                                2. manage instructors
                                <br />
                                3. manage students
                                <br />
                                4. view all courses, instructors, and students
                                <br />
                                5. add instructors to the course
                                <br />
                                6. add students to the course
                            </p>
                        </>
                    )}

                    {activeTab === 'courses' && (
                        <div className="card p-4">
                            <div className="d-flex justify-content-between align-items-center mb-3">
                                <h4 className="fw-bold mb-0">All Courses</h4>
                                <button className="btn btn-dark" onClick={() => setActiveTab('addCourse')}>Create New Course</button>
                            </div>
                            {/* Table for quick info */}
                            <table className="table table-bordered">
                                <thead className="table-light">
                                    <tr>
                                        <th>Course</th>
                                        <th>Students</th>
                                        <th>Price</th>
                                        <th>Actions</th>
                                    </tr>
                                </thead>

                                <tbody>
                                    {courses.map((course) => (
                                        <tr key={course._id}>
                                            <td>{course.title}</td>
                                            <td>0</td>
                                            <td>{course.price}</td>
                                            <td>
                                                <button
                                                    className="btn btn-primary btn-sm me-2">
                                                    <Link to={`/edit/${course._id}`} className='text-white hover:underline text-decoration-none'>
                                                        Edit
                                                    </Link>
                                                </button>
                                                <button
                                                    className="btn btn-danger btn-sm"
                                                    onClick={() => handleDelete(course._id)}
                                                >
                                                    Delete
                                                </button>
                                            </td>
                                        </tr>
                                    ))}
                                </tbody>
                            </table>
                            {/* <CourseList /> */}

                        </div>
                    )}

                    {activeTab === 'instructors' && (
                        <>
                            <h2 className="fw-bold mb-3">Dashboard Instrcutor</h2>
                            <p>Welcome to Instructors
                                <br />
                                1. start Live
                                <br />
                                2. schedule Live
                                <br />
                            </p>
                        </>
                    )}

                    {activeTab === 'students' && (
                        <>
                            <h2 className="fw-bold mb-3">Dashboard Students</h2>
                            <p>Welcome to Students
                                <br />
                                1. view courses
                                <br />
                                2. enroll in courses
                                <br />
                                3. view enrolled courses
                                <br />
                                4. view progress
                                <br />
                                5. view certificates
                                <br />
                            </p>
                        </>
                    )}

                    {activeTab === 'addCourse' && (
                        <>
                            <button onClick={() => setActiveTab('courses')} className='btn btn-secondary'> back</button>
                            <AddCourse />
                        </>
                    )}

                    {activeTab === 'logout' && (
                        <>
                            <h2 className="text-danger">You have been logged out.</h2>
                            <p>Redirecting to login...</p>
                            <button onClick={handleLogout} className='btn btn-danger'>logout</button>
                        </>
                    )}
                </div>
            </div>
        </div>
    )
}
