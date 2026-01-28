import React, { useContext } from "react";
import { TaskContext } from "../context/TaskContext";
import TaskCard from "./TaskCard";

const Column = ({ title, status }) => {
  const { tasks } = useContext(TaskContext);
  const filteredTasks = tasks.filter((task) => task.status === status);

  const icons = {
    todo: "📝",
    inProgress: "🚧",
    done: "✅",
  };

  return (
    <div className="column">
      <h2>
        {icons[status]} {title} ({filteredTasks.length})
      </h2>

      {filteredTasks.length === 0 ? (
        <p className="empty-column">No hay tareas aquí</p>
      ) : (
        filteredTasks.map((task) => <TaskCard key={task.id} task={task} />)
      )}
    </div>
  );
};

export default Column;
