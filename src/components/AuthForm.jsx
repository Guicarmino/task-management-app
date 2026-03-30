import { useState } from "react";
import {
  createUserWithEmailAndPassword,
  signInWithEmailAndPassword
} from "firebase/auth";
import { auth } from "../services/firebase";

function AuthForm() {
  const [isRegister, setIsRegister] = useState(false);
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [message, setMessage] = useState("");

  const handleSubmit = async (e) => {
    e.preventDefault();
    setMessage("");

    try {
      if (isRegister) {
        await createUserWithEmailAndPassword(auth, email, password);
        setMessage("Account created successfully.");
      } else {
        await signInWithEmailAndPassword(auth, email, password);
        setMessage("Login successful.");
      }
    } catch (error) {
      setMessage(error.message);
    }
  };

  return (
    <div style={{ maxWidth: "400px", margin: "40px auto" }}>
      <h2>{isRegister ? "Register" : "Login"}</h2>

      <form onSubmit={handleSubmit}>
        <div style={{ marginBottom: "10px" }}>
          <input
            type="email"
            placeholder="Enter email"
            value={email}
            onChange={(e) => setEmail(e.target.value)}
            required
            style={{ width: "100%", padding: "10px" }}
          />
        </div>

        <div style={{ marginBottom: "10px" }}>
          <input
            type="password"
            placeholder="Enter password"
            value={password}
            onChange={(e) => setPassword(e.target.value)}
            required
            style={{ width: "100%", padding: "10px" }}
          />
        </div>

        <button type="submit" style={{ padding: "10px 20px" }}>
          {isRegister ? "Register" : "Login"}
        </button>
      </form>

      <p style={{ marginTop: "10px", color: "green" }}>{message}</p>

      <button
        onClick={() => setIsRegister(!isRegister)}
        style={{ marginTop: "10px", padding: "8px 14px" }}
      >
        Switch to {isRegister ? "Login" : "Register"}
      </button>
    </div>
  );
}

export default AuthForm;