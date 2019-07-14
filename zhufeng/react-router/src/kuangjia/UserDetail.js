import React from 'react'
export default class UserDetail extends React.Component {
    render() {
      let id = this.props.match.params.id
      let userStr = localStorage.getItem("users")
      let users = userStr?JSON.parse(userStr):[]
      //let user = users.find(user=>user.id!=id)
      let user = users.find(user=>user.id==id)
      console.log(user);
      return (
        <table className="table table-responsive">
          <thead>
            <tr>
              <td>id</td>
              <td>姓名</td>
            </tr>
          </thead>
          <tbody>
          <tr>
            <td>{user.id}</td>
            <td>{user.name}</td>
          </tr>
          </tbody>
        </table>
        )
    }
}
