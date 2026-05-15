import { useState } from "react";

function Login({ onLogin }) {
  const [name, setName] = useState("");

  const handleLogin = () => {
    if (name.trim()) {
      localStorage.setItem("user", name);
      onLogin(name);
    }
  };

  return (
    <div className="card">
      <h2>Login</h2>

      <input
        placeholder="Enter your name"
        value={name}
        onChange={(e) => setName(e.target.value)}
      />

      <br />

      <button onClick={handleLogin}>Start</button>
    </div>
  );
}

export default Login;