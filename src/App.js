import React, { useContext, useState } from "react";
import { TaskContext } from "./context/TaskContext";
import Column from "./components/Column";
import useForm from "./hooks/useForm";
import "./App.css";

function App() {
  const { addTask } = useContext(TaskContext);
  const [showForm, setShowForm] = useState(false);

  const { values, handleChange, resetForm } = useForm({
    title: "",
    description: "",
    priority: "media",
  });

  const handleSubmit = (e) => {
    e.preventDefault();

    if (!values.title.trim()) {
      alert("El título es obligatorio");
      return;
    }

    addTask(values);
    resetForm();
    setShowForm(false);
  };

  return (
    <div className="App">
      <header>
        <h1>📋 Gestor de Tareas Kanban</h1>

        <button onClick={() => setShowForm(!showForm)} className="new-task-btn">
          {showForm ? "❌ Cancelar" : "➕ Nueva Tarea"}
        </button>

        {showForm && (
          <form onSubmit={handleSubmit} className="task-form">
            <h3>Crear Nueva Tarea</h3>

            <div className="form-group">
              <label>Título *</label>
              <input
                type="text"
                name="title"
                value={values.title}
                onChange={handleChange}
                required
                placeholder="Ej: Terminar práctica React"
              />
            </div>

            <div className="form-group">
              <label>Descripción</label>
              <textarea
                name="description"
                value={values.description}
                onChange={handleChange}
                placeholder="Ej: Implementar Context API y localStorage..."
                rows="3"
              />
            </div>

            <div className="form-group">
              <label>Prioridad</label>
              <select
                name="priority"
                value={values.priority}
                onChange={handleChange}
              >
                <option value="baja">✅ Baja</option>
                <option value="media">⚠️ Media</option>
                <option value="alta">🔥 Alta</option>
              </select>
            </div>

            <button type="submit" className="submit-btn">
              Crear Tarea
            </button>
          </form>
        )}
      </header>

      <main>
        <div className="kanban-board">
          <Column title="Pendientes" status="todo" />
          <Column title="En Progreso" status="inProgress" />
          <Column title="Completadas" status="done" />
        </div>
      </main>
    </div>
  );
}

export default App;
