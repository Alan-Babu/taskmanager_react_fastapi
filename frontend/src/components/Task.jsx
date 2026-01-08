import { useEffect, useState, useCallback } from "react";
import { useNavigate } from "react-router-dom";
import { getTasks, createTask, deleteTask, updateTask } from "../API/api";

export default function Task({ onLogout }) {
  const [tasks, setTasks] = useState([]);
  const [title, setTitle] = useState("");
  const [description, setDescription] = useState("");
  const [status, setStatus] = useState("Open");
  const [filterStatus, setFilterStatus] = useState("All");
  const [editingTaskId, setEditingTaskId] = useState(null);
  const [editTitle, setEditTitle] = useState("");

  const navigate = useNavigate();
  const userId = localStorage.getItem("userId");

  const loadTasks = useCallback(async () => {
    const response = await getTasks(userId);
    setTasks(response.data);
  }, [userId]);

  useEffect(() => {
    if (!userId) {
      navigate("/login");
      return;
    }
    loadTasks();
  }, [userId, loadTasks, navigate]);

  

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

  const startEdit = (task) => {
      setEditingTaskId(task.id);
      setEditTitle(task.title);
    };

  const saveTitle = async (taskId) => {
    if (!editTitle.trim()) {
      alert("Title cannot be empty");
      return;
    }

    await updateTask(taskId, { title: editTitle });
    setEditingTaskId(null);
    loadTasks();
  };

  const cancelEdit = () => {
    setEditingTaskId(null);
    setEditTitle("");
  };


  const removeTask = async (id) => {
    await deleteTask(id);
    loadTasks();
  };

  const changeStatus = async (taskId, newStatus) => {
    await updateTask(taskId, { status: newStatus });
    loadTasks();
  };

  const handleLogout = () => {
    onLogout();
    navigate("/login");
  };

  const filteredTasks = filterStatus === "All"
    ? tasks
    : tasks.filter((task) => task.status === filterStatus);

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

      <div className="card">
        <label>Filter by Status:</label>
        <select
          value={filterStatus}
          onChange={(e) => setFilterStatus(e.target.value)}
        >
          <option value="All">All</option>
          <option value="Open">Open</option>
          <option value="In Progress">In Progress</option>
          <option value="Completed">Completed</option>
        </select>
      </div>

      <ul className="task-list">
        {filteredTasks.map((task) => (
          <li key={task.id} className="task-item">
            <div>
              {editingTaskId === task.id ? (
                <>
                  <input
                    value={editTitle}
                    onChange={(e) => setEditTitle(e.target.value)}
                  />
                  <button onClick={() => saveTitle(task.id)}>Save</button>
                  <button onClick={cancelEdit}>Cancel</button>
                </>
              ) : (
                <>
                  <strong>{task.title}</strong>
                  <button onClick={() => startEdit(task)}>Edit</button>
                </>
              )}

              <p>{task.description}</p>
              <select
                value={task.status}
                onChange={(e) => changeStatus(task.id, e.target.value)}
              >
                <option value="Open">Open</option>
                <option value="In Progress">In Progress</option>
                <option value="Completed">Completed</option>
              </select>
            </div>
            <button onClick={() => removeTask(task.id)}>✕</button>
          </li>
        ))}
      </ul>
    </div>
  );
}
