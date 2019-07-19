import React from 'react'
import ReactDOM from 'react-dom'
import App from './App'
import {addTodo,toggleTodo} from './action'
import { createStore } from 'redux'
import todoAPP from './reducers'
let store = createStore(todoAPP)

// 每次 state 更新时，打印日志
// 注意 subscribe() 返回一个函数用来注销监听器
//当仓库里的state发生变化的时候，会重新执行方法，读取最新的状态数据并更新视图
const unsubscribe = store.subscribe(() => console.log(store.getState()))
// 发起一系列 action
store.dispatch(addTodo('todo新增1'))
store.dispatch(toggleTodo(0))
// 停止监听 state 更新
unsubscribe()
ReactDOM.render(
  <App/>,
  document.getElementById("root")
)
