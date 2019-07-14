import React from 'react'
import {HashRouter as Router,Route,Link} from 'react-router-dom'
export default class User extends React.Component{
    render(){
        return(
            <div className="container">
                <div className="row">
                    <div className="col-md-2">
                        <ul>
                            <li><Link to='/user/add'>添加用户</Link></li>
                            <li><Link to='/user/list'>用户列表</Link></li>
                        </ul>
                    </div>
                    <div className="col-md-10">
                        <Router>
                            <Route path="/user/add" component={Add} />
                            <Route path="/user/list" component={List} />
                        </Router>
                    </div>
                </div>
            </div>

        )
    }
}

function Add() {
    return(<h1>User1</h1>)
}
function List() {
    return(<h1>User2</h1>)
}
