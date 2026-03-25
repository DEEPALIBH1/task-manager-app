import React, { useState, useCallback } from "react";
import { useTaskContext } from "../context/TaskContext";

function TaskForm() {
  const [text, setText] = useState("");
  const [error, setError] = useState("");
  const { addTask } = useTaskContext();

  const handleSubmit = useCallback(
    (e) => {
      e.preventDefault();

      // Form validation - prevent empty tasks
      if (!text.trim()) {
        setError("Task cannot be empty!");
        return;
      }

      addTask(text.trim());
      setText("");
      setError("");
    },
    [text, addTask]
  );

  return (
    <form className="task-form" onSubmit={handleSubmit}>
      <div className="input-group">
        <input
          type="text"
          value={text}
          onChange={(e) => {
            setText(e.target.value);
            if (error) setError("");
          }}
          placeholder="Add a new task..."
          className="task-input"
        />
        <button type="submit" className="add-btn">
          Add
        </button>
      </div>
      {error && <p className="error-msg">{error}</p>}
    </form>
  );
}

export default React.memo(TaskForm);
