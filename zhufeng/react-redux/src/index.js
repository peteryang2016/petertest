import React from 'react'
import ReactDOM from 'react-dom'
import Todo from "./todo-plus/Todo";
import Counter from "./todo-plus/Counter";
import Counter2 from "./counter-connect/Counter2";

ReactDOM.render(
  <div>
    <Todo/>
    <Counter/>
    <Counter2/>
  </div>,
  document.getElementById("root")
)
