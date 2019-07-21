
import React from 'react'
import {createStore} from 'redux'
import {addTodo,deleteTodo} from './actions'
import {reducer} from './reducers'


let store = createStore(reducer)
export default class Todo extends React.Component{
  constructor(){
    super()
    this.state={list:store.getState().list}
  }
  componentWillMount() {
    this.unSubscribe = store.subscribe(()=>{
      this.setState({list:store.getState().list})
    })
  }
  componentWillUnmount() {
    this.unSubscribe()//把监听函数销毁。
  }

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
  handleClick = (index)=>{
    store.dispatch(deleteTodo(index))
  }
  render(){
      return(
        <div>
          <input type="text" onKeyUp={this.handleKeyDown}/>
          <ul>
            {
              this.state.list.map((todo,index)=>{
                return (<li key={index}>{todo}<button onClick={()=>this.handleClick(index)}>删除</button></li>)
              })
            }
          </ul>
        </div>
      )
  }
}
