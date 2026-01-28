import React, { useContext } from "react";
import { TaskContext } from "../context/TaskContext";
import TaskCard from "./TaskCard";

const Column = ({ title, status }) => {
  const { tasks } = useContext(TaskContext);
  const filteredTasks = tasks.filter((task) => task.status === status);

  return (
    <div className="column">
      <h2>
        {title} ({filteredTasks.length})
      </h2>

      {filteredTasks.length === 0 ? (
        <p className="empty-column">Vacío</p>
      ) : (
        filteredTasks.map((task) => <TaskCard key={task.id} task={task} />)
      )}
    </div>
  );
};

export default Column;
/*
Git
*/
