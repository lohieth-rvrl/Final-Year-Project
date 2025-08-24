import React from 'react'
import { CourseList } from '../ManageCourses/CourseList'

export const User = () => {

  const handleLogout = () => {
    localStorage.removeItem("token");
    localStorage.removeItem("user");
    localStorage.removeItem("role");
    localStorage.removeItem("username");
    window.location.href = "/";
  }

  return (
    <div>
      <button onClick={handleLogout} className='btn btn-danger'>logout</button>
      logout
      {/* <CourseList /> */}
    </div>
  )
}
