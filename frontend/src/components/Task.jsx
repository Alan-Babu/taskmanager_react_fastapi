import { useEffect, useState } from "react";
import { useNavigate } from "react-router-dom";
import { getTasks, createTask, deleteTask } from "../API/api";

export default function Task({ onLogout }) {
  const [tasks, setTasks] = useState([]);
  const [title, setTitle] = useState("");
  const [description, setDescription] = useState("");
  const [status, setStatus] = useState("Open");

  const navigate = useNavigate();
  const userId = localStorage.getItem("userId");

  useEffect(() => {
    if (!userId) {
      navigate("/login");
      return;
    }
    loadTasks();
  }, [userId]);

  const loadTasks = async () => {
    const response = await getTasks(userId);
    setTasks(response.data);
  };

  const addTask = async () => {
    if (!title.trim()) {
      alert("Title is required");
      return;
    }

    await createTask({
      id: Date.now(),
      user_id: Number(userId),
      title,
      description,
      status,
    });

    setTitle("");
    setDescription("");
    setStatus("Open");
    loadTasks();
  };

  const removeTask = async (id) => {
    await deleteTask(id);
    loadTasks();
  };

  const handleLogout = () => {
    onLogout();
    navigate("/login");
  };

  return (
    <div className="container">
      <div style={{ display: "flex", justifyContent: "space-between", alignItems: "center" }}>
        <h2>Task Dashboard</h2>
        <button onClick={handleLogout}>Logout</button>
      </div>

      <div className="card">
        <input
          placeholder="Task title"
          value={title}
          onChange={(e) => setTitle(e.target.value)}
        />

        <input
          placeholder="Description"
          value={description}
          onChange={(e) => setDescription(e.target.value)}
        />

        <select value={status} onChange={(e) => setStatus(e.target.value)}>
          <option>Open</option>
          <option>In Progress</option>
          <option>Completed</option>
        </select>

        <button onClick={addTask}>Add Task</button>
      </div>

      <ul className="task-list">
        {tasks.map((task) => (
          <li key={task.id} className="task-item">
            <div>
              <strong>{task.title}</strong>
              <p>{task.description}</p>
              <span className={`status ${task.status.replace(" ", "-")}`}>
                {task.status}
              </span>
            </div>
            <button onClick={() => removeTask(task.id)}>✕</button>
          </li>
        ))}
      </ul>
    </div>
  );
}
