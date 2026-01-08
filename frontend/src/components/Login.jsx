import { useState } from "react";
import { useNavigate } from "react-router-dom";
import { LoginUser } from "../API/api";

export default function Login({ onLogin }) {
  const [username, setUsername] = useState("");
  const [password, setPassword] = useState("");
  const navigate = useNavigate();

  const handlelogin = async () => {
    try {
      const response = await LoginUser({ username, password });
      onLogin(response.data.token, response.data.user_id);
      navigate("/tasks"); // ✅ URL change
    } catch {
      alert("Invalid credentials");
    }
  };

  return (
    <div className="card">
      <h2>Login</h2>

      <input
        type="text"
        placeholder="Username"
        value={username}
        onChange={(e) => setUsername(e.target.value)}
      />

      <input
        type="password"
        placeholder="Password"
        value={password}
        onChange={(e) => setPassword(e.target.value)}
      />

      <button onClick={handlelogin}>Login</button>

      <p style={{ marginTop: "10px", textAlign: "center" }}>
        New user?{" "}
        <span
          style={{ color: "#1976d2", cursor: "pointer" }}
          onClick={() => navigate("/register")}
        >
          Register here
        </span>
      </p>
    </div>
  );
}
