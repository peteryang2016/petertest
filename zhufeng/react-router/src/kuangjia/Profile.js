import React from 'react'
import {Redirect,route,Link} from 'react-router-dom'
export default class Profile extends React.Component{
  constructor(props){
    super(props)
  }
  changeClick = ()=>{
    localStorage.removeItem("login");
    window.location.hash='/home'
  }
  render(){
    console.log(this.props);
    return(
        <div>
          Profile123
          <button onClick={this.changeClick}>注销</button>
        </div>
      )
  }
}
