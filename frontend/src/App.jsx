import { BrowserRouter, Routes, Route, Navigate } from "react-router-dom";
import { useState } from "react";
import Login from "./components/Login";
import Register from "./components/Register";
import Task from "./components/Task";

function App() {
  const [token, setToken] = useState(() => localStorage.getItem("token"));

  const handleLogin = (token, userId) => {
    localStorage.setItem("token", token);
    localStorage.setItem("userId", userId);
    setToken(token);
  };

  const handleLogout = () => {
    localStorage.removeItem("token");
    localStorage.removeItem("userId");
    setToken(null);
  };

  return (
    <BrowserRouter>
      <Routes>
        <Route
          path="/login"
          element={
            token ? <Navigate to="/tasks" replace /> : <Login onLogin={handleLogin} />
          }
        />

        <Route
          path="/register"
          element={
            token ? <Navigate to="/tasks" replace /> : <Register />
          }
        />

        <Route
          path="/tasks"
          element={
            token ? <Task onLogout={handleLogout} /> : <Navigate to="/login" replace />
          }
        />

        <Route path="*" element={<Navigate to="/login" replace />} />
      </Routes>
    </BrowserRouter>
  );
}

export default App;
