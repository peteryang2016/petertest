import React from 'react'
import PropTypes from 'prop-types'
export default class HashRouter extends React.Component{
    //使用Context给子组件传递参数
    static childContextTypes={
        location:PropTypes.object
    }
    constructor(props){
        super(props)
        this.state = {}
    }
    render(){
        return(
            <h1>组件事例</h1>
        )
    }
    getChildContext(){//返回子上下文对象
        return {
            location:window.location.hash.slice(1)
        }

    }
}
