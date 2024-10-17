import React, { useState } from "react";
import "./Filter.css";
function Filter() {
  const intialState = {
    all: "filter",
    todays: "",
    week: "",
    month: "",
  };
  const [filter, setFilter] = useState(intialState);
  const handelFilter = (e) => {
    const { className } = e.target;
    console.log(className);
    var temp = {
      all: "",
      todays: "",
      week: "",
      month: "",
    };
    setFilter({ ...temp, [className]: "filter" });
  };

  return (
    <div>
      <ul className="filter">
        <li className="todays" onClick={handelFilter} id={filter.todays}>
          Todays
        </li>
        <li className="week" onClick={handelFilter} id={filter.week}>
          This week
        </li>
        <li className="month" onClick={handelFilter} id={filter.month}>
          This month
        </li>
        <li className="all" onClick={handelFilter} id={filter.all}>
          All
        </li>
      </ul>
    </div>
  );
}

export default Filter;
