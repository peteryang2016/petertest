import React from 'react'
import {Link} from 'react-router-dom'

export default class UserList extends React.Component {
    constructor(){
      super()
      this.state = {users:[]}
    }
    componentWillMount(){
      this.setState({users:JSON.parse(localStorage.getItem("users"))})
    }
    render() {
      /*let users = this.state.users
      users = users.map((user,index)=>{
        return (<li key={user.id} className="list-group-item">
          <Link to={`/user/detail/${user.id}`}>{user.name}</Link>
        </li>)
      })*/
        return (
          <ul>
            {
              this.state.users.map((user,index)=>{
                return (<li key={user.id} className="list-group-item">
                  <Link to={`/user/detail/${user.id}`}>{user.name}</Link>
                </li>)
              })
            }

          </ul>
        )
    }
}
