import React, { useState, useEffect } from "react";
import { useNavigate } from "react-router-dom";
import { useAuth } from "../../context/AuthContext.jsx";
import { roles } from "../../data/users.js";
import { homeFor } from "../../utils/permissions.js";

export default function Login() {
  const { login } = useAuth();
  const navigate = useNavigate();
  const [selected, setSelected] = useState(null);
  const [username, setUsername] = useState("");
  const [password, setPassword] = useState("");
  const [error, setError] = useState("");

  useEffect(() => {
    if (selected) {
      const r = roles.find((r) => r.id === selected);
      setUsername(r ? r.defaultName : "");
      setError("");
    }
  }, [selected]);

  const handleSubmit = async () => {
    try {
      const loggedInUser = await login(selected, username, password);
      navigate(homeFor(loggedInUser.role), { replace: true });
    } catch (err) {
      setError(err.message);
    }
  };

  const handleKeyDown = (e) => {
    if (e.key === "Enter") {
      e.preventDefault();
      handleSubmit();
    }
  };

  return (
    <div className="login-wrap">
      <div className="login-card">
        <div className="login-brand">WalangBrownout</div>
        <div className="login-sub">Inventory Management System — sign in to continue</div>
        <div className="role-grid">
          {roles.map((r) => (
            <div
              key={r.id}
              className={"role-tile " + (selected === r.id ? "selected" : "")}
              onClick={() => setSelected(r.id)}
            >
              <i className={"bi " + r.icon}></i>
              <div className="role-label">{r.label}</div>
              <div className="role-desc">{r.desc}</div>
            </div>
          ))}
        </div>
        <div onKeyDown={handleKeyDown}>
          <label className="field-label-sm">Username</label>
          <input
            className="search-input w-100 mb-2"
            value={username}
            onChange={(e) => setUsername(e.target.value)}
            placeholder="Enter username"
          />
          <label className="field-label-sm">Password</label>
          <input
            type="password"
            className="search-input w-100 mb-2"
            value={password}
            onChange={(e) => setPassword(e.target.value)}
            placeholder="Enter password"
          />
          {error && <div className="login-error">{error}</div>}
          <button type="button" className="btn-tan w-100 py-2 fw-bold mt-2" onClick={handleSubmit}>
            Log In
          </button>
        </div>
        <div className="login-hint">Demo prototype — choose any role, then enter a username and any password.</div>
      </div>
    </div>
  );
}
