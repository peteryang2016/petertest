import React from 'react'
import "antd/dist/antd.css"
import {HashRouter as Router,Route,Link,Switch} from 'react-router-dom'
//import Button from 'antd/es/button';
import {Button,Row,Col} from 'antd';
import User from './User'
import Home from './Home'
import Root from './Root'
import NotFound from './NotFound'
export default class App extends React.Component{
    constructor(props){
        super(props)
    }
    render(){
        return(
            <Router>
                <Button type="primary">Button</Button>
                <Row>
                    <Col span={4}>
                        {/*<Link to={{
                            pathname: "/",
                        }}> 首页</Link>

                        <Link to={{
                            pathname: "/User/1",
                            state: { from: true }
                        }}> 用户</Link>*/}
                    </Col>
                    <Col span={20}>
                        <Switch>
                            <Route exact path="/" component={Root}></Route>
                            <Route exact path="/home" component={Home}></Route>
                            <Route path="/User/:id" component={User}></Route>
                            <Route component={NotFound}></Route>
                        </Switch>
                    </Col>
                </Row>
            </Router>
        )
    }
}
