import React from "react";
import { TaskProvider, useTaskContext } from "./context/TaskContext";
import Header from "./components/Header";
import TaskForm from "./components/TaskForm";
import FilterBar from "./components/FilterBar";
import TaskList from "./components/TaskList";
import "./App.css";

// Inner component that reads darkMode from context
function AppContent() {
  const { darkMode } = useTaskContext();

  return (
    <div className={`app ${darkMode ? "dark" : "light"}`}>
      <div className="container">
        <Header />
        <TaskForm />
        <FilterBar />
        <TaskList />
      </div>
    </div>
  );
}

// Outer component wraps everything with the provider
function App() {
  return (
    <TaskProvider>
      <AppContent />
    </TaskProvider>
  );
}

export default App;
