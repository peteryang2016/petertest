import 'bootstrap/dist/css/bootstrap.css'
import  React from 'react'
import ReactDOM from 'react-dom'
import {HashRouter as Router,Route,Link} from './my-react-router-dom'
function Home(props,context){
    console.log(props);
    console.log(context);
    return <h1>Home</h1>
}

function User(){
    return <h1>User</h1>
}

function Profile(){
    return <h1>Profile</h1>
}
ReactDOM.render(
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
                    <Route path="/home" component={Home} />
                    <Route path="/user" component={User} />
                    <Route path="/profile" component={Profile} />
                </div>
            </div>
        </div>
    </Router>,
    document.getElementById("root")
)

