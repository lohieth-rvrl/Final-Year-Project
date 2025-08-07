import React from 'react'
import { useEffect, useState } from "react";
import axios from "axios";

export const CourseList = () => {

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


    return (
        <div>CourseList
            <h2>All Courses</h2>
            <div className="course-list">
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
                                    <button className="btn btn-primary btn-sm me-2">Edit</button>
                                    <button className="btn btn-danger btn-sm">Delete</button>
                                </td>
                            </tr>
                        ))}
                    </tbody>
                </table>
            </div>
        </div>
    )
}
