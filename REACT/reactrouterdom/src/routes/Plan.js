import React from 'react'
import {connect} from 'react-redux'
class Plan extends React.Component{
    constructor(props){
        super(props)
        console.log(this.props);
    }
    render(){
        return(
            <div>我是计划管理页</div>
        )
    }
}
export default connect()(Plan)
