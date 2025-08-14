import React from 'react'
import { Link } from 'react-router-dom'

export const Home = () => {
  const categories = [
    "All Courses",
    "Development",
    "Business",
    "Design",
    "IT & Software",
    "Marketing",
    "Personal Development",'web-development', 'data-science', 'machine-learning', 'mobile-development', 'design', 'marketing', 'business', 'other'
  ];

  return (
    <div>
      {/* Categories Bar (Desktop Only) */}
      <div className="bg-light border-bottom d-none d-lg-block">
        <div className="container-fluid">
          <ul className="nav justify-content-center py-1">
            {categories.map((cat, i) => (
              <li className="nav-item" key={i}>
                <a
                  className="nav-link small text-dark"
                  href={`/category/${cat.toLowerCase()}`}
                >
                  {cat}
                  <span className='text-primary'> |</span>
                </a>
              </li>
            ))}
          </ul>
        </div>
      </div>
      <h1 className='text-3xl font-bold underline text-center'>
        Welcome to Edutech
      </h1>
      {/* <button className='bg-blue-500 text-white px-4 py-2 rounded'>
        <Link to="/login" className='text-blue-500 hover:underline text-decoration-none'>
          Login
        </Link>
      </button>
      <button onClick={handleLogout}>logout</button> */}
    </div>
  )
}
