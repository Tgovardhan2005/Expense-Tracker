import { useState } from "react";

function RegisterForm({ onRegister }) {
  const [username, setUsername] = useState("");
  const [password, setPassword] = useState("");
  const [err, setErr] = useState("");
  const [success, setSuccess] = useState("");

  async function handleSubmit(e) {
    e.preventDefault();
    setErr("");
    setSuccess("");
    try {
      const res = await fetch("https://expense-tracker-backend-oi0v.onrender.com/expense/register", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ username, password }),
      });
      const data = await res.json();
      if (res.ok) {
        setSuccess("Registration successful! Please login.");
        onRegister();
      } else {
        setErr(data.error || "Registration failed");
      }
    } catch {
      setErr("Network error");
    }
  }

  return (
    <form onSubmit={handleSubmit}>
      <h3>Register</h3>
      <div className="form-group">
        <label>Username</label>
        <input value={username} onChange={e => setUsername(e.target.value)} required />
      </div>
      <div className="form-group">
        <label>Password</label>
        <input type="password" value={password} onChange={e => setPassword(e.target.value)} required />
      </div>
      {err && <span>{err}</span>}
      {success && <span style={{ color: "green" }}>{success}</span>}
      <button type="submit">Register</button>
    </form>
  );
}

export default RegisterForm;
