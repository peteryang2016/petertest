import React from 'react';
import {createStore} from 'redux';
const INCREASE = 'INCREASE';
const DESCREASE = 'DESCREASE';
function reducers(state={num:10},action){
  switch (action.type) {
    case INCREASE:
      return {num:state.num+action.num};
    case DESCREASE:
      return {num:state.num-action.num};
    default:
      return state
  }
}
let store = createStore(reducers)
export default class Counter extends React.Component{
  constructor(){
    super()
    this.state = {num:store.getState().num}
  }
  componentWillMount() {
    this.unSubscribe = store.subscribe(()=>{
      this.setState({num:store.getState().num});
    })
  }
  inScrease = ()=>{
    store.dispatch({type:INCREASE,num:2})
  }

  desScrease = ()=>{
    store.dispatch({type:DESCREASE,num:1})
  }

  render(){
      return(
        <div>
          {this.state.num}
          <button onClick={this.inScrease}>+</button>
          <button onClick={this.desScrease}>-</button>
        </div>
      )
  }
}
