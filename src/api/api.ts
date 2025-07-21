import axios from "axios";
import { Task } from "../types/Task";

const API_BASE = "http://localhost:3001";

export const fetchTasks = async (): Promise<Task[]> => {
    const res = await axios.get<Task[]>(`${API_BASE}/tasks`);
    return res.data;
};

export const addTask = async (task: Omit<Task, "id">): Promise<Task> => {
    const res = await axios.post<Task>(`${API_BASE}/tasks`, task);
    return res.data;
};

export const updateTask = async (id: number, updatedTask: Task): Promise<Task> => {
    const res = await axios.put<Task>(`${API_BASE}/tasks/${id}`, updatedTask);
    return res.data;
};

export const deleteTask = async (id: number): Promise<void> => {
    await axios.delete(`${API_BASE}/tasks/${id}`);
};
