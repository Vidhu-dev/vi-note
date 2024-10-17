import React, { useState } from "react";
import './Todo.css';
function Todo() {
  const [todos, setTodos] = useState(["add chiken to ", "display num"]);
  function addTodos(e) {
    e.preventDefault();
    let newTodo = document.getElementById("t").value;
    document.getElementById("t").value = "";
    setTodos((prevTodos) => {
      return [...prevTodos, newTodo];
    });
  }
  return (
    <div className="todo">
      <h1>ToDo</h1>
      {todos.map((todoItem, index) => (
        <div>
          <input className="todo-check" type="checkbox" />
          <input className="todo-item" type="text" value={todoItem} />
        </div>
      ))}
      <input type="text" id="t" />
      <button type="submit" onClick={addTodos}>
        +
      </button>
    </div>
  );
}
export default Todo;
