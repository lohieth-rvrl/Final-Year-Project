import React, { useState } from "react";
import { DragDropContext, Droppable, Draggable } from "@hello-pangea/dnd";
import { FaGripVertical, FaEye, FaTrash, FaPen } from "react-icons/fa";

const CourseModules = () => {
  const [modules, setModules] = useState([
    {
      id: "m1",
      title: "Introduction to Social Media Marketing",
      lessons: [
        { id: "l1", title: "Overview of Social Media Platforms", status: "Published" },
        { id: "l2", title: "Key Trends in Social Media", status: "Unpublish" },
      ],
    },
    {
      id: "m2",
      title: "Facebook Marketing",
      lessons: [
        { id: "l3", title: "Setting Up a Facebook Business Page", status: "Published" },
        { id: "l4", title: "Creating Engaging Facebook Content", status: "Unpublish" },
        { id: "l5", title: "Facebook Ad Types & Objectives", status: "Unpublish" },
      ],
    },
    {
      id: "m3",
      title: "Instagram Marketing",
      lessons: [
        { id: "l6", title: "Optimizing Your Instagram Profile", status: "Published" },
        { id: "l7", title: "Instagram Stories for Engagement", status: "Unpublish" },
        { id: "l8", title: "Instagram Stories & Reels for Business", status: "Unpublish" },
        { id: "l9", title: "Instagram Ads: Formats & Targeting", status: "Unpublish" },
      ],
    },
  ]);

  // Handle drag
  const onDragEnd = (result) => {
    const { source, destination, type } = result;

    if (!destination) return; // dropped outside

    if (type === "MODULE") {
      const reorderedModules = Array.from(modules);
      const [removed] = reorderedModules.splice(source.index, 1);
      reorderedModules.splice(destination.index, 0, removed);
      setModules(reorderedModules);
    } else if (type === "LESSON") {
      const moduleIndex = modules.findIndex((m) => m.id === source.droppableId);
      const destModuleIndex = modules.findIndex((m) => m.id === destination.droppableId);

      const sourceLessons = Array.from(modules[moduleIndex].lessons);
      const [removed] = sourceLessons.splice(source.index, 1);

      if (moduleIndex === destModuleIndex) {
        // same module
        sourceLessons.splice(destination.index, 0, removed);
        const updatedModules = [...modules];
        updatedModules[moduleIndex].lessons = sourceLessons;
        setModules(updatedModules);
      } else {
        // move to another module
        const destLessons = Array.from(modules[destModuleIndex].lessons);
        destLessons.splice(destination.index, 0, removed);

        const updatedModules = [...modules];
        updatedModules[moduleIndex].lessons = sourceLessons;
        updatedModules[destModuleIndex].lessons = destLessons;
        setModules(updatedModules);
      }
    }
  };

  return (
    <div className="container my-4">
      <div className="d-flex justify-content-between align-items-center mb-3">
        <h4 className="fw-bold">📘 Modules</h4>
        <button className="btn btn-primary btn-sm">+ Module</button>
      </div>

      <DragDropContext onDragEnd={onDragEnd}>
        <Droppable droppableId="modules" type="MODULE">
          {(provided) => (
            <div {...provided.droppableProps} ref={provided.innerRef}>
              {modules.map((module, moduleIndex) => (
                <Draggable key={module.id} draggableId={module.id} index={moduleIndex}>
                  {(provided) => (
                    <div
                      className="card shadow-sm mb-3"
                      ref={provided.innerRef}
                      {...provided.draggableProps}
                    >
                      <div className="card-header bg-white d-flex justify-content-between align-items-center">
                        <div className="d-flex align-items-center" {...provided.dragHandleProps}>
                          <FaGripVertical className="me-2 text-muted" />
                          <h6 className="mb-0 fw-bold">
                            Module {moduleIndex + 1}: {module.title} ({module.lessons.length} lessons)
                          </h6>
                        </div>
                        <button className="btn btn-link btn-sm text-decoration-none">
                          + Add Lesson
                        </button>
                      </div>

                      {/* Lessons */}
                      <Droppable droppableId={module.id} type="LESSON">
                        {(provided) => (
                          <ul
                            className="list-group list-group-flush"
                            {...provided.droppableProps}
                            ref={provided.innerRef}
                          >
                            {module.lessons.map((lesson, lessonIndex) => (
                              <Draggable
                                key={lesson.id}
                                draggableId={lesson.id}
                                index={lessonIndex}
                              >
                                {(provided) => (
                                  <li
                                    className="list-group-item d-flex justify-content-between align-items-center"
                                    ref={provided.innerRef}
                                    {...provided.draggableProps}
                                  >
                                    <div className="d-flex align-items-center">
                                      <span {...provided.dragHandleProps}>
                                        <FaGripVertical className="me-2 text-muted" />
                                      </span>
                                      <span className="text-primary fw-semibold me-2">
                                        Lesson {lessonIndex + 1}
                                      </span>
                                      <span className="text-muted">{lesson.title}</span>
                                    </div>
                                    <div className="d-flex align-items-center">
                                      <span
                                        className={`badge me-3 ${
                                          lesson.status === "Published"
                                            ? "bg-success-subtle text-success"
                                            : "bg-light text-muted border"
                                        }`}
                                      >
                                        {lesson.status}
                                      </span>
                                      <FaPen className="me-3 text-muted" role="button" />
                                      <FaEye className="me-3 text-muted" role="button" />
                                      <FaTrash className="text-danger" role="button" />
                                    </div>
                                  </li>
                                )}
                              </Draggable>
                            ))}
                            {provided.placeholder}
                          </ul>
                        )}
                      </Droppable>
                    </div>
                  )}
                </Draggable>
              ))}
              {provided.placeholder}
            </div>
          )}
        </Droppable>
      </DragDropContext>

      {/* Footer navigation */}
      <div className="d-flex justify-content-between mt-3">
        <button className="btn btn-light">&larr; Back</button>
        <button className="btn btn-primary">Next &rarr;</button>
      </div>
    </div>
  );
};

export default CourseModules;
