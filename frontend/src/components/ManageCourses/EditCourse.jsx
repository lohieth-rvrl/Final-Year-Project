import React, { useState, useEffect } from "react";
import axios from "axios";
import { useParams } from "react-router-dom";

export const EditCourse = () => {
  const { courseId } = useParams();
  const [formData, setFormData] = useState({
    title: "",
    subtitle: "",
    description: "",
    keypoints: "",
    thumbnail: null,
    price: "",
    discount: "",
    category: "",
    level: "",
    chapters: [
      {
        title: "",
        lectures: [{ title: "", duration: "", url: "", isPreviewFree: false }]
      }
    ]
  });

  const [errors, setErrors] = useState({});
  const [success, setSuccess] = useState("");
  const [loading, setLoading] = useState(false);

  useEffect(() => {
    const fetchCourse = async () => {
      try {
        const { data } = await axios.get(`http://localhost:7001/api/course/course/${courseId}`);
        setFormData({
          title: data.title || "",
          subtitle: data.subtitle || "",
          description: data.description || "",
          keypoints: data.keypoints ? data.keypoints.join(", ") : "",
          thumbnail: null, // We don’t set file here; file input is empty by default
          price: data.price || "",
          discount: data.discount || "",
          category: data.category || "",
          level: data.level || "",
          chapters: data.chapters && data.chapters.length ? data.chapters : [
            { title: "", lectures: [{ title: "", duration: "", url: "", isPreviewFree: false }] }
          ],
        });
      } catch (err) {
        setErrors({ server: "Failed to load course data" });
      }
    };
    fetchCourse();
  }, [courseId]);

  const handleChange = (e) => {
    const { name, value, files } = e.target;
    setFormData((prev) => ({
      ...prev,
      [name]: files ? files[0] : value
    }));
  };

  const handleChapterChange = (chapterIndex, field, value) => {
    const updatedChapters = [...formData.chapters];
    updatedChapters[chapterIndex][field] = value;
    setFormData({ ...formData, chapters: updatedChapters });
  };

  const handleLectureChange = (chapterIndex, lectureIndex, field, value) => {
    const updatedChapters = [...formData.chapters];
    updatedChapters[chapterIndex].lectures[lectureIndex][field] = value;
    setFormData({ ...formData, chapters: updatedChapters });
  };

  const addChapter = () => {
    setFormData((prev) => ({
      ...prev,
      chapters: [
        ...prev.chapters,
        { title: "", lectures: [{ title: "", duration: "", url: "", isPreviewFree: false }] }
      ]
    }));
  };

  const addLecture = (chapterIndex) => {
    const updatedChapters = [...formData.chapters];
    updatedChapters[chapterIndex].lectures.push({
      title: "",
      duration: "",
      url: "",
      isPreviewFree: false
    });
    setFormData({ ...formData, chapters: updatedChapters });
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    setLoading(true);
    try {
      const formDataToSend = new FormData();

      Object.entries(formData).forEach(([key, value]) => {
        if (key === "thumbnail") {
          if (value) formDataToSend.append("thumbnail", value);
        } else if (key === "keypoints") {
          formDataToSend.append("keypoints", value);
        } else if (key === "chapters") {
          formDataToSend.append("chapters", JSON.stringify(value));
        } else {
          formDataToSend.append(key, value);
        }
      });

      const res = await axios.put(
        `http://localhost:7001/api/course/editcourse/${courseId}`,
        formDataToSend,
        { headers: { "Content-Type": "multipart/form-data" } }
      );

      setSuccess(res.data.message || "Course updated successfully");
      setErrors({});
    } catch (err) {
      setErrors({ server: err.response?.data?.message || "Server error" });
      setSuccess("");
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="container py-4">
      <h2 className="fw-bold mb-3">Edit Course</h2>

      {success && <div className="alert alert-success">{success}</div>}
      {errors.server && <div className="alert alert-danger">{errors.server}</div>}

      <form onSubmit={handleSubmit}>
        {/* Basic Fields */}
        {[
          { label: "Course Name", name: "title", type: "text" },
          { label: "Course Subtitle", name: "subtitle", type: "text" },
          { label: "Course Description", name: "description", type: "textarea" },
          { label: "Course Key Points", name: "keypoints", type: "text", placeholder: "comma separated" },
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

        {/* Category */}
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

        {/* Level */}
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

        {/* Chapters & Lectures */}
        <h4>Chapters</h4>
        {formData.chapters.map((chapter, chapterIndex) => (
          <div key={chapterIndex} className="border p-3 mb-3">
            <div className="mb-2">
              <label>Chapter Title</label>
              <input
                type="text"
                className="form-control"
                value={chapter.title}
                onChange={(e) =>
                  handleChapterChange(chapterIndex, "title", e.target.value)
                }
              />
            </div>
            <h5>Lectures</h5>
            {chapter.lectures.map((lecture, lectureIndex) => (
              <div key={lectureIndex} className="mb-3 p-2 border">
                <input
                  type="text"
                  placeholder="Lecture Title"
                  className="form-control mb-1"
                  value={lecture.title}
                  onChange={(e) =>
                    handleLectureChange(chapterIndex, lectureIndex, "title", e.target.value)
                  }
                />
                <input
                  type="number"
                  placeholder="Duration (min)"
                  className="form-control mb-1"
                  value={lecture.duration}
                  onChange={(e) =>
                    handleLectureChange(chapterIndex, lectureIndex, "duration", e.target.value)
                  }
                />
                <input
                  type="text"
                  placeholder="Video URL"
                  className="form-control mb-1"
                  value={lecture.url}
                  onChange={(e) =>
                    handleLectureChange(chapterIndex, lectureIndex, "url", e.target.value)
                  }
                />
                <label className="form-check-label">
                  <input
                    type="checkbox"
                    className="form-check-input me-2"
                    checked={lecture.isPreviewFree}
                    onChange={(e) =>
                      handleLectureChange(chapterIndex, lectureIndex, "isPreviewFree", e.target.checked)
                    }
                  />
                  Free Preview
                </label>
              </div>
            ))}
            <button
              type="button"
              className="btn btn-sm btn-secondary mt-2"
              onClick={() => addLecture(chapterIndex)}
            >
              + Add Lecture
            </button>
          </div>
        ))}
        <button type="button" className="btn btn-secondary mb-3" onClick={addChapter}>
          + Add Chapter
        </button>

        <button type="submit" className="btn btn-primary" disabled={loading}>
          {loading ? "Updating..." : "Update Course"}
        </button>
      </form>
    </div>
  );
};

export default EditCourse;