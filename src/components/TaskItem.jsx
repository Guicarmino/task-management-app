import { useState } from "react";

function TaskItem({ task, onToggleStatus, onDelete, onEdit }) {
  const [isEditing, setIsEditing] = useState(false);
  const [editTitle, setEditTitle] = useState(task.title);
  const [editDescription, setEditDescription] = useState(task.description || "");
  const [editError, setEditError] = useState("");

  const handleSave = async () => {
    setEditError("");

    if (!editTitle.trim()) {
      setEditError("Task title cannot be empty.");
      return;
    }

    if (editTitle.trim().length < 3) {
      setEditError("Task title must be at least 3 characters.");
      return;
    }

    await onEdit(task.id, editTitle, editDescription);
    setIsEditing(false);
  };

  const handleCancel = () => {
    setEditTitle(task.title);
    setEditDescription(task.description || "");
    setEditError("");
    setIsEditing(false);
  };

  return (
    <li
      style={{
        marginBottom: "15px",
        padding: "15px",
        border: "1px solid #ccc",
        borderRadius: "8px",
        backgroundColor: task.status ? "#e6ffe6" : "#fff"
      }}
    >
      {isEditing ? (
        <>
          <div style={{ marginBottom: "10px" }}>
            <input
              type="text"
              value={editTitle}
              onChange={(e) => setEditTitle(e.target.value)}
              style={{ width: "100%", padding: "10px" }}
            />
          </div>

          <div style={{ marginBottom: "10px" }}>
            <textarea
              value={editDescription}
              onChange={(e) => setEditDescription(e.target.value)}
              rows="4"
              style={{ width: "100%", padding: "10px" }}
            />
          </div>

          {editError && (
            <p
              style={{
                color: "#b91c1c",
                backgroundColor: "#fee2e2",
                padding: "10px 12px",
                borderRadius: "8px",
                marginBottom: "10px"
              }}
            >
              {editError}
            </p>
          )}

          <div style={{ marginTop: "10px" }}>
            <button onClick={handleSave} style={{ marginRight: "10px" }}>
              Save
            </button>

            <button onClick={handleCancel}>Cancel</button>
          </div>
        </>
      ) : (
        <>
          <strong
            style={{
              textDecoration: task.status ? "line-through" : "none"
            }}
          >
            {task.title}
          </strong>

          <p>{task.description}</p>

          <p>Status: {task.status ? "Completed" : "Pending"}</p>

          <div style={{ marginTop: "10px" }}>
            <button
              onClick={() => onToggleStatus(task.id, task.status)}
              style={{ marginRight: "10px" }}
            >
              {task.status ? "Mark as Pending" : "Mark as Completed"}
            </button>

            <button
              onClick={() => {
                setIsEditing(true);
                setEditError("");
              }}
              style={{ marginRight: "10px" }}
            >
              Edit
            </button>

            <button
              onClick={() => onDelete(task.id)}
              style={{ backgroundColor: "#ff4d4d", color: "white" }}
            >
              Delete
            </button>
          </div>
        </>
      )}
    </li>
  );
}

export default TaskItem;