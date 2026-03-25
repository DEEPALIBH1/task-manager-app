import React from "react";
import { useTaskContext } from "../context/TaskContext";

function FilterBar() {
  const { filter, setFilter, stats } = useTaskContext();

  return (
    <div className="filter-bar">
      <div className="filter-buttons">
        <button
          className={`filter-btn ${filter === "all" ? "active" : ""}`}
          onClick={() => setFilter("all")}
        >
          All ({stats.total})
        </button>
        <button
          className={`filter-btn ${filter === "pending" ? "active" : ""}`}
          onClick={() => setFilter("pending")}
        >
          Pending ({stats.pending})
        </button>
        <button
          className={`filter-btn ${filter === "completed" ? "active" : ""}`}
          onClick={() => setFilter("completed")}
        >
          Completed ({stats.completed})
        </button>
      </div>
    </div>
  );
}

export default React.memo(FilterBar);
