import React from 'react'
import {connect} from 'react-redux'
import {Link,NavLink} from "react-router-dom";

class Nav extends React.Component{
    constructor(props){
        super(props)
    }
    render(){
        return(<nav className="navbar navbar-default">
            <div className="container-fluid col-md-2">
                <Link className="navbar-brand" to={{
                    pathname:'/',
                    search:'?lx=logo'
                }}>路由实战</Link>
            </div>

            <div className="collapse navbar-collapse col-md-10">
                <ul className="nav navbar-nav">
                    <li><NavLink to="/" exact>首页</NavLink></li>
                    <li><NavLink to="/custom">客户管理</NavLink></li>
                    <li><NavLink to="/plan/1">计划管理</NavLink></li>
                </ul>
            </div>
        </nav>)
    }
}
export default connect()(Nav)
