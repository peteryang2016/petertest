import React from 'react'
import {createStore} from 'redux'
import reducer from './reducer'
let store = createStore(reducer)
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
export default connect
