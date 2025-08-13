import React from 'react'
import { Login } from './components/Auth/Login'
import { Route, Routes } from 'react-router-dom'
import { Home } from './components/Home'
import { Navbar } from './components/Navbar'
import Register from './components/Auth/Register'
import { User } from './components/Dashboards/user'
import { Admin } from './components/Dashboards/Admin'
import EditCourse from './components/ManageCourses/EditCourse'
import { CourseList } from './components/ManageCourses/CourseList'
import ViewCourse from './components/ManageCourses/ViewCourse'

const App = () => {
  const role = localStorage.getItem("role");
  return (
    <div>
      <Navbar />
      <Routes>
        <Route path="/" element={<Home />} />
        <Route path="/login" element={<Login />}>

        </Route>
        <Route path="/register" element={<Register />} />
        <Route path='/user' element={<User />} />
        <Route path="/admin" element={<Admin />} />
        <Route path="/courses" element={<CourseList />} />
        <Route path="/profile" element={role === "admin" ? <Admin /> : <User />} />
        <Route path="/edit/:courseId" element={<EditCourse />} />
        <Route path="/course/:courseId" element={<ViewCourse />} />
      </Routes>
    </div>
  )
}

export default App
