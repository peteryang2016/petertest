import {HashRouter as Router,Route,Link,Switch} from 'react-router-dom'
import React from 'react'
import Home from './Home'
import User from './User'
import Profile from './Profile'
import ProtectedRoute from './ProtectedRoute'
import login from './login'
import MenuLink from './MenuLink'
import NotFound from './NotFound'
import 'bootstrap/dist/css/bootstrap.css'

export default (
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
            {/*<li><Link to='/home'>首页</Link></li>
            <li><Link to='/user'>用户管理</Link></li>
            <li><Link to='/profile'>个人设置</Link></li>*/}
            <MenuLink to="/" label="首页"/>
            <MenuLink to="/user" label="用户管理"/>
            <MenuLink to="/profile" label="个人设置"/>
          </ul>
        </div>
      </nav>
      <div className="container">
        <div className="row">
          <div className="col-sm-12">

            <Switch>
              <Route exact path="/" component={Home} />
              <Route path="/user" component={User} />
              <ProtectedRoute path="/profile" component={Profile} />
              <Route path="/login" component={login} />
              <Route component={NotFound} />
            </Switch>
          </div>
        </div>
      </div>
    </div>
  </Router>
)
