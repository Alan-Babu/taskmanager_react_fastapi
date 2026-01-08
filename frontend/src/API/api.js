import axios from 'axios';

const API = axios.create({
  baseURL: 'http://localhost:8000',
});

export const LoginUser = (Data) => API.post('/auth/login', Data);
export const RegisterUser = (Data) => API.post('/auth/signup', Data);

export const getTasks = (userId, status) =>
  API.get("/tasks", {
    params: { user_id: userId, status },
  });


export const createTask = (task) => API.post("/tasks", task);
export const updateTask = (id, data) => API.put(`/tasks/${id}`, data);
export const deleteTask = (id) => API.delete(`/tasks/${id}`);

