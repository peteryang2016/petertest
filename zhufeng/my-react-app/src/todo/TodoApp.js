import React from 'react';
import 'bootstrap/dist/css/bootstrap.css'
import TodoHeader from '../todo/TodoHeader'
import TodoItem from '../todo/TodoItem'
import TodoFooter from '../todo/TodoFooter'
import * as filterTypes from './filter-types'
export default class TodoApp extends React.Component{
    constructor(props){
        super(props)
        this.state={
            todos:[
                {id:Math.round(Math.random()),title:'React学习',completed:true},
                {id:Math.round(Math.random()),title:'vue学习',completed:false}
            ],
            filterType:filterTypes.ALL
        }
    }
    addTodo = (todo)=>{
        todo = {id:Math.round(Math.random()),completed:false,...todo}
        let todos = this.state.todos;
        todos.push(todo)
        this.setState({todos:todos})
    }
    toggle = (id)=>{
        let todos = this.state.todos;
        todos = todos.map((todo)=>{
            if(todo.id===id){
                todo.completed=!todo.completed
            }
            return todo
        })
        this.setState({todos:todos})

    }
    removeItem = (id)=>{
        let todos = this.state.todos;
        todos = todos.filter(todo=>{
            return todo.id!=id
        })
        this.setState({todos})
    }
    toggleAll = (event)=>{
        let checked = event.target.checked;
        let todos = this.state.todos;
        todos = todos.map(todo=>{
                todo.completed = checked
                return todo
            })
        this.setState({todos})
    }
    changeFilterType = (filterType)=>{
        console.log(filterType);
        this.setState({filterType})
    }
    delCompleted = ()=>{
      let todos = this.state.todos
      todos = todos.filter((todo)=>{
        return !todo.completed
      })
      this.setState({todos})
    }
    render(){
        let todos = this.state.todos;
        //判断未完成的数量
        let activeTodoCount = todos.reduce((count,todo)=>{
            return count+(todo.completed?0:1)
        },0);
        //所有的todos-未完成的=已完成的
        let completedTodoCount = todos.length - activeTodoCount;
        let showTodos = todos.filter(todo=>{
            switch (this.state.filterType) {
                case filterTypes.ACTIVE:
                    return !todo.completed
                case filterTypes.COMPLETED:
                    return todo.completed;
                default:
                    return true
            }
        })
        let main = (
            <ul className="list-group">
                {
                    this.state.todos.length>0?<li className="list-group-item">
                    <input type="checkbox" checked={activeTodoCount===0?true:false} onChange={this.toggleAll}/>{activeTodoCount===0?'取消全选':'全部选中'}
                    </li>:null
                }

                {
                    showTodos.map((todo,index)=>{
                    //this.state.todos.map((todo,index)=>{
                       return <TodoItem removeItem={this.removeItem} toggle={this.toggle} key={index} todo={todo} />
                    })
                }
            </ul>
        )
        return(
            <div className="container">
                <div className="row">
                    <div className="col-md-6 col-md-offset-3">
                        <div className="panel panel-default">
                            <div className="panel-heading">
                                <TodoHeader addTodo={this.addTodo}/>
                            </div>
                            <div className="panel-body">
                                {main}
                            </div>
                            <div className="panel-footer">
                                <TodoFooter changeFilterType={this.changeFilterType} activeTodoCount={activeTodoCount} filterType={this.state.filterType} delCompleted={this.delCompleted} completedTodoCount={completedTodoCount}/>
                            </div>
                        </div>
                    </div>
                </div>
            </div>
        )
    }
}

