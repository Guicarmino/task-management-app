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
  const [messageType, setMessageType] = useState("");

  const handleSubmit = async (e) => {
    e.preventDefault();
    setMessage("");
    setMessageType("");

    if (!email.trim() || !password.trim()) {
      setMessage("Email and password are required.");
      setMessageType("error");
      return;
    }

    if (password.length < 6) {
      setMessage("Password must be at least 6 characters.");
      setMessageType("error");
      return;
    }

    try {
      if (isRegister) {
        await createUserWithEmailAndPassword(auth, email, password);
        setMessage("Account created successfully.");
        setMessageType("success");
      } else {
        await signInWithEmailAndPassword(auth, email, password);
        setMessage("Login successful.");
        setMessageType("success");
      }
    } catch (error) {
      setMessage(error.message);
      setMessageType("error");
    }
  };

  return (
    <div className="auth-container">
      <h2>{isRegister ? "Register" : "Login"}</h2>

      <form onSubmit={handleSubmit}>
        <div className="form-group">
          <input
            type="email"
            placeholder="Enter email"
            value={email}
            onChange={(e) => setEmail(e.target.value)}
            required
            className="form-input"
          />
        </div>

        <div className="form-group">
          <input
            type="password"
            placeholder="Enter password"
            value={password}
            onChange={(e) => setPassword(e.target.value)}
            required
            className="form-input"
          />
        </div>

        <button type="submit" className="primary-btn">
          {isRegister ? "Register" : "Login"}
        </button>
      </form>

      {message && (
        <p className={messageType === "success" ? "success-message" : "error-message"}>
          {message}
        </p>
      )}

      <button
        onClick={() => {
          setIsRegister(!isRegister);
          setMessage("");
          setMessageType("");
        }}
        className="secondary-btn"
      >
        Switch to {isRegister ? "Login" : "Register"}
      </button>
    </div>
  );
}

export default AuthForm;