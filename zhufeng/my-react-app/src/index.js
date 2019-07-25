import React from 'react';
import ReactDOM from 'react-dom';
import TodoApp from './todo/TodoApp.js'
import HomePage from './context/HomePage.js'
import Model from './portal/Model.js'
ReactDOM.render(
    <TodoApp />,
    //<HomePage />,
    //<Model />,
    document.getElementById("root")
)
