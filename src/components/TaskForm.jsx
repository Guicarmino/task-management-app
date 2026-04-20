import { useState } from "react";

function TaskForm({ onAddTask }) {
  const [title, setTitle] = useState("");
  const [description, setDescription] = useState("");
  const [localError, setLocalError] = useState("");

  const handleSubmit = async (e) => {
    e.preventDefault();
    setLocalError("");

    if (!title.trim()) {
      setLocalError("Task title is required.");
      return;
    }

    if (title.trim().length < 3) {
      setLocalError("Task title must be at least 3 characters.");
      return;
    }

    await onAddTask(title.trim(), description.trim());

    setTitle("");
    setDescription("");
  };

  return (
    <form onSubmit={handleSubmit} className="task-form">
      <div className="form-group">
        <input
          type="text"
          placeholder="Task title"
          value={title}
          onChange={(e) => setTitle(e.target.value)}
          required
          className="form-input"
        />
      </div>

      <div className="form-group">
        <textarea
          placeholder="Task description"
          value={description}
          onChange={(e) => setDescription(e.target.value)}
          rows="4"
          className="form-textarea"
        />
      </div>

      <button type="submit" className="primary-btn">
        Add Task
      </button>

      {localError && <p className="error-message">{localError}</p>}
    </form>
  );
}

export default TaskForm;