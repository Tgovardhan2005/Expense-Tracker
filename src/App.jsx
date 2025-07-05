import { useState } from "react";
import ExpenseTrackerContainer from "./components/ExpenseTrackerContainer";
import LoginForm from "./components/LoginForm";
import RegisterForm from "./components/RegisterForm";

function App() {
  const [token, setToken] = useState(localStorage.getItem("token") || "");
  const [showRegister, setShowRegister] = useState(false);

  function handleLogin(token) {
    setToken(token);
    localStorage.setItem("token", token);
  }

  function handleLogout() {
    setToken("");
    localStorage.removeItem("token");
  }

  return (
    <div>
      {!token ? (
        <div className="auth-container">
          {showRegister ? (
            <>
              <RegisterForm onRegister={() => setShowRegister(false)} />
              <button className="small-button" onClick={() => setShowRegister(false)}>Back to Login</button>
            </>
          ) : (
            <>
              <LoginForm onLogin={handleLogin} />
              <button className="small-button" onClick={() => setShowRegister(true)}>Register</button>
            </>
          )}
        </div>
      ) : (
        <>
          <button className="logout-btn" onClick={handleLogout}>Logout</button>
          <ExpenseTrackerContainer token={token} />
        </>
      )}
    </div>
  );
}

export default App;