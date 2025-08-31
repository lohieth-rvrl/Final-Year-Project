import React, { useState } from "react";
import axios from "axios";
import { Link, useNavigate } from "react-router-dom";
import { useUser } from "../../context/UserContext";

export const Login = () => {
  const [username, setUsername] = useState("");
  const [password, setPassword] = useState("");
  const [error, setError] = useState("");
  const navigate = useNavigate();
  const { login } = useUser(); // use login method from context

  const handleSubmit = async (e) => {
    e.preventDefault();
    try {
      const response = await axios.post("http://localhost:7001/api/auth/login", {
        username,
        password,
      });

      if (response.data.token) {
        // Store token only
        localStorage.setItem("token", response.data.token);

        // Set axios header
        axios.defaults.headers.common["Authorization"] = `Bearer ${response.data.token}`;

        // Trigger context login (fetches user from backend)
        login({ token: response.data.token });

        // Redirect to home
        navigate("/");
      }
    } catch (err) {
      setError(err.response?.data?.message || "Something went wrong");
    }
  };

  return (
    <div className="container">
      {error && <div className="alert alert-danger">{error}</div>}
      <div className="row justify-content-center">
        <div className="col-md-6 bg-light p-4 rounded shadow">
          <h2 className="text-center mb-4">Login</h2>
          <form onSubmit={handleSubmit}>
            <div className="mb-3">
              <label className="form-label">Username</label>
              <input
                type="text"
                className="form-control"
                placeholder="Enter Username"
                value={username}
                onChange={(e) => setUsername(e.target.value)}
                required
              />
            </div>
            <div className="mb-3">
              <label className="form-label">Password</label>
              <input
                type="password"
                className="form-control"
                placeholder="Enter password"
                value={password}
                onChange={(e) => setPassword(e.target.value)}
                required
              />
            </div>
            <button type="submit" className="btn btn-dark w-100">Login</button>
            <p className="mt-3 text-center">
              Don't have an account?
              <Link to="/register" className="fw-bold text-decoration-none"> Register</Link>
            </p>
          </form>
        </div>
      </div>
    </div>
  );
};