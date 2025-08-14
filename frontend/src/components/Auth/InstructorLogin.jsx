import React, { useState } from "react";
import axios from "axios";
import "bootstrap/dist/css/bootstrap.min.css";
import { Link } from "react-router-dom";

const InstructorLogin = () => {
  const [formData, setFormData] = useState({
    username: "",
    password: "",
    role: "instructor",
  });

  const [errors, setErrors] = useState({});
  const [success, setSuccess] = useState("");

  const validateForm = () => {
    let newErrors = {};
    if (!formData.username.trim()) newErrors.username = "Username is required";
    if (formData.password.length < 6) newErrors.password = "Password must be at least 6 characters";
    setErrors(newErrors);
    return Object.keys(newErrors).length === 0;
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    if (!validateForm()) return;
    try {
      const response = await axios.post("http://localhost:7001/api/auth/register", formData);
      setSuccess(response.data.message);
      setFormData({ username: "", 
        password: "" });

      setErrors({});
    } catch (error) {
      setErrors({ server: error.response?.data?.message || "Server error" });
    }
  };

  return (
    <div className="d-flex justify-content-center align-items-center m-5">
      <div className="card shadow p-4" style={{ width: "350px", borderRadius: "10px" }}>
        <h2 className="text-center fw-bold mb-4">Sign Up</h2>
        {success && <div className="alert alert-success">{success}</div>}
        {errors.server && <div className="alert alert-danger">{errors.server}</div>}

        <form onSubmit={handleSubmit}>
          <div className="mb-3">
            <label className="form-label">Username</label>
            <input type="text" className="form-control" placeholder="Enter Username"
              value={formData.username} onChange={(e) => setFormData({ ...formData, username: e.target.value })} />
            {errors.username && <small className="text-danger">{errors.username}</small>}
          </div>
          <div className="mb-3">
            <label className="form-label">Password</label>
            <input type="password" className="form-control" placeholder="Enter Password"
              value={formData.password} onChange={(e) => setFormData({ ...formData, password: e.target.value })} />
            {errors.password && <small className="text-danger">{errors.password}</small>}
          </div>
          <button type="submit" className="btn btn-dark w-100">Add Instructor</button>
        </form>
      </div>
    </div>
  );
};

export default InstructorLogin;