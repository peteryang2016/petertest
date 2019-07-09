import {
    HashRouter as Router,//容器
    Route, //一条路由
    Link

}from 'react-router-dom'
import React from 'react'
import Home from './Home'
import User from './User'
import Profile from './Profile'
/*export default (
            <Router>
                <Route path="/Home" component={Home} />
                <Route path="/User" component={User} />
                <Route path="/Profile" component={Profile} />
            </Router>
        )*/
export default class App extends React.Component{
    render(){
        return(
            <Router>
                <div>
                    <nav className="navbar navbar-inverse">
                        <div className="container-fluid">
                            <div className="navbar-header">
                                <div className="navbar-brand">
                                    用户管理系统
                                </div>
                            </div>
                            <ul className="nav navbar-nav">
                                <li><Link to="/home">首页</Link></li>
                                <li><Link to="/user">用户管理</Link></li>
                                <li><Link to="/profile">个人设置</Link></li>
                            </ul>
                        </div>
                    </nav>
                    <Route path="/Home" component={Home} />
                    <Route path="/User" component={User} />
                    <Route path="/Profile" component={Profile} />
                </div>
            </Router>
        )
    }
}
