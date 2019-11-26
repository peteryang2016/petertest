import React from 'react'
export default class User extends React.Component{
    constructor(props){
        super(props)
    }
    render(){
        return(
            <h1>User
                Link:{this.props.location.pathname}
                {
                    console.log(this.props)
                }
            </h1>
        )
    }
}
