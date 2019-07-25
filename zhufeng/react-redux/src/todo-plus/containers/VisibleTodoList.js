import React from 'react'
import {deleteTodo, toggleTodo} from "../actions";
import {connect} from "react-redux";
import TodoList from '../components/TodoList'
import {
    visibilityFilter,
} from '../actions'
let {SHOW_ALL,SHOW_COMPLETED,SHOW_ACTIVE} = visibilityFilter;

function getVisibleTodos(list,filter) {
    console.log(filter);
    switch (filter) {
        case SHOW_COMPLETED:
            return list.filter(t=>t.completed)
        case SHOW_ACTIVE:
            return list.filter(t=>!t.completed)
        default:
            return list
    }

}
//将store中的state映射给state
const mapStateToProps = state=>{//state的值是connect调用mapstateToProps方法传递回来的store.getState()
    console.log(state);
    return{
        list:getVisibleTodos(state.todo.list,state.visibilityFilter)
    }
}
//把展示组件变化同步到redux的store中
const mapDispatchToProps = dispatch=>({
    toggleTodo: index => dispatch(toggleTodo(index)),
    handleClick:index=>dispatch(deleteTodo(index))
})
let VisibleTodoList = connect(mapStateToProps,mapDispatchToProps)(TodoList);
export default VisibleTodoList;
