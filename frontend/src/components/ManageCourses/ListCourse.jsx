import React from 'react'

export const ListCourse = () => {
    return (
        <>
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
            </table></>
    )
}
