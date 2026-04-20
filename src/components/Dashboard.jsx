import { useEffect, useState } from "react";
import { signOut } from "firebase/auth";
import {
  addDoc,
  collection,
  onSnapshot,
  query,
  where,
  updateDoc,
  deleteDoc,
  doc
} from "firebase/firestore";
import { auth, db } from "../services/firebase";
import TaskForm from "./TaskForm";
import TaskList from "./TaskList";

function Dashboard({ user }) {
  const [tasks, setTasks] = useState([]);
  const [message, setMessage] = useState("");
  const [messageType, setMessageType] = useState("");

  useEffect(() => {
    const q = query(
      collection(db, "tasks"),
      where("userId", "==", user.uid)
    );

    const unsubscribe = onSnapshot(q, (snapshot) => {
      const taskList = snapshot.docs
        .map((doc) => ({
          id: doc.id,
          ...doc.data()
        }))
        .sort((a, b) => new Date(b.createdAt) - new Date(a.createdAt));

      setTasks(taskList);
    });

    return () => unsubscribe();
  }, [user.uid]);

  const handleAddTask = async (title, description) => {
    setMessage("");
    setMessageType("");

    try {
      await addDoc(collection(db, "tasks"), {
        title,
        description,
        status: false,
        userId: user.uid,
        createdAt: new Date().toISOString()
      });

      setMessage("Task added successfully.");
      setMessageType("success");
    } catch (error) {
      setMessage(error.message);
      setMessageType("error");
    }
  };

  const handleToggleStatus = async (taskId, currentStatus) => {
    setMessage("");
    setMessageType("");

    try {
      await updateDoc(doc(db, "tasks", taskId), {
        status: !currentStatus
      });

      setMessage("Task status updated.");
      setMessageType("success");
    } catch (error) {
      setMessage(error.message);
      setMessageType("error");
    }
  };

  const handleDeleteTask = async (taskId) => {
    if (!window.confirm("Delete this task?")) return;

    setMessage("");
    setMessageType("");

    try {
      await deleteDoc(doc(db, "tasks", taskId));
      setMessage("Task deleted.");
      setMessageType("success");
    } catch (error) {
      setMessage(error.message);
      setMessageType("error");
    }
  };

  const handleEditTask = async (taskId, updatedTitle, updatedDescription) => {
    setMessage("");
    setMessageType("");

    if (!updatedTitle.trim()) {
      setMessage("Task title cannot be empty.");
      setMessageType("error");
      return;
    }

    try {
      await updateDoc(doc(db, "tasks", taskId), {
        title: updatedTitle.trim(),
        description: updatedDescription.trim()
      });

      setMessage("Task updated successfully.");
      setMessageType("success");
    } catch (error) {
      setMessage(error.message);
      setMessageType("error");
    }
  };

  const handleLogout = async () => {
    await signOut(auth);
  };

  return (
    <div className="dashboard-container">
      <h2>Task Dashboard</h2>
      <p className="user-email">Logged in as: {user.email}</p>

      <button onClick={handleLogout} className="secondary-btn logout-btn">
        Logout
      </button>

      <TaskForm onAddTask={handleAddTask} />

      {message && (
        <p className={messageType === "success" ? "success-message" : "error-message"}>
          {message}
        </p>
      )}

      <TaskList
        tasks={tasks}
        onToggleStatus={handleToggleStatus}
        onDelete={handleDeleteTask}
        onEdit={handleEditTask}
      />
    </div>
  );
}

export default Dashboard;