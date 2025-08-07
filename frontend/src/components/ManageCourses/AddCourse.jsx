import React, { useState } from "react";
import axios from "axios";

export const AddCourse = () => {
  const [formData, setFormData] = useState({
    title: "",
    subtitle: "",
    description: "",
    keypoints: "",
    thumbnail: null,
    price: "",
    discount: "",
    category: "",
    level: ""
  });

  const [errors, setErrors] = useState({});
  const [success, setSuccess] = useState("");

  const handleChange = (e) => {
    const { name, value, files } = e.target;
    setFormData((prev) => ({
      ...prev,
      [name]: files ? files[0] : value
    }));
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    try {
      const formDataToSend = new FormData();
      Object.entries(formData).forEach(([key, value]) => {
        formDataToSend.append(key, value);
      });

      const res = await axios.post("http://localhost:7001/api/course/addcourse", formDataToSend, {
        headers: { "Content-Type": "multipart/form-data" }
      });

      setSuccess(res.data.message);
      setFormData({
        title: "",
        subtitle: "",
        description: "",
        keypoints: "",
        thumbnail: null,
        price: "",
        discount: "",
        category: "",
        level: ""
      });
      setErrors({});
    } catch (err) {
      setErrors({ server: err.response?.data?.message || "Server error" });
    }
  };

  return (
    <div className="container py-4">
      <h2 className="fw-bold mb-3">Add New Course</h2>

      {success && <div className="alert alert-success">{success}</div>}
      {errors.server && <div className="alert alert-danger">{errors.server}</div>}

      <form onSubmit={handleSubmit}>
        {[
          { label: "Course Name", name: "title", type: "text" },
          { label: "Course Subtitle", name: "subtitle", type: "text" },
          { label: "Course Description", name: "description", type: "textarea" },
          { label: "Course Key Points", name: "keypoints", type: "text", placeholder: "Enter key points, comma separated" },
          { label: "Course Thumbnail", name: "thumbnail", type: "file" },
          { label: "Course Price", name: "price", type: "number", placeholder: "0" },
          { label: "Course Discount", name: "discount", type: "number", placeholder: "0" }
        ].map(({ label, name, type, placeholder }) => (
          <div className="mb-3" key={name}>
            <label className="form-label">{label}</label>
            {type === "textarea" ? (
              <textarea
                name={name}
                className="form-control"
                rows="3"
                value={formData[name]}
                onChange={handleChange}
              />
            ) : (
              <input
                name={name}
                type={type}
                className="form-control"
                placeholder={placeholder}
                value={type === "file" ? undefined : formData[name]}
                onChange={handleChange}
              />
            )}
          </div>
        ))}

        <div className="mb-3">
          <label className="form-label">Course Category</label>
          <select
            name="category"
            className="form-select"
            value={formData.category}
            onChange={handleChange}
          >
            <option value="">Select category</option>
            <option value="web-development">Web Development</option>
            <option value="data-science">Data Science</option>
            <option value="machine-learning">Machine Learning</option>
            <option value="mobile-development">Mobile Development</option>
            <option value="design">Design</option>
            <option value="marketing">Marketing</option>
            <option value="business">Business</option>
            <option value="other">Other</option>
          </select>
        </div>

        <div className="mb-3">
          <label className="form-label">Course Level</label>
          <select
            name="level"
            className="form-select"
            value={formData.level}
            onChange={handleChange}
          >
            <option value="">Select level</option>
            <option value="beginner">Beginner</option>
            <option value="intermediate">Intermediate</option>
            <option value="advanced">Advanced</option>
          </select>
        </div>

        <button type="submit" className="btn btn-primary">
          Add Course
        </button>
      </form>
    </div>
  );
};
