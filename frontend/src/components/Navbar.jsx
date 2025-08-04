import React from 'react'
import { Link } from 'react-router-dom'

export const Navbar = () => {
  const role = localStorage.getItem("role");
  return (
    <div>
      <div className="container-fluid py-2 p-0" id="nav1">
        <nav className="navbar navbar-expand-lg border-bottom">
          <div className="container p-0">
            <button
              className="navbar-toggler"
              type="button"
              data-bs-toggle="collapse"
              data-bs-target="#navbarNav"
              aria-controls="navbarNav"
              aria-expanded="false"
              aria-label="Toggle navigation"
            >
              <span className="navbar-toggler-icon"></span>
            </button>

            <div className="d-flex align-items-center order-lg-2 gap-3">
              {/* <BiSearch size={24} /> */}

              <Link className="nav-link" to="/login">
                <i className="bi bi-cart"></i>
                {/* <BiUser size={24} /> */}
              </Link>
              {/* <BiShoppingBag size={24} /> */}
            </div>

            <div className="collapse navbar-collapse order-lg-1" id="navbarNav">
              <ul className="navbar-nav ms-auto gap-4">
                <li className="nav-item">
                  <Link className="nav-link" to="/courses">
                    courses <span className='text-primary'>|</span>
                  </Link>
                </li>
                <li className="nav-item">
                  <Link className="nav-link" to="/live">
                    Live <span className='text-primary'>|</span>
                  </Link>
                </li>
                <li className="nav-item">
                  {
                    role === "user" ? (
                      <Link className="nav-link" to="/dashboard">
                        MyLearning <span className='text-primary'>|</span>
                      </Link>
                    ) : role === "admin" ? null :
                      <Link className="nav-link" to="/login">
                        Login <span className='text-primary'>|</span>
                      </Link>
                  }
                </li>
                <li className="nav-item">
                  {
                    role ? (
                      <button className=' bg-primary rounded border-0'>
                        <Link className="nav-link text-white" to="/profile">
                          Profile
                        </Link>
                      </button>

                    ) : (
                      <button className='text-white bg-primary rounded border-0'>
                        <Link className="nav-link text-white" to="/register">
                          Create Account
                        </Link>
                      </button>
                    )
                  }
                </li>
              </ul>
            </div>

            <Link className="navbar-brand mx-auto d-lg-block d-none text-center" to="/">
              <h1 className="m-0" style={{ fontWeight: 'bold', fontSize: '2rem' }}><span className='text-primary'>Edu</span>Tech{role === "admin" ? <span className='text-danger'>Admin</span> : null}</h1>
            </Link>
          </div>
        </nav>
      </div>
    </div>
  )
}
