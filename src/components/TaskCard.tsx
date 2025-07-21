import React from "react";
import { Task } from "../types/Task";

interface TaskCardProps {
  task: Task;
  onDelete: (id: number) => void;
  onUpdate: (id: number, task: Task) => void;
}

const TaskCard: React.FC<TaskCardProps> = ({ task, onDelete, onUpdate }) => (
  <div className="card mb-3">
    <div className="card-body">
      <h5 className="card-title">{task.title}</h5>
      <p className="card-text text-muted">Due: {task.dueDate}</p>
      <p className="card-text">{task.description}</p>
      <select className="form-select mb-2" value={task.status} onChange={(e) => onUpdate(task.id, { ...task, status: e.target.value })}>
        <option>To-Do</option>
        <option>In Progress</option>
        <option>Completed</option>
      </select>
      <button className="btn btn-sm btn-danger" onClick={() => onDelete(task.id)}>
        Delete
      </button>
    </div>
  </div>
);

export default TaskCard;
