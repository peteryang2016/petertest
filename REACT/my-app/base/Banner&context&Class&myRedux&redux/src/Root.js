import React from 'react'
import {HashRouter as Router,Route,Link,Switch} from 'react-router-dom'
import {Button, Col, Row} from "antd";
import Home from "./Home";
import User from "./User";
import NotFound from "./NotFound";
export default class Root extends React.Component{
    constructor(props){
        super(props)
    }
    render(){
        return(
            <Router>
                <Link to={{
                    pathname: "/home",
                }}> 首页</Link>

                <Link to={{
                    pathname: "/User/1",
                    state: { from: true }
                }}> 用户</Link>
            </Router>
        )
    }
}
