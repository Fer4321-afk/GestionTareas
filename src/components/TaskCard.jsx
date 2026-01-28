import React, { useContext } from "react";
import { TaskContext } from "../context/TaskContext";

const TaskCard = ({ task }) => {
  const { deleteTask, moveTask } = useContext(TaskContext);

  const priorityColors = {
    alta: "#f87171",
    media: "#fbbf24",
    baja: "#34d399",
  };

  const getNextStatus = (currentStatus) => {
    if (currentStatus === "todo") return "inProgress";
    if (currentStatus === "inProgress") return "done";
    return "todo";
  };

  const getPrevStatus = (currentStatus) => {
    if (currentStatus === "done") return "inProgress";
    if (currentStatus === "inProgress") return "todo";
    return "done";
  };

  return (
    <div
      className="task-card"
      style={{ borderLeft: `5px solid ${priorityColors[task.priority]}` }}
    >
      <h3>{task.title}</h3>

      <p className="task-description">
        {task.description || "Sin descripción"}
      </p>

      <div className="task-actions">
        <span
          className="priority-badge"
          style={{ backgroundColor: priorityColors[task.priority] }}
        >
          {task.priority === "alta"
            ? "🔥 ALTA"
            : task.priority === "media"
              ? "⚠️ MEDIA"
              : "✅ BAJA"}
        </span>

        <div className="action-buttons">
          {task.status !== "todo" && (
            <button
              onClick={() => moveTask(task.id, getPrevStatus(task.status))}
              className="move-btn prev-btn"
            >
              ←
            </button>
          )}

          {task.status !== "done" && (
            <button
              onClick={() => moveTask(task.id, getNextStatus(task.status))}
              className="move-btn next-btn"
            >
              →
            </button>
          )}

          <button
            onClick={() => {
              if (window.confirm("¿Eliminar esta tarea?")) {
                deleteTask(task.id);
              }
            }}
            className="delete-btn"
          >
            🗑️
          </button>
        </div>
      </div>
    </div>
  );
};

export default TaskCard;
