import React from 'react'
import {connect} from 'react-redux'
import {Redirect,Switch,Route,withRouter} from 'react-router-dom'

import Info from "./person/Info";
import Login from "./person/Login";
import Register from "./person/Register";
import Tip from "./person/Tip";

/*api*/
import {checkLogin} from '../api/person'
import '../static/css/person.less'

class Person extends React.Component{
    constructor(props){
        super(props)
        this.state={
            isLogin:false
        }
    }

    async componentWillMount() {
        let result = await checkLogin()
        console.log(result);
        let isLogin = parseFloat(result.code)===0?true:false;
        this.setState({isLogin})
    }

    async componentWillReceiveProps(){
        let result = await checkLogin()
        console.log(result);
        let isLogin = parseFloat(result.code)===0?true:false;
        this.setState({isLogin})
    }

    /*
    * 当路由切换的时候，对应的组件会重新渲染，但是渲染也要分情况：
    *   1.之前渲染其他组件的时候把当前组件彻底从页面中移除，再次渲染当前组件，走的是第一次挂载的流程（也就是一切从头开始）
    *   2.如果当前组件之前没有彻底在页面中移除（本组件内容的子组件在切换），每一次走的时更新的流程，不是重新挂载的流程;所以这个项目componentWillMount、componentWillUpdate生命周期中干的是一样的事情
    * */
    render(){
        console.log('render');
        return <section>
                <Switch>

                    {/*路由的验证和渲染是同步的，不允许在校验中出现异步，因为这样在异步没有完成之前，根本不知道渲染谁，语法不支持这样的操作*/}
                    {/*

                    <Route path="/person/info" render={async ()=>{
                        let result = await checkLogin()
                        if(parseFloat(result.code)===0){
                            return <Info/>
                        }
                        return <Tip/>
                    }}></Route>

                    */}
                    {/*权限校验，如果登录跳转到info组件 未登录跳转到tip组件*/}
                    {/*基于render返回的组件不是受路由管控的组件*/}
                    <Route path="/person/info" render={()=>{
                        if(this.state.isLogin){
                            return <Info/>
                        }
                        return <Tip/>
                    }}/>


                    <Route path="/person/login" component={Login}/>
                    <Route path="/person/register" component={Register}/>

                    {/*刚进入"个人中心"展示的默认页*/}
                    <Redirect from="/person" to="/person/info"/>
                </Switch>
        </section>
    }
}
export default connect()(Person)
