import counter from './store/counter/reducers'
import {createStore} from 'redux'
import React from 'react'
import {INCREASE,DESCREASE} from './actions'
class Counter2 extends React.Component{

  render(){
      return(
        <div>
          {this.props.value}
          <button onClick={this.props.onIncrease}>+</button>
          <button onClick={this.props.onDecrease}>-</button>
        </div>
      )
  }
}

let store = createStore(counter)


//connect生成一个容器组件
let connect = (mapStateToProps,mapDispatchToProps)=>(_component)=>{
    class Pryxy extends React.Component{
      constructor(){
        super();
        this.state = mapStateToProps(store.getState())//相当于this.state ={value:0}
      }
      componentWillMount(){
          this.unSubscribe = store.subscribe(()=>{
              this.setState(mapStateToProps(store.getState()))
          })
      }
      render(){
        return <_component {...this.state} {...mapDispatchToProps(store.dispatch)}/>
      }
    }
    return Pryxy
}
//mapStateToProps:将store里的状态映射成属性
let mapStateToProps = (state) =>(
  {value:state.num}
)
//mapDispatchToProps  把dispatch方法映射成ui组件的属性
let mapDispatchToProps = (dispatch)=>(
    {
        onIncrease:()=>dispatch({type:INCREASE,num:2}),
        onDecrease:()=>dispatch({type:DESCREASE,num:1})
    }
)
export default connect(mapStateToProps,mapDispatchToProps)(Counter2)
