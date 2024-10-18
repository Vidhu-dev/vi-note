import React, { useState } from "react";
import "./Filter.css";

function Filter() {
  const [filter, setFilter] = useState("all");

  const handleFilter = (e) => {
    const { className } = e.target;
    setFilter(className);
  };

  return (
    <div>
      <ul className="filter">
        <li className="todays" onClick={handleFilter} id={filter === "todays" ? "filter" : ""}>
          Todays
        </li>
        <li className="week" onClick={handleFilter} id={filter === "week" ? "filter" : ""}>
          This week
        </li>
        <li className="month" onClick={handleFilter} id={filter === "month" ? "filter" : ""}>
          This month
        </li>
        <li className="all" onClick={handleFilter} id={filter === "all" ? "filter" : ""}>
          All
        </li>
      </ul>
    </div>
  );
}

export default Filter;
