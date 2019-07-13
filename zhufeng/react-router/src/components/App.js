import 'bootstrap/dist/css/bootstrap.css'
import {
    HashRouter as Router,//容器
    Route, //一条路由
    Link
}from 'react-router-dom'
import React from 'react'
export default class App extends React.Component{
    render(){
        return(
            <Router>
                <div className="container">
                    <nav className="navbar navbar-default">
                        <div className="container-fluid">
                            <div className="navbar-header">
                                <div className="navbar-brand">用户管理系统</div>
                            </div>
                            <ul className="nav navbar-nav">
                                <li><Link to="/home">首页</Link></li>
                                <li><Link to="/user">用户管理</Link></li>
                                <li><Link to="/profile">个人设置</Link></li>
                            </ul>
                        </div>
                    </nav>
                    <div className="row">
                        <div className="col-md-12">
                            {this.props.children}
                        </div>
                    </div>
                </div>
            </Router>
        )
    }
}
