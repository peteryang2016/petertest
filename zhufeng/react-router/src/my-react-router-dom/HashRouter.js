import React from 'react'
import PropTypes from 'prop-types'
export default class HashRouter extends React.Component{
    //使用Context给子组件传递参数
    static childContextTypes={
        location:PropTypes.object,
        history:PropTypes.object
    }
    constructor(props){
        super(props)
        this.state = {location:{pathname:window.location.hash.slice(1)||'/'}}
    }

    getChildContext(){//返回子上下文对象
        return {
            location:this.state.location,//{pathname:window.location.hash.slice(1)||'/'},
            history:{
                push(path){
                    window.location.hash = path
                }
            }
        }
    }
    componentDidMount(){
        window.location.hash = window.location.hash || '/';
        let render = ()=>{
            this.setState({location:{pathname:window.location.hash.slice(1)||'/'}})
        }
        window.addEventListener('hashchange',render)
    }

    render(){
        return this.props.children
    }
}
