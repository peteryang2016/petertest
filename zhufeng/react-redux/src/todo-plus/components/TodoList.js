import React from 'react'
import PropTypes from "prop-types";
export default class TodoList extends React.Component{
    render() {
        if(this.props.list.length<=0) return <div>暂无数据</div>
        return(
            <ul>
                {
                    this.props.list.map((todo,index)=>{
                        return (
                            <li style={{"textDecoration":todo.completed?"line-through":'' }} key={index}>
                                <input type="checkbox" checked={todo.completed} onChange={()=>{this.props.toggleTodo(todo.index)}}/>{todo.text}------{todo.index}
                                <button onClick={()=>this.props.handleClick(index)}>删除</button>
                            </li>
                        )
                    })
                }
            </ul>
        )
    }
}
TodoList.propTypes = {
    list: PropTypes.arrayOf(PropTypes.shape({
        index: PropTypes.number.isRequired,
        completed: PropTypes.bool.isRequired,
        text: PropTypes.string.isRequired
    }).isRequired).isRequired,
    toggleTodo: PropTypes.func.isRequired
}
