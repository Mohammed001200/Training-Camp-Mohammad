import { useState, useEffect } from "react";

function App() {
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [message, setMessage] = useState("");
  const [user, setUser] = useState(null); // <-- lagrar info om inloggad användare

  useEffect(() => {
    // Kolla om användaren redan är inloggad via localStorage
    const savedUser = localStorage.getItem("user");
    if (savedUser) {
      setUser(JSON.parse(savedUser));
    }
  }, []);

  const handleLogin = async () => {
    try {
      const res = await fetch("http://localhost:4000/auth/login", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ email, password }),
      });
      const data = await res.json();
      const token = data.token || data.accessToken;

      if (token) {
        const loggedInUser = { email, token };
        setUser(loggedInUser);
        localStorage.setItem("user", JSON.stringify(loggedInUser));
        setMessage("");
      } else {
        setMessage("Login failed");
      }
    } catch (err) {
      setMessage("Error logging in");
      console.error(err);
    }
  };

  const handleLogout = () => {
    setUser(null);
    localStorage.removeItem("user");
    setEmail("");
    setPassword("");
    setMessage("");
  };

  // Om användaren är inloggad, visa dashboard
if (user) {
  return (
    <div className="form-container">
      <h1>Welcome, {user.email}!</h1>
      <p>Your token: {user.token}</p>

      <h2>Your Dashboard</h2>
      <ul>
        <li>Task 1: Finish project</li>
        <li>Task 2: Study React</li>
        <li>Task 3: Build login page</li>
      </ul>

      <button onClick={handleLogout}>Logout</button>
    </div>
  );
}

  // Annars visa login-formen
  return (
    <div className="form-container">
      <h1>Login</h1>
      <input
        type="email"
        placeholder="Email"
        value={email}
        onChange={(e) => setEmail(e.target.value)}
      />
      <input
        type="password"
        placeholder="Password"
        value={password}
        onChange={(e) => setPassword(e.target.value)}
      />
      <button onClick={handleLogin}>Login</button>
      {message && <p>{message}</p>}
    </div>
  );
}

export default App;
