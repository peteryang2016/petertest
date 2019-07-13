import React from 'react'
import PropTypes from 'prop-types'
export default class Route extends React.Component{
    static contextTypes = {
        location:PropTypes.object
    }
    render(){
        let {path,component:Component} = this.props
        let {location} = this.context;
        if((location&&path==location.pathname) || location.pathname.startsWith(path)){
            return <Component location={location} />
        }
        return null
    }
}
