import React from 'react'
import ReactDOM from 'react-dom'
import Todo from "./todo-plus/Todo";
import Counter from "./todo-plus/Counter";
import Counter2 from "./counter-connect/Counter2";
import { Provider } from 'react-redux'
import store from  './todo-plus/store'

ReactDOM.render(
  <div>
    <Provider store={store}>
      <Todo/>
      <Counter/>
      <Counter2/>
    </Provider>
  </div>,
  document.getElementById("root")
)
