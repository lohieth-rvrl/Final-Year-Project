import React from "react";
import { Link } from "react-router-dom";
import Admin from "./Dashboards/Admin";
import { useUser } from "../context/UserContext";

export const Home = () => {
  const { user } = useUser();
  // console.log("User in Home component:", user);

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

  return (
    <div>
      {/* Categories Bar (Desktop Only) */}
      {user?.role === "user" && (
        <div className="bg-light border-bottom d-none d-lg-block">
          <div className="container-fluid">
            <ul className="nav justify-content-center py-1">
              {categories.map((cat, i) => (
                <li className="nav-item" key={i}>
                  <Link
                    className="nav-link small text-dark"
                    to={`/category/${cat.toLowerCase()}`}
                  >
                    {cat}
                    <span className="text-primary"> |</span>
                  </Link>
                </li>
              ))}
            </ul>
          </div>
        </div>
      )}

      <h1 className="text-3xl font-bold underline text-center">
        Welcome to Edutech
      </h1>

      {/* Admin Dashboard */}
      {user?.role === "admin" && <Admin />}
    </div>
  );
};