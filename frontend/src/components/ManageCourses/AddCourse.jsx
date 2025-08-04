import React from 'react'

export const AddCourse = () => {
  return (
    <div className='container'>
        <div className="row">
            <div className="col-md-6"><br />
                <h2 className="fw-bold mb-3">Add New Course</h2>
                <form>
                    <div className="mb-3">  
                        <label htmlFor="courseName" className="form-label">Course Name</label>
                        <input type="text" className="form-control" id="courseName" placeholder="Enter course name" />
                    </div>
                    <div className="mb-3">
                        <label htmlFor="courseDescription" className="form-label">Course Description</label>
                        <textarea className="form-control" id="courseDescription" rows="3" placeholder="Enter course description"></textarea>
                    </div>
                    <div className="mb-3 w-25">
                        <label htmlFor="coursePrice" className="form-label">Course Price</label>
                        <input type="number" className="form-control" id="coursePrice" placeholder="0" />
                    </div>
                    <div className="mb-3">
                        <label htmlFor="courseVideo" className="form-label">Course Video</label>
                        <input type="file" className="form-control" id="courseVideo" />
                    </div>
                    <div className="mb-3 w-25">
                        <label htmlFor="courseDiscount" className="form-label">Course Discount</label>
                        <input type="number" className="form-control" id="courseDiscount" placeholder="0" />
                    </div>
                    {/* next */}
                    <div className="mb-3">
                        <label htmlFor="courseCategory" className="form-label">Course Category</label>
                        <select className="form-select" id="courseCategory">
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
                        <label htmlFor="courseLevel" className="form-label">Course Level</label>
                        <select className="form-select" id="courseLevel">
                            <option value="">Select level</option>
                            <option value="beginner">Beginner</option>
                            <option value="intermediate">Intermediate</option>
                            <option value="advanced">Advanced</option>
                        </select>
                    </div>
                    <button type="submit" className="btn btn-primary">Add Course</button>
                </form>
            </div>
        </div>
    </div>
  )
}
