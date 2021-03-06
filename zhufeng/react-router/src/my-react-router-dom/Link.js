import React from 'react'
import PropTypes from 'prop-types'
export default class Link extends React.Component{
    static contextTypes = {
        history:PropTypes.object
    }
    constructor(props){
        super(props)
    }
    render(){
        return(
            <a onClick={()=>this.context.history.push(this.props.to)}>{this.props.children}</a>
        )
    }
}
