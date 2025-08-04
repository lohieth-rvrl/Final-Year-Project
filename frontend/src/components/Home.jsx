import React from 'react'
import { Link } from 'react-router-dom'

export const Home = () => {
  const handleLogout = () => {
    localStorage.removeItem("token");
    localStorage.removeItem("user");
    localStorage.removeItem("role");
    window.location.href = "/";
  }
  return (
    <div>
      <h1 className='text-3xl font-bold underline text-center'>
        Welcome to Edutech
      </h1>
      <button className='bg-blue-500 text-white px-4 py-2 rounded'>
        <Link to="/login" className='text-blue-500 hover:underline text-decoration-none'>
          Login
        </Link>
      </button>
      <button onClick={handleLogout}>logout</button>
    </div>
  )
}
