import React, { useCallback } from "react";
import { DragDropContext, Droppable } from "react-beautiful-dnd";
import { useTaskContext } from "../context/TaskContext";
import TaskItem from "./TaskItem";

function TaskList() {
  const { filteredTasks, reorderTasks } = useTaskContext();

  const handleDragEnd = useCallback(
    (result) => {
      // If dropped outside a valid area, do nothing
      if (!result.destination) return;
      reorderTasks(result.draggableId, result.destination.index);
    },
    [reorderTasks]
  );

  if (filteredTasks.length === 0) {
    return <p className="empty-msg">No tasks to show.</p>;
  }

  return (
    <DragDropContext onDragEnd={handleDragEnd}>
      <Droppable droppableId="task-list">
        {(provided) => (
          <ul
            className="task-list"
            ref={provided.innerRef}
            {...provided.droppableProps}
          >
            {filteredTasks.map((task, index) => (
              <TaskItem key={task.id} task={task} index={index} />
            ))}
            {provided.placeholder}
          </ul>
        )}
      </Droppable>
    </DragDropContext>
  );
}

export default React.memo(TaskList);
