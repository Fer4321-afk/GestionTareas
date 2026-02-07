import React, { useContext } from "react";
import { TaskContext } from "../../context/TaskContext";

const TaskCard = ({ task }) => {
  const { deleteTask, moveTask } = useContext(TaskContext);

  // Colores según prioridad
  const priorityColors = {
    alta: "red",
    media: "orange",
    baja: "green",
  };

  return (
    <div className="task-card">
      <h3>{task.title}</h3>

      <p className="task-description">
        {task.description || "Sin descripción"}
      </p>

      <div className="task-actions">
        <span
          className="priority-badge"
          style={{
            backgroundColor: priorityColors[task.priority],
          }}
        >
          {task.priority}
        </span>

        <div className="action-buttons">
          {task.status !== "todo" && (
            <button
              onClick={() => {
                if (task.status === "inProgress") moveTask(task.id, "todo");
                if (task.status === "done") moveTask(task.id, "inProgress");
              }}
              className="move-btn"
            >
              ←
            </button>
          )}

          {task.status !== "done" && (
            <button
              onClick={() => {
                if (task.status === "todo") moveTask(task.id, "inProgress");
                if (task.status === "inProgress") moveTask(task.id, "done");
              }}
              className="move-btn"
            >
              →
            </button>
          )}

          <button
            onClick={() => {
              if (window.confirm("¿Borrar esta tarea?")) {
                deleteTask(task.id);
              }
            }}
            className="delete-btn"
          >
            X
          </button>
        </div>
      </div>
    </div>
  );
};

export default TaskCard;
/*
Git
*/
