import counter from './store/counter/reducers'
import {createStore} from 'react'
import React from 'react'
export default class Counter2 extends React.Component{
  render(){
      return(
        <div>
          {this.props.value}
          <button>+</button>
          <button>-</button>
        </div>
      )
  }
}

let store = createStore(counter)
//mapStateToProps:将store里的状态映射成属性

//connect生成一个容器组件
let connect = (mapStateToProps)=>(_component)=>{
    class Pryxy extends React.Component{
      constructor(){
        super();
        this.state = mapStateToProps(store.getState())//相当于this.state ={value:0}
      }
      render(){
        return <_component {...this.state}/>
      }
    }
    return Pryxy
}
let mapStateToProps = (state) =>(
  {value:state.num}
)
export default connect(mapStateToProps)(Counter2)
