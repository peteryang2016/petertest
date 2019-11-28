import React from 'react';
import ReactDOM from 'react-dom';
import {HashRouter,Route,Switch,Redirect} from "react-router-dom";
import {Provider} from "react-redux";
import store from './store/index'

import Nav from "./component/Nav";
import Home from "./routes/Home";
import Custom from "./routes/Custom";
import Plan from "./routes/Plan";

import 'bootstrap/dist/css/bootstrap.css'
ReactDOM.render(<Provider store={store}>
    <HashRouter>
        <div>
            <Nav/>
            <Switch>
                <Route path='/' exact component={Home}/>
                <Route path='/custom' component={Custom}/>
                <Route path='/plan/:id' component={Plan}/>

                <Redirect to="/?lx=unsafe"/>
            </Switch>
        </div>
    </HashRouter>
</Provider>, document.getElementById('root'));




/*
* <HashRouter>
    <Switch>
        <Route exact path="/" component={A}/>
        <Route path="/user" component={B}/>
        <Route path="/pay" render={()=>{
            let value = localStorage.getItem('info')
            if(value&&value==='salf'){
                return <C/>
            }
            return '支付环境不安全'
        }}/>
        上述都设置完成后，会在末尾设置一个匹配：以上都不符合的情况下，我们认为路由地址是非法的地址，我们做一些特殊处理(route不设置path是匹配所有地址规则的)
<Route render={()=>{
    return <div>404</div>
}}/>
</Switch>
</HashRouter>
*
* */
