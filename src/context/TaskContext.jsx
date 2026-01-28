import React, { createContext, useState, useEffect } from "react";

export const TaskContext = createContext();

export const TaskProvider = ({ children }) => {
  const [tasks, setTasks] = useState([]);

  // Cargar tareas guardadas
  useEffect(() => {
    const savedTasks = localStorage.getItem("mis-tareas");
    if (savedTasks) {
      setTasks(JSON.parse(savedTasks));
    }
  }, []);

  // Guardar cuando cambien
  useEffect(() => {
    localStorage.setItem("mis-tareas", JSON.stringify(tasks));
  }, [tasks]);

  // Añadir tarea nueva
  const addTask = (newTask) => {
    setTasks([
      ...tasks,
      {
        ...newTask,
        id: Date.now(),
        status: "todo",
      },
    ]);
  };

  // Borrar tarea
  const deleteTask = (id) => {
    setTasks(tasks.filter((task) => task.id !== id));
  };

  // Cambiar de columna
  const moveTask = (id, newStatus) => {
    setTasks(
      tasks.map((task) =>
        task.id === id ? { ...task, status: newStatus } : task,
      ),
    );
  };

  const value = {
    tasks,
    addTask,
    deleteTask,
    moveTask,
  };

  return <TaskContext.Provider value={value}>{children}</TaskContext.Provider>;
};
/*
Git
*/
