import React from 'react'
import {connect} from 'react-redux'
import {Switch,Route,Redirect} from "react-router-dom";
import List from "./course/List";
import Info from "./course/Info";
import '../static/css/course.less'

class Home extends React.Component{
    constructor(props){
        super(props)
    }
    render(){
        return <div className="courseBox">
            <Switch>
                <Route path="/course" exact component={List}/>
                <Route path="/course/info" component={Info}/>
            </Switch>
        </div>
    }
}
//用不到react-redux组件不需要高阶。
export default Home
//export default connect()(Home)
