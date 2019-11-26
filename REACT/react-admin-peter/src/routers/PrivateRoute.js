import React from 'react'
import {Route, withRouter,Redirect} from 'react-router-dom';
import Login from './Login'
class PrivateRoute extends React.Component{
    constructor(props){
        super(props)
        this.state = {isLogin:JSON.parse(localStorage.getItem('isLogin'))}
    }
    render(){
        let { component: Component, ...rest} = this.props;
        return <Route {...rest} render={props=>{
            if(this.state.isLogin){
                 return <Component {...props}/>
            }else {
               return (<Redirect
                    to={{
                        pathname: "/login",
                        state: {from: props.location}
                    }}/>
                )
            }
        }}/>

    }
}
export default withRouter(PrivateRoute)
