import React from 'react'
import PropTypes from 'prop-types'

class Header extends React.Component{
    render(){
        return(
            <Title />
        )
    }
}

class Title extends React.Component{
    static contextTypes = {
        color:PropTypes.string,
        setColor:PropTypes.func
    }
    handleClick = ()=>{
        this.context.setColor('yellow')
    }
    render(){
        return(
            <div style={{color:this.context.color}}>
                我是标题
                <button onClick={this.handleClick}>换成黄色</button>
            </div>
        )
    }
}

class Main extends React.Component{
    render(){
        return(
            <Content />
        )
    }
}

class Content extends React.Component{
  static contextTypes = {
    color:PropTypes.string,
    setColor:PropTypes.func
  }
    render(){
        return(
            <div style={{color:this.context.color}}>我是内容
            <button onClick={()=>this.context.setColor('yellow')}>变色</button>
            </div>
        )
    }
}
/*
* 1.在父组件中定义childContextTypes子上下文类型
* 2.在父组件里还要定义一个getChildContext用来返回上下文对象
* 3.在要接收这些上下文对象的组件里定义contextTypes
* */
export default class HomePage extends React.Component{
    static childContextTypes = {
        color:PropTypes.string,
        setColor:PropTypes.func
    }
    getChildContext(){
        return {
            color:this.state.color,
            setColor:this.setColor
        }
    }

    constructor(){
        super()
        this.state = {color:'red'}
    }
    setColor = (color)=>{
        this.setState({color})
    }
    render(){
        return(
            <div>
                <Header />
                <Main />
            </div>
        )
    }
}
