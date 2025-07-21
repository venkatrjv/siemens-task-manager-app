import React, { useState } from "react";
import { useNavigate } from "react-router-dom";

interface LoginProps {
  onLogin: () => void;
}

const Login: React.FC<LoginProps> = ({ onLogin }) => {
  const [username, setUsername] = useState("");
  const [password, setPassword] = useState("");
  const navigate = useNavigate();

  // login
  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    if (username && password) {
      localStorage.setItem("token", "xyz-token");
      onLogin();
      navigate("/dashboard");
    }
  };

  return (
    <div className="d-flex justify-content-center align-items-center vh-100 bg-light">
      <form onSubmit={handleSubmit} className="bg-white p-4 rounded shadow w-100" style={{ maxWidth: "400px" }}>
        <h2 className="mb-4">Login</h2>
        <input className="form-control mb-3" placeholder="Username" value={username} onChange={(e) => setUsername(e.target.value)} />
        <input className="form-control mb-3" type="password" placeholder="Password" value={password} onChange={(e) => setPassword(e.target.value)} />
        <button className="btn btn-primary w-100">Login</button>
      </form>
    </div>
  );
};

export default Login;
