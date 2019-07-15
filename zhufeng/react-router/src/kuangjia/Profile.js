import React from 'react'
import {Redirect,route,Link} from 'react-router-dom'
export default class Profile extends React.Component{
  constructor(props){
    super(props)
  }
  handelClick = ()=>{
    localStorage.removeItem("login");
    window.location.hash='/'
  }
  handleClickTest = ()=>{
      console.log(this);
      localStorage.removeItem("login");
      this.props.history.push('/')//用户添加成功后路由跳转到列表
  }
  render(){
    console.log(this.props);
    return(
        <div>
          Profile123
          <button onClick={this.handelClick}>注销</button>
          <button onClick={this.handleClickTest}>注销2</button>
        </div>
      )
  }
}
