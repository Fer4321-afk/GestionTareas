import React, { useState } from "react";
import { useAuth } from "./AuthContext";

const TaskForm = ({ onAddTask }) => {
  const { user } = useAuth();
  const [title, setTitle] = useState("");

  const handleSubmit = (e) => {
    e.preventDefault();

    if (!title.trim() || !user) return;

    const newTask = {
      id: Date.now().toString(),
      title: title.trim(),
      author: user.name, // ¡Aquí añadimos el autor automáticamente!
      userId: user.email, // También podríamos guardar el email para referencia
      columnId: "todo", // O la columna por defecto que uses
      createdAt: new Date().toISOString(),
    };

    onAddTask(newTask);
    setTitle("");
  };

  return (
    <div className="task-form-container">
      {!user ? (
        <p className="login-message">Inicia sesión para crear tareas</p>
      ) : (
        <form onSubmit={handleSubmit} className="task-form">
          <input
            type="text"
            value={title}
            onChange={(e) => setTitle(e.target.value)}
            placeholder="¿Qué necesitas hacer?"
            className="task-input"
          />
          <button
            type="submit"
            className="add-task-btn"
            disabled={!title.trim()}
          >
            Añadir Tarea
          </button>
          <div className="task-author-info">
            <small>
              <img
                src={user.picture}
                alt={user.name}
                width="16"
                height="16"
                style={{ borderRadius: "50%", marginRight: "5px" }}
              />
              Creada por: {user.name}
            </small>
          </div>
        </form>
      )}
    </div>
  );
};

export default TaskForm;
