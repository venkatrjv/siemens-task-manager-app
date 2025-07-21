import React, { useState } from "react";
import { BrowserRouter as Router, Route, Routes, Navigate } from "react-router-dom";
import Login from "./components/Login";
import Dashboard from "./components/Dashboard";
import "bootstrap/dist/css/bootstrap.min.css";

const App: React.FC = () => {
  const [loggedIn, setLoggedIn] = useState<boolean>(!!localStorage.getItem("token"));

  return (
    <Router>
      <Routes>
        <Route path="/" element={<Navigate to={loggedIn ? "/dashboard" : "/login"} />} />
        <Route path="/login" element={<Login onLogin={() => setLoggedIn(true)} />} />
        <Route path="/dashboard" element={loggedIn ? <Dashboard /> : <Navigate to="/login" />} />
      </Routes>
    </Router>
  );
};

export default App;
