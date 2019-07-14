import React from 'react'
import ReactDom from 'react-dom'

export default class UserAdd extends React.Component {
  handleSubmit = ()=>{
    let name = this.name.value;//是通过ref获取真实dom
    let userStr = localStorage.getItem("users");
    let users = userStr?JSON.parse(userStr):[];
    users.push({id:Date.now(),name:name})
    localStorage.setItem("users",JSON.stringify(users))
    this.name.value = ''
    this.props.history.push('/user/list')//用户添加成功后路由跳转到列表
  }
    render() {
        return (
          <form onSubmit={this.handleSubmit}>
            <div className="form-group">
              <label htmlFor="name">姓名</label>
              <input type="text" className="form-control" ref={ref=>this.name=ref}/>
            </div>
            <div className="form-group">
              <input type="submit" className="btn btn-rpimary"/>
            </div>
          </form>
        )
    }
}
