import { useEffect, useState } from "react";
import { signOut } from "firebase/auth";
import {
  addDoc,
  collection,
  onSnapshot,
  query,
  where
} from "firebase/firestore";
import { auth, db } from "../services/firebase";

function Dashboard({ user }) {
  const [title, setTitle] = useState("");
  const [description, setDescription] = useState("");
  const [tasks, setTasks] = useState([]);
  const [message, setMessage] = useState("");

  useEffect(() => {
    const q = query(
      collection(db, "tasks"),
      where("userId", "==", user.uid)
    );

    const unsubscribe = onSnapshot(q, (snapshot) => {
      const taskList = snapshot.docs.map((doc) => ({
        id: doc.id,
        ...doc.data()
      }));
      setTasks(taskList);
    });

    return () => unsubscribe();
  }, [user.uid]);

  const handleAddTask = async (e) => {
    e.preventDefault();
    setMessage("");

    try {
      await addDoc(collection(db, "tasks"), {
        title,
        description,
        status: false,
        userId: user.uid,
        createdAt: new Date().toISOString()
      });

      setTitle("");
      setDescription("");
      setMessage("Task added successfully.");
    } catch (error) {
      setMessage(error.message);
    }
  };

  const handleLogout = async () => {
    await signOut(auth);
  };

  return (
    <div style={{ maxWidth: "700px", margin: "40px auto" }}>
      <h2>Task Dashboard</h2>
      <p>Logged in as: {user.email}</p>

      <button onClick={handleLogout} style={{ marginBottom: "20px", padding: "8px 14px" }}>
        Logout
      </button>

      <form onSubmit={handleAddTask} style={{ marginBottom: "20px" }}>
        <div style={{ marginBottom: "10px" }}>
          <input
            type="text"
            placeholder="Task title"
            value={title}
            onChange={(e) => setTitle(e.target.value)}
            required
            style={{ width: "100%", padding: "10px" }}
          />
        </div>

        <div style={{ marginBottom: "10px" }}>
          <textarea
            placeholder="Task description"
            value={description}
            onChange={(e) => setDescription(e.target.value)}
            rows="4"
            style={{ width: "100%", padding: "10px" }}
          />
        </div>

        <button type="submit" style={{ padding: "10px 20px" }}>
          Add Task
        </button>
      </form>

      <p style={{ color: "green" }}>{message}</p>

      <h3>Your Tasks</h3>
      {tasks.length === 0 ? (
        <p>No tasks yet.</p>
      ) : (
        <ul>
          {tasks.map((task) => (
            <li key={task.id} style={{ marginBottom: "15px" }}>
              <strong>{task.title}</strong>
              <p>{task.description}</p>
              <p>Status: {task.status ? "Completed" : "Pending"}</p>
            </li>
          ))}
        </ul>
      )}
    </div>
  );
}

export default Dashboard;