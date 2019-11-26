import React from 'react'
import {connect} from 'react-redux'
import {Route,Switch,Redirect,NavLink,Link} from 'react-router-dom'

import List from "./custom/List";
import Create from "./custom/Create";
import Detail from "./custom/Detail";

class Custom extends React.Component{
    constructor(props){
        super(props)
    }
    render(){
        return(<section>
            {/*左侧MENU导航*/}
            <ul className="nav nav-pills nav-stacked col-md-2">
                <li className="presentation">
                    <NavLink to="/custom/list">客户列表</NavLink>
                </li>
                <li className="presentation">
                    <NavLink to="/custom/create">增加客户</NavLink>
                </li>
            </ul>
            {/*右侧展示对应的内容：也是基于路由管理（二级路由）*/}
            <div className="col-md-10">
                <Switch>
                    {/*当前url的hash是/custom跳转到list组件*/}
                    {/*<Route path="/custom" exact component={List}></Route>*/}
                    <Route path="/custom/list" component={List}></Route>
                    <Route path="/custom/create" component={Create}></Route>
                    <Route path="/custom/detail" component={Detail}></Route>
                    {/*进入到客户管理页面（custom），我们让其默认展示list区域内容*/}
                    <Redirect from="/custom" to="/custom/list"/>
                </Switch>
            </div>
        </section>)
    }
}
export default connect()(Custom)
