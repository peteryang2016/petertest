/*
* 增加删除线功能23456
* */
import React from 'react'
import store from './store'
import {
  addTodo,
  deleteTodo,
  toggleTodo,
  toggleAll,
  setVisibilityFilter,
  visibilityFilter, TOGGLE_TODO
} from './actions'
import {connect} from 'react-redux'
let {SHOW_ALL,SHOW_COMPLETED,SHOW_ACTIVE} = visibilityFilter


export default class Todo extends React.Component{
  constructor(){
    super()
    this.state={list:store.getState().todo.list,visibilityFilter:store.getState().todo.visibilityFilter};
  }
  componentWillMount() {
    this.unSubscribe = store.subscribe(()=>{
      //this.setState({list:store.getState().list});
      this.setState({list:store.getState().todo.list,visibilityFilter:store.getState().todo.visibilityFilter});
    })
  }
  componentWillUnmount() {
    this.unSubscribe()//把监听函数销毁。
  }
  //添加todo
  handleKeyDown = (event)=>{
    let value = event.target.value;
    //let list = this.state.list;
    if(event.keyCode === 13 && event.target.value.length>0){
      //list.push(value)
      //this.setState({list})
      store.dispatch(addTodo(value))

      event.target.value=''
    }
  }
  //删除todo
  handleClick = (index)=>{
    store.dispatch(deleteTodo(index))
  }
  //切换是否完成
  clickToggle = (index)=>{
    store.dispatch(toggleTodo(index))

  }
  //全选 取消全选
  /*toggleAll = (event)=>{
    console.log(event.target.checked);
    let checked = event.target.checked
    let list = this.state.list;
    list = list.map(todo=>{
      todo.completed = checked
      return todo
    })
    this.setState({list})
  }*/
  render(){
    let filterList = this.state.list.filter(todo=>{
      switch (this.state.visibilityFilter) {
        case SHOW_COMPLETED:
          return todo.completed;
        case SHOW_ACTIVE:
          return !todo.completed
        default:
          return true
      }
    })
    let activeCount = this.state.list.reduce((count,todo)=>{
      return count+(todo.completed?0:1)
    },0)
    return(
        <div>
          <input type="text" onKeyUp={this.handleKeyDown}/>

          <label><input type="checkbox" checked={activeCount===0?true:false} onChange={(event)=>{store.dispatch(toggleAll(event.target.checked))}}/>
            {activeCount===0?'取消全选':'全部选中'}
          </label>
          {/*<ul>
            {
              this.state.list.map((todo,index)=>{
                return (
                  <li style={{"textDecoration":todo.completed?"line-through":'' }} key={index}>
                    <input type="checkbox" checked={todo.completed} onChange={()=>{this.clickToggle(index)}}/>{todo.text}
                    <button onClick={()=>this.handleClick(index)}>删除</button>
                  </li>
                )
              })
            }
          </ul>*/}
          <VisibleTodoList/>
          <button onClick={()=>store.dispatch(setVisibilityFilter(visibilityFilter.SHOW_ALL))}>全部</button>
          <button onClick={()=>store.dispatch(setVisibilityFilter(visibilityFilter.SHOW_ACTIVE))}>未完成(6)</button>
          <button onClick={()=>store.dispatch(setVisibilityFilter(visibilityFilter.SHOW_COMPLETED))}>已完成</button>
        </div>
      )
  }
}
class TodoList extends React.Component{
  render() {
    console.log(this.props);
    return(
      <ul>
        {
          this.props.list.map((todo,index)=>{
            return (
              <li style={{"textDecoration":todo.completed?"line-through":'' }} key={index}>
                <input type="checkbox" checked={todo.completed} onChange={()=>{this.props.toggleTodo(todo.index)}}/>{todo.text}------{todo.index}
                <button onClick={()=>this.handleClick(index)}>删除</button>
              </li>
            )
          })
        }
      </ul>
    )
  }
}
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
    list:getVisibleTodos(state.todo.list,state.todo.visibilityFilter)
  }
}
//把展示组件变化同步到redux的store中
const mapDispatchToProps = dispatch=>({

  toggleTodo: index => dispatch(toggleTodo(index))
})
let VisibleTodoList = connect(mapStateToProps,mapDispatchToProps)(TodoList)
