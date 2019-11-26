import React from 'react'
import {connect} from 'react-redux'
import {withRouter} from 'react-router-dom'

import {Alert,Button} from 'antd'

class Tip extends React.Component{
    constructor(props){
        super(props)
    }
    render(){
        return <div>
            <Alert type="warning" message="未登录提醒" description="当前没有登录，登陆后才可以查看个人信息"/>
            <Button type="dashed" onClick={ev=>{
                this.props.history.push('/person/login')
            }}>立即登录</Button>
            <Button type="dashed" onClick={ev=>{
                this.props.history.push('/person/register')
            }}>立即注册</Button>
        </div>
    }
}
export default withRouter(connect()(Tip))
