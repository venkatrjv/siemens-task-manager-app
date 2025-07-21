import React, { useEffect, useState } from "react";
import TaskCard from "./TaskCard";
import { Task } from "../types/Task";
import { useNavigate } from "react-router-dom";
import { addTask, deleteTask, fetchTasks, updateTask } from "../api/api";

const Dashboard: React.FC = () => {
  const [tasks, setTasks] = useState<Task[]>([]);
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState<string | null>(null);
  const [newTask, setNewTask] = useState<Omit<Task, "id">>({
    title: "",
    description: "",
    status: "To-Do",
    dueDate: "",
  });

  const navigate = useNavigate();

  // Redirect to login if not logged in
  useEffect(() => {
    const user = localStorage.getItem("token");
    if (!user) navigate("/login");
  }, [navigate]);

  // logout
  const logout = () => {
    localStorage.removeItem("token");
    navigate("/login");
  };

  useEffect(() => {
    const loadTasks = async () => {
      try {
        setLoading(true);
        const data = await fetchTasks();
        setTasks(data);
      } catch {
        setError("Failed to load tasks");
      } finally {
        setLoading(false);
      }
    };
    loadTasks();
  }, []);

  // add new task
  const handleAddTask = async () => {
    try {
      const created = await addTask(newTask);
      setTasks((prev) => [...prev, created]);
      setNewTask({ title: "", description: "", status: "To-Do", dueDate: "" });
    } catch {
      setError("Failed to add task");
    }
  };

  // update new task
  const handleUpdateTask = async (id: number, updatedTask: Task) => {
    try {
      const result = await updateTask(id, updatedTask);
      setTasks((prev) => prev.map((task) => (task.id === id ? result : task)));
    } catch {
      setError("Failed to update task");
    }
  };

  // delete new task
  const handleDeleteTask = async (id: number) => {
    if (window.confirm("Are you sure you want to delete this task?")) {
      try {
        await deleteTask(id);
        setTasks((prev) => prev.filter((task) => task.id !== id));
      } catch {
        setError("Failed to delete task");
      }
    }
  };

  return (
    <div className="container py-4">
      <div className="d-flex justify-content-between align-items-center mb-4">
        <h1>Task Dashboard</h1>
        <button onClick={logout} className="btn btn-outline-danger">
          Logout
        </button>
      </div>
      {loading && <p>Loading...</p>}
      {error && <p className="text-danger">{error}</p>}

      <div className="card mb-4">
        <div className="card-body">
          <h5 className="card-title">Add Task</h5>
          <div className="row mb-2">
            <div className="col-12 col-md-6 mb-2 mb-md-0">
              <input
                className="form-control"
                placeholder="Title"
                value={newTask.title}
                onChange={(e) => setNewTask({ ...newTask, title: e.target.value })}
              />
            </div>
            <div className="col-12 col-md-6">
              <input
                type="date"
                className="form-control"
                value={newTask.dueDate}
                onChange={(e) => setNewTask({ ...newTask, dueDate: e.target.value })}
              />
            </div>
          </div>
          <textarea
            className="form-control mb-2"
            placeholder="Description"
            value={newTask.description}
            onChange={(e) => setNewTask({ ...newTask, description: e.target.value })}
          />
          <button onClick={handleAddTask} className="btn btn-success">
            Add Task
          </button>
        </div>
      </div>
      <div className="row">
        {tasks.map((task) => (
          <div key={task.id} className="col-12 col-md-6 col-lg-4 mb-4">
            <TaskCard key={task.id} task={task} onDelete={handleDeleteTask} onUpdate={handleUpdateTask} />
          </div>
        ))}
      </div>
    </div>
  );
};

export default Dashboard;
