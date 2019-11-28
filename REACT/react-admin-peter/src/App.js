import React from 'react';
import {HashRouter,Switch,Redirect,Route} from 'react-router-dom'

import Login from './routers/Login'
import BaseLayout from './routers/BaseLayout'
import Info from './routers/Info'
import Nofont from "./routers/Nofont";
import PrivateRoute from './routers/PrivateRoute'
import Test from './routers/Test'


export default class App extends React.Component{
    constructor(props){
        super(props)
        this.state={isLogin:JSON.parse(localStorage.getItem("isLogin"))}
    }
    render(){
        console.log(this.props);
        return (
            <HashRouter>
                <Switch>
                    <Route path="/login" component={Login}/>
                    <Route path="/test" component={Test}/>
                    {/*<Route path="/"
                        render={props=>this.state.isLogin?(<BaseLayout {...props}/>):(
                            <Redirect to={{
                                pathname:"/login",
                                state:{from:props.location.pathname}
                            }}/>
                        )}
                    />*/}
                    <PrivateRoute component={BaseLayout} path="/"></PrivateRoute>
               </Switch>
            </HashRouter>
        );
    }
}
