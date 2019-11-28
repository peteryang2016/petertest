import React from 'react'
import {connect} from 'react-redux'
import  {withRouter} from 'react-router-dom'
import {Icon} from "antd";
import action from '../store/action/index'
/*transition动画*/
import { Transition } from 'react-transition-group';
import course from "../store/action/course";
const duration = 300;
const defaultStyle = {
    transition: `opacity ${duration}ms`,
    opacity: 0,
}
const transitionStyles = {
    /*entering: { opacity: 1 },*/
    entering: { opacity: 0},
    entered:  { opacity: 1},

   /* exiting:  { opacity: 0 },
    exited:  { opacity: 0 },*/
};

class NavTop extends React.Component{
    constructor(props){
        super(props)
        this.state = {
            in:false
        }
        //每一次页面刷新，redux中存储的购物车信息都会消失，所以我们需要在页面刷新的时候，执行一个dispatch怕发，把服务器中存储的购物信息存放到redux中。（nav是每一次页面刷新，不管在哪一个路由下都会执行的组件）
        this.props.queryUnpay()
        this.props.queryPay()
    }
    handleClick = (ev)=>{
        let target = ev.target;
        let tarTag = target.tagName//获得标签名 LI
        if(tarTag==='LI'){
            this.props.queryList({
                page:1,
                type:target.getAttribute('type'),
                flag:'replace'//切换类别是替换redux容器中的状态信息
            })
            this.setState({in:false})
        }
    }
    render(){
        return <header className="headerNavBox">
            {/*首页导航*/}
            <div className="homeBox">
                <div className="baseBox">
                    {/*<h1 className="logo">课堂展示</h1>*/}
                    <Icon className="icon" type="bars" style={{
                        fontSize:'.6rem'
                    }} onClick ={ev=>{
                        this.setState({
                            in:!this.state.in
                        })
                    }}/>
                </div>
                <Transition in={this.state.in} timeout={0}>
                    {
                        state => {
                            return <ul className="filterBox" style={{
                                ...defaultStyle,
                                ...transitionStyles[state],
                                display:this.state.in?'block':'none'
                            }} onClick={this.handleClick}>
                                <li type="all">全部课程</li>
                                <li type="react">React</li>
                                <li type="vue">VUE</li>
                                <li type="xiaochengxu">小程序</li>
                            </ul>
                        }
                    }

                </Transition>
                {/*<ul className="filterBox">
                    <li>全部课程</li>
                    <li>React</li>
                    <li>VUE</li>
                    <li>小程序</li>
                </ul>*/}
            </div>

            {/*其他页导航*/}
        </header>
    }
}
export default withRouter(connect(null,action.course)(NavTop));
