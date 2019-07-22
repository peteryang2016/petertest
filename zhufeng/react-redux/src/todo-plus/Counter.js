import React from 'react';
import store from './store'
import {INCREASE,DESCREASE} from "./actions";
export default class Counter extends React.Component{
  constructor(){
    super()
    this.state = {num:store.getState().counter.num}
  }
  componentWillMount() {
    console.log(store.getState().counter.num);
    this.unSubscribe = store.subscribe(()=>{
      //this.setState({num:store.getState().num});
      this.setState({num:store.getState().counter.num});
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
