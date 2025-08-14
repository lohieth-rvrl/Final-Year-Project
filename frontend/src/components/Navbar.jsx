import { Link } from "react-router-dom";
import React from "react";
import "bootstrap/dist/css/bootstrap.min.css";
import { FaUserGraduate, FaSearch, FaShoppingCart } from "react-icons/fa";
// import "./Navbar.css"; // we'll add CSS for hover dropdown

export const Navbar = () => {
  const role = localStorage.getItem("role");
  const username = localStorage.getItem("username");
  const categories = [
    "All Courses",
    "Development",
    "Business",
    "Design",
    "IT & Software",
    "Marketing",
    "Personal Development",'web-development', 'data-science', 'machine-learning', 'mobile-development', 'design', 'marketing', 'business', 'other',
  ];

  return (
    <>
      {/* Main Navbar */}
      <nav className="navbar navbar-expand-lg navbar-light bg-white shadow-sm px-3 py-2 border-bottom">
        <div className="container-fluid">

          {/* Mobile Menu Button */}
          <button
            className="navbar-toggler border-0 d-lg-none order-1"
            type="button"
            data-bs-toggle="collapse"
            data-bs-target="#mobileMenu"
          >
            <span className="navbar-toggler-icon"></span>
          </button>

          {/* Logo */}
          <a
            className="navbar-brand fw-bold text-primary mx-auto mx-lg-0 order-2 order-lg-1"
            href="/"
          >
            <FaUserGraduate className="me-2" />
            MyLMS
          </a>

          {/* Search bar (desktop only) */}
          <form className="d-none d-lg-flex order-lg-2 w-20 mx-3">
            <input
              className="form-control rounded-pill"
              type="search"
              placeholder="Search courses..."
            />
            <button className="btn btn-link text-dark ms-n5" type="submit">
              <FaSearch />
            </button>
          </form>

          {/* Cart & Profile */}
          <div className="d-flex align-items-center gap-3 order-3 order-lg-3 ms-lg-auto">
            <a href="/cart" className="nav-link">
              <FaShoppingCart size={18} />Cart  <span className='text-primary'>|</span>
            </a>
            <ul className="navbar-nav ms-auto gap-4">
              <li className="nav-item d-none d-lg-block">
                <Link className="nav-link" to="/courses">
                  courses <span className='text-primary'>|</span>
                </Link>
              </li>
              <li className="nav-item d-none d-lg-block">
                <Link className="nav-link" to="/live">
                  Live <span className='text-primary'>|</span>
                </Link>
              </li>

              <li className="nav-item dropdown">
                {role ? (
                  <div className="dropdown">
                    <button
                      className="btn btn-light rounded-circle border dropdown-toggle"
                      id="profileDropdown"
                      data-bs-toggle="dropdown"
                      aria-expanded="false"
                      style={{ width: 40, height: 40, padding: 0 }}
                    >
                      L
                    </button>
                    <ul
                      className="dropdown-menu dropdown-menu-end mt-2" // <-- mt-2 pushes it below navbar
                      aria-labelledby="profileDropdown"
                    >
                      <li className="dropdown-item text-muted"><p className="fw-bold p-0 m-0">{username}</p>user email</li>
                      <li>
                        <hr className="dropdown-divider" />
                      </li>
                      <li>
                        <a className="dropdown-item" href="/profile">
                          Profile
                        </a>
                      </li>
                      {role === "user"? (
                        <li>
                        <a className="dropdown-item" href="/logout">
                          My learning
                        </a>
                      </li>
                      ):null}
                      <li>
                        <a className="dropdown-item" href="/logout">
                          Logout
                        </a>
                      </li>
                    </ul>
                  </div>
                ) : (
                  <button className="text-white bg-primary rounded border-0">
                    <Link className="nav-link text-white" to="/register">
                      Create Account
                    </Link>
                  </button>
                )}
              </li>
            </ul>
          </div>
        </div>
      </nav>

      {/* Mobile Collapse Menu */}
      <div className="collapse navbar-collapse d-lg-none" id="mobileMenu">
        <ul className="navbar-nav w-100 mt-2">
          {categories.map((cat, i) => (
            <li className="nav-item" key={i}>
              <a
                className="nav-link text-dark border-bottom py-2"
                href={`/category/${cat.toLowerCase()}`}
              >
                {cat}
              </a>
            </li>
          ))}
        </ul>
      </div>
    </>
  );
};
