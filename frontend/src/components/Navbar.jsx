import React from "react";
import { Link, useNavigate } from "react-router-dom";
import "bootstrap/dist/css/bootstrap.min.css";
import { FaUserGraduate, FaSearch, FaShoppingCart } from "react-icons/fa";
import { useUser } from "../context/UserContext";

export const Navbar = () => {
  const { user, logout } = useUser();
  const navigate = useNavigate();

  const categories = [...new Set([
    "All Courses",
    "Development",
    "Business",
    "Design",
    "IT & Software",
    "Marketing",
    "Personal Development",
    "web-development",
    "data-science",
    "machine-learning",
    "mobile-development",
    "other",
  ])];

  const handleLogout = () => {
    logout();
    navigate("/login");
  };

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
          <Link className="navbar-brand fw-bold text-primary mx-auto mx-lg-0 order-2 order-lg-1" to="/">
            <FaUserGraduate className="me-2" />
            {user?.role === "user" ? "MyLMS" : 
            user?.role === "admin" ? "MyLMSAdmin" : null}
            
          </Link>

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
            <Link to="/cart" className="nav-link">
              <FaShoppingCart size={18} /> Cart <span className="text-primary">|</span>
            </Link>
            <ul className="navbar-nav ms-auto gap-4">
              <li className="nav-item d-none d-lg-block">
                <Link className="nav-link" to="/courses">
                  Courses <span className="text-primary">|</span>
                </Link>
              </li>
              <li className="nav-item d-none d-lg-block">
                <Link className="nav-link" to="/live">
                  Live <span className="text-primary">|</span>
                </Link>
              </li>

              <li className="nav-item dropdown">
                {user ? (
                  <div className="dropdown">
                    <button
                      className="btn btn-light rounded-circle border dropdown-toggle"
                      id="profileDropdown"
                      data-bs-toggle="dropdown"
                      aria-expanded="false"
                      style={{ width: 40, height: 40, padding: 0 }}
                    >
                      {user.username?.[0]?.toUpperCase() || "U"}
                    </button>
                    <ul
                      className="dropdown-menu dropdown-menu-end mt-2"
                      aria-labelledby="profileDropdown"
                    >
                      <li className="dropdown-item text-muted">
                        <p className="fw-bold p-0 m-0">
                          {user.username}
                          <span className="badge bg-secondary ms-2">{user.role}</span>
                        </p>
                        <small className="text-muted">
                          {user.email || "Email not available"}
                        </small>
                      </li>
                      <li><hr className="dropdown-divider" /></li>
                      <li>
                        <Link className="dropdown-item" to="/profile">
                          Profile
                        </Link>
                      </li>
                      {user.role === "user" && (
                        <li>
                          <Link className="dropdown-item" to="/my-learning">
                            My Learning
                          </Link>
                        </li>
                      )}
                      <li>
                        <button className="dropdown-item text-danger" onClick={handleLogout}>
                          Logout
                        </button>
                      </li>
                    </ul>
                  </div>
                ) : (
                  <Link to="/register" className="btn btn-primary text-white rounded border-0">
                    Create Account
                  </Link>
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
              <Link className="nav-link text-dark border-bottom py-2" to={`/category/${cat.toLowerCase()}`}>
                {cat}
              </Link>
            </li>
          ))}
        </ul>
      </div>
    </>
  );
};