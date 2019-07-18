import React from 'react'
import ReactDOM from 'react-dom'
import App from './App'
import {addTodo,toggleTodo} from './action'
import { createStore } from 'redux'
import todoAPP from './reducers'
let store = createStore(todoAPP)
const unsubscribe = store.subscribe(() => console.log(store.getState()))
store.dispatch(addTodo('todo新增1'))
store.dispatch(addTodo('todo新增2'))
store.dispatch(addTodo('todo新增3'))
store.dispatch(toggleTodo(0))
ReactDOM.render(
  <App/>,
  document.getElementById("root")
)
