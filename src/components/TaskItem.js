import React, { useCallback } from "react";
import { Draggable } from "react-beautiful-dnd";
import { useTaskContext } from "../context/TaskContext";

function TaskItem({ task, index }) {
  const { toggleTask, deleteTask } = useTaskContext();

  const handleToggle = useCallback(() => {
    toggleTask(task.id);
  }, [toggleTask, task.id]);

  const handleDelete = useCallback(() => {
    deleteTask(task.id);
  }, [deleteTask, task.id]);

  return (
    <Draggable draggableId={task.id} index={index}>
      {(provided, snapshot) => (
        <li
          className={`task-item ${task.completed ? "completed" : ""} ${
            snapshot.isDragging ? "dragging" : ""
          }`}
          ref={provided.innerRef}
          {...provided.draggableProps}
          {...provided.dragHandleProps}
        >
          <div className="task-content" onClick={handleToggle}>
            <span className="checkbox">{task.completed ? "✔" : ""}</span>
            <span className="task-text">{task.text}</span>
          </div>
          <button className="delete-btn" onClick={handleDelete}>
            ×
          </button>
        </li>
      )}
    </Draggable>
  );
}

// React.memo prevents re-render if task and index haven't changed
export default React.memo(TaskItem);
