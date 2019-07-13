import React from 'react'
export default class Home extends React.Component{
    constructor(props,context){
        super()
        console.log(props);
        console.log(context);
    }
    render(){
        return(
            <h1>Home</h1>
        )
    }
}
