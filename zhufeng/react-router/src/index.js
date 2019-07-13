import  React from 'react'
import ReactDOM from 'react-dom'
import App from './components/App'
import Home from "./components/Home";
import User from "./components/User";
import Profile from "./components/Profile";
import {Route} from 'react-router-dom'
ReactDOM.render(
    <App>
        <Route path="/Home" component={Home} />
        <Route path="/User" component={User} />
        <Route path="/Profile" component={Profile} />
    </App>,document.getElementById("root")
)


