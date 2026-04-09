import React, { createContext, useContext, useCallback, useMemo } from "react";
import useLocalStorage from "../hooks/useLocalStorage";

// Create the context
const TaskContext = createContext();

// Provider component that wraps the app
export function TaskProvider({ children }) {
  const [tasks, setTasks] = useLocalStorage("tasks", []);
  const [filter, setFilter] = useLocalStorage("filter", "all");
  const [darkMode, setDarkMode] = useLocalStorage("darkMode", false);

  // Add a new task
  const addTask = useCallback(
    (text) => {
      const newTask = {
        id: Date.now().toString(),
        text,
        completed: false,
      };
      setTasks((prev) => [...prev, newTask]);
    },
    [setTasks]
  );

  // Toggle task completed status
  const toggleTask = useCallback(
    (id) => {
      setTasks((prev) =>
        prev.map((task) =>
          task.id === id ? { ...task, completed: !task.completed } : task
        )
      );
    },
    [setTasks]
  );

  // Delete a task
  const deleteTask = useCallback(
    (id) => {
      setTasks((prev) => prev.filter((task) => task.id !== id));
    },
    [setTasks]
  );

  // Reorder tasks (for drag and drop). endIndex is the destination index
  // within the currently filtered view, so we translate it back to an index
  // in the full tasks array using the dragged task's id.
  const reorderTasks = useCallback(
    (draggedId, endIndex) => {
      setTasks((prev) => {
        const fromIndex = prev.findIndex((t) => t.id === draggedId);
        if (fromIndex === -1) return prev;

        // Build the same filtered view TaskList renders from.
        const filtered = prev.filter((task) => {
          if (filter === "completed") return task.completed;
          if (filter === "pending") return !task.completed;
          return true;
        });

        // Find the task we want to drop *before* in the full array.
        const clamped = Math.max(0, Math.min(endIndex, filtered.length - 1));
        const targetTask = filtered[clamped];
        const result = [...prev];
        const [removed] = result.splice(fromIndex, 1);

        if (!targetTask || targetTask.id === draggedId) {
          // Dropped at end of filtered list
          const lastFiltered = filtered[filtered.length - 1];
          if (!lastFiltered || lastFiltered.id === draggedId) {
            result.push(removed);
          } else {
            const lastIdx = result.findIndex((t) => t.id === lastFiltered.id);
            result.splice(lastIdx + 1, 0, removed);
          }
        } else {
          const toIndex = result.findIndex((t) => t.id === targetTask.id);
          result.splice(toIndex, 0, removed);
        }
        return result;
      });
    },
    [setTasks, filter]
  );

  // Toggle dark mode
  const toggleDarkMode = useCallback(() => {
    setDarkMode((prev) => !prev);
  }, [setDarkMode]);

  // Filter tasks based on current filter
  const filteredTasks = useMemo(() => {
    switch (filter) {
      case "completed":
        return tasks.filter((task) => task.completed);
      case "pending":
        return tasks.filter((task) => !task.completed);
      default:
        return tasks;
    }
  }, [tasks, filter]);

  // Count stats
  const stats = useMemo(
    () => ({
      total: tasks.length,
      completed: tasks.filter((t) => t.completed).length,
      pending: tasks.filter((t) => !t.completed).length,
    }),
    [tasks]
  );

  const value = {
    tasks,
    filteredTasks,
    filter,
    setFilter,
    addTask,
    toggleTask,
    deleteTask,
    reorderTasks,
    darkMode,
    toggleDarkMode,
    stats,
  };

  return <TaskContext.Provider value={value}>{children}</TaskContext.Provider>;
}

// Custom hook to use the task context
export function useTaskContext() {
  const context = useContext(TaskContext);
  if (!context) {
    throw new Error("useTaskContext must be used within a TaskProvider");
  }
  return context;
}
