import React from 'react'
import {Prompt} from "react-router-dom"
export default class UserAdd extends React.Component {
    constructor(props){
        super(props)
        this.state = {blocking:false}
    }
    handleChange = (event)=>{
        this.setState({blocking:event.target.value&&event.target.value.length>0})
    }
  handleSubmit = ()=>{
    let name = this.name.value;//是通过ref获取真实dom
    let userStr = localStorage.getItem("users");
    let users = userStr?JSON.parse(userStr):[];
    users.push({id:Date.now(),name:name})
    localStorage.setItem("users",JSON.stringify(users))
    this.name.value = ''
      this.setState({
          blocking:false
      },()=>{
          console.log(this.state.blocking);
          this.props.history.push('/user/list')//用户添加成功后路由跳转到列表
      })
    //this.props.history.push('/user/list')//用户添加成功后路由跳转到列表
  }
    render() {
        return (
          <div>
              <Prompt
              when={this.state.blocking}
              message={(location)=>`确定要跳转到${location.pathname}`}

              />
              <form onSubmit={this.handleSubmit}>
                  <div className="form-group">
                      <label htmlFor="name">姓名</label>
                      <input type="text" onChange={this.handleChange} className="form-control" ref={ref=>this.name=ref}/>
                  </div>
                  <div className="form-group">
                      <input type="submit" className="btn btn-rpimary"/>
                  </div>
              </form>
          </div>
        )
    }
}
