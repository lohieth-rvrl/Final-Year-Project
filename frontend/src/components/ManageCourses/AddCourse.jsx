import React, { useState, useEffect, useContext } from "react";
import axios from "axios";
import {UserContext} from "../../context/UserContext.jsx";

export const AddCourse = () => {
  const [step, setStep] = useState(1);
  // const [instructors, setInstructors] = useState([]);
    const { instructors } = useContext(UserContext);
  const [selectedInstructor, setSelectedInstructor] = useState("");

  const [formData, setFormData] = useState({
    thumbnail: "",
    title: "",
    subtitle: "",
    description: "",
    keypoints: [""],
    price: "",
    discount: "",
    category: "",
    level: "",
    language: "",
    startDate: "",
    endDate: "",
    instructor: "",
    options: {
      personalizedPaths: false,
      assignmentsDeadline: false,
      attachFiles: false,
    },
    chapters: [],
  });

  const [thumbnailPreview, setThumbnailPreview] = useState(null);

  const handleChange = (e) => {
    const { name, value, type, checked } = e.target;

    if (name.startsWith("options.")) {
      const key = name.split(".")[1];
      setFormData((prev) => ({
        ...prev,
        options: {
          ...prev.options,
          [key]: checked,
        },
      }));
    } else {
      setFormData((prev) => ({
        ...prev,
        [name]: type === "checkbox" ? checked : value,
      }));
    }
  };

  const handleThumbnailChange = (e) => {
    const file = e.target.files[0];
    if (file) {
      setThumbnailPreview(URL.createObjectURL(file));
      setFormData({ ...formData, thumbnail: file });
    }
  };

  const handleKeypointChange = (index, value) => {
    const updated = [...formData.keypoints];
    updated[index] = value;
    setFormData({ ...formData, keypoints: updated });
  };

  const addKeypoint = () => {
    if (formData.keypoints.length < 10) {
      setFormData({ ...formData, keypoints: [...formData.keypoints, ""] });
    }
  };

  const handleSubmit = async (e) => {
    e.preventDefault();

    try {
      const data = new FormData();
      data.append("thumbnail", formData.thumbnail);
      data.append("title", formData.title);
      data.append("subtitle", formData.subtitle);
      data.append("description", formData.description);
      data.append("price", formData.price);
      data.append("discount", formData.discount);
      data.append("category", formData.category);
      data.append("level", formData.level);
      data.append("language", formData.language);
      data.append("startDate", formData.startDate);
      data.append("endDate", formData.endDate);
      data.append("instructor", selectedInstructor);
      data.append("options", JSON.stringify(formData.options));
      data.append("keypoints", JSON.stringify(formData.keypoints));
      data.append("chapters", JSON.stringify(formData.chapters));

      const res = await axios.post(
        `${import.meta.env.VITE_API_URL}/course/addcourse`,
        data,
        {
          headers: { "Content-Type": "multipart/form-data" },
        }
      );

      console.log("Course saved:", res.data);
      alert("Course saved successfully!");
    } catch (err) {
      console.error("Error saving course:", err);
      alert("Failed to save course.");
    }
  };


  return (
    <div className="container py-4">
      <div className="card p-5 shadow-sm rounded">
        <h3 className="mb-3">Add New Course</h3>

        <form onSubmit={handleSubmit}>
          {/* Step 1: Course Details */}
          {step === 1 && (
            <>
              {/* Thumbnail */}
              <div className="mb-4 text-center">
                {thumbnailPreview ? (
                  <img
                    src={thumbnailPreview}
                    alt="Thumbnail"
                    className="img-fluid rounded mb-2"
                    style={{ maxHeight: "180px" }}
                  />
                ) : (
                  <div
                    className="border border-dashed rounded d-flex align-items-center justify-content-center"
                    style={{ height: "180px", background: "#f9f9f9" }}
                  >
                    <span className="text-muted">Upload Thumbnail</span>
                  </div>
                )}
                <div>
                  <label className="btn btn-sm btn-outline-primary me-2">
                    Change
                    <input
                      type="file"
                      hidden
                      name="thumbnail"
                      onChange={handleThumbnailChange}
                    />
                  </label>
                  <button
                    type="button"
                    className="btn btn-sm btn-outline-danger"
                    onClick={() => {
                      setThumbnailPreview(null);
                      setFormData({ ...formData, thumbnail: "" });
                    }}
                  >
                    Remove
                  </button>
                </div>
              </div>

              {/* Form Grid */}
              <div className="row g-3">
                <div className="col-md-6">
                  <label className="form-label fw-semibold">Course Title</label>
                  <input
                    className="form-control"
                    name="title"
                    value={formData.title}
                    onChange={handleChange}
                  />
                </div>
                <div className="col-md-6">
                  <label className="form-label fw-semibold">Subtitle</label>
                  <input
                    className="form-control"
                    name="subtitle"
                    value={formData.subtitle}
                    onChange={handleChange}
                  />
                </div>
                <div className="col-md-6">
                  <label className="form-label fw-semibold">Category</label>
                  <select
                    className="form-control"
                    name="category"
                    value={formData.category}
                    onChange={handleChange}
                  >
                    <option value="">Select Category</option>
                    <option value="programming">Programming</option>
                    <option value="design">Design</option>
                    <option value="marketing">Marketing</option>
                    <option value="business">Business</option>
                  </select>
                </div>
                <div className="col-md-6">
                  <label className="form-label fw-semibold">Level</label>
                  <select
                    className="form-control"
                    name="level"
                    value={formData.level}
                    onChange={handleChange}
                  >
                    <option value="beginner">Beginner</option>
                    <option value="intermediate">Intermediate</option>
                    <option value="advanced">Advanced</option>
                  </select>
                </div>

                <div className="col-md-6">
                  <label className="form-label fw-semibold">Language</label>
                  <select
                    className="form-control"
                    name="language"
                    value={formData.language}
                    onChange={handleChange}
                  >
                    <option value="english">English</option>
                    <option value="spanish">Spanish</option>
                    <option value="french">French</option>
                  </select>
                </div>
                <div className="col-md-3">
                  <label className="form-label fw-semibold">Price</label>
                  <input
                    type="number"
                    className="form-control"
                    name="price"
                    value={formData.price}
                    onChange={handleChange}
                  />
                </div>
                <div className="col-md-3">
                  <label className="form-label fw-semibold">Discount (%)</label>
                  <input
                    type="number"
                    className="form-control"
                    name="discount"
                    value={formData.discount}
                    onChange={handleChange}
                    min="0"
                    max="100"
                  />
                </div>

                <div className="col-md-6">
                  <label className="form-label fw-semibold">Start Date</label>
                  <input
                    type="date"
                    className="form-control"
                    name="startDate"
                    value={formData.startDate}
                    onChange={handleChange}
                  />
                </div>
                <div className="col-md-6">
                  <label className="form-label fw-semibold">End Date</label>
                  <input
                    type="date"
                    className="form-control"
                    name="endDate"
                    value={formData.endDate}
                    onChange={handleChange}
                  />
                </div>

                <div className="col-12">
                  <label className="form-label fw-semibold">Description</label>
                  <textarea
                    className="form-control"
                    rows="3"
                    name="description"
                    value={formData.description}
                    onChange={handleChange}
                  ></textarea>
                </div>

                {/* Keypoints */}
                <div className="col-12">
                  <label className="form-label fw-semibold">Keypoints (max 10)</label>
                  {formData.keypoints.map((kp, index) => (
                    <input
                      key={index}
                      className="form-control mb-2"
                      value={kp}
                      onChange={(e) => handleKeypointChange(index, e.target.value)}
                    />
                  ))}
                  <button
                    type="button"
                    className="btn btn-sm btn-outline-secondary"
                    onClick={addKeypoint}
                    disabled={formData.keypoints.length >= 10}
                  >
                    + Add Keypoint
                  </button>
                </div>

                {/* Instructor Dropdown */}
                <div className="col-12">
                  <label className="form-label fw-semibold">Instructor</label>
                  <select
                    className="form-control"
                    name="instructor"
                    value={selectedInstructor}
                    onChange={(e) => setSelectedInstructor(e.target.value)}
                  >
                    <option value="">Select Instructor</option>
                    {instructors.map((inst) => (
                      <option key={inst._id} value={inst._id}>
                        {inst.username}
                      </option>
                    ))}
                  </select>
                </div>

                {/* Options */}
                <div className="col-12">
                  <label className="form-label fw-semibold">Options</label>
                  <div className="form-check">
                    <input
                      type="checkbox"
                      className="form-check-input"
                      name="options.personalizedPaths"
                      checked={formData.options.personalizedPaths}
                      onChange={handleChange}
                    />
                    <label className="form-check-label">Personalized Paths</label>
                  </div>
                  <div className="form-check">
                    <input
                      type="checkbox"
                      className="form-check-input"
                      name="options.assignmentsDeadline"
                      checked={formData.options.assignmentsDeadline}
                      onChange={handleChange}
                    />
                    <label className="form-check-label">Assignments Deadline</label>
                  </div>
                  <div className="form-check">
                    <input
                      type="checkbox"
                      className="form-check-input"
                      name="options.attachFiles"
                      checked={formData.options.attachFiles}
                      onChange={handleChange}
                    />
                    <label className="form-check-label">Attach Files</label>
                  </div>
                </div>
              </div>
            </>
          )}

          {/* Step 2: Chapters & Lectures */}
          {step === 2 && (
            <div className="col-12">
              <label className="form-label fw-semibold">Chapters</label>
              {formData.chapters.map((chapter, cIndex) => (
                <div key={cIndex} className="border rounded p-3 mb-3">
                  <input
                    className="form-control mb-2"
                    placeholder="Chapter Title"
                    value={chapter.title}
                    onChange={(e) => {
                      const updated = [...formData.chapters];
                      updated[cIndex].title = e.target.value;
                      setFormData({ ...formData, chapters: updated });
                    }}
                  />
                  <h6>Lectures</h6>
                  {chapter.lectures.map((lecture, lIndex) => (
                    <div key={lIndex} className="mb-2">
                      <input
                        className="form-control mb-1"
                        placeholder="Lecture Title"
                        value={lecture.title}
                        onChange={(e) => {
                          const updated = [...formData.chapters];
                          updated[cIndex].lectures[lIndex].title = e.target.value;
                          setFormData({ ...formData, chapters: updated });
                        }}
                      />
                      <input
                        type="number"
                        className="form-control mb-1"
                        placeholder="Duration (min)"
                        value={lecture.duration}
                        onChange={(e) => {
                          const updated = [...formData.chapters];
                          updated[cIndex].lectures[lIndex].duration = Number(e.target.value); // 👈 convert to number
                          setFormData({ ...formData, chapters: updated });
                        }}
                      />
                      <input
                        className="form-control mb-1"
                        placeholder="Video URL"
                        value={lecture.url}
                        onChange={(e) => {
                          const updated = [...formData.chapters];
                          updated[cIndex].lectures[lIndex].url = e.target.value;
                          setFormData({ ...formData, chapters: updated });
                        }}
                      />
                      <div className="form-check">
                        <input
                          type="checkbox"
                          className="form-check-input"
                          checked={lecture.isPreviewFree}
                          onChange={(e) => {
                            const updated = [...formData.chapters];
                            updated[cIndex].lectures[lIndex].isPreviewFree = e.target.checked;
                            setFormData({ ...formData, chapters: updated });
                          }}
                        />
                        <label className="form-check-label">Free Preview</label>
                      </div>
                    </div>
                  ))}
                  <button
                    type="button"
                    className="btn btn-sm btn-outline-secondary"
                    onClick={() => {
                      const updated = [...formData.chapters];
                      updated[cIndex].lectures.push({
                        title: "",
                        duration: "",
                        url: "",
                        isPreviewFree: false,
                      });
                      setFormData({ ...formData, chapters: updated });
                    }}
                  >
                    + Add Lecture
                  </button>
                </div>
              ))}
              <button
                type="button"
                className="btn btn-sm btn-outline-primary mt-2"
                onClick={() => {
                  setFormData({
                    ...formData,
                    chapters: [...formData.chapters, { title: "", lectures: [] }],
                  });
                }}
              >
                + Add Chapter
              </button>
            </div>
          )}

          {/* Navigation */}
          <div className="mt-4 d-flex justify-content-between">
            {step > 1 && (
              <button
                type="button"
                className="btn btn-secondary"
                onClick={() => setStep(step - 1)}
              >
                Previous
              </button>
            )}
            {step < 2 ? (
              <button
                type="button"
                className="btn btn-primary"
                onClick={() => setStep(step + 1)}
              >
                Next
              </button>
            ) : (
              <button type="submit" className="btn btn-success">
                Save Course
              </button>
            )}
          </div>
        </form>
      </div>
    </div>
  );
};
