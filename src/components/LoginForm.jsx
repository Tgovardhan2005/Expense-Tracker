import { useState } from "react";

function LoginForm({ onLogin }) {
  const [username, setUsername] = useState("");
  const [password, setPassword] = useState("");
  const [err, setErr] = useState("");

  async function handleSubmit(e) {
    e.preventDefault();
    setErr("");
    try {
      const res = await fetch("https://expense-tracker-backend-oi0v.onrender.com/expense/login", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ username, password }),
      });
      const data = await res.json();
      if (res.ok && data.token) {
        onLogin(data.token);
      } else {
        setErr(data.error || "Login failed");
      }
    } catch {
      setErr("Network error");
    }
  }

  return (
    <form onSubmit={handleSubmit}>
      <h3>Login</h3>
      <div className="form-group">
        <label>Username</label>
        <input value={username} onChange={e => setUsername(e.target.value)} required />
      </div>
      <div className="form-group">
        <label>Password</label>
        <input type="password" value={password} onChange={e => setPassword(e.target.value)} required />
      </div>
      {err && <span>{err}</span>}
      <button type="submit">Login</button>
    </form>
  );
}

export default LoginForm;
