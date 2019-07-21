import React from 'react'
import ReactDOM from 'react-dom'
import Todo from "./todo-plus/Todo";
import Counter from "./Counter";

ReactDOM.render(
  <div>
    <Todo/>
    <Counter/>
  </div>,
  document.getElementById("root")
)
