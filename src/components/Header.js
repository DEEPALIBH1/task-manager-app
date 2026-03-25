import React from "react";
import { useTaskContext } from "../context/TaskContext";

function Header() {
  const { darkMode, toggleDarkMode } = useTaskContext();

  return (
    <header className="app-header">
      <h1>Task Manager</h1>
      <button className="theme-toggle" onClick={toggleDarkMode}>
        {darkMode ? "Light Mode" : "Dark Mode"}
      </button>
    </header>
  );
}

export default React.memo(Header);
