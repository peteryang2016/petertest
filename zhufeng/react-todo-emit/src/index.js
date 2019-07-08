import React from 'react';
import ReactDOM from 'react-dom';
import TodoApp from './todo/TodoApp.js'
import todoModel from './todo/todoModel.js'
let model = new todoModel();
//监听
function render(){
    ReactDOM.render(
        <TodoApp model={model}/>,
        document.getElementById("root")
    )
}
model.subscribe(render);//监听
render();
