import React from 'react'
import {connect} from 'react-redux'

import {withRouter} from 'react-router-dom'

import {Button} from 'antd'

import { exitLogin,queryInfo} from '../../api/person'

import action from '../../store/action/index'

class Info extends React.Component{
    constructor(props){
        super(props);
        this.state = {
            baseInfo :null
        }

    }

    //用这种方式从服务器获取数据是可以的，但每次切换组件都会重新去服务器请求，避免这种方式，我们使用redux
    /*async componentDidMount() {
        let result = await queryInfo();
        if(parseFloat(result.code)===0){
            this.setState({baseInof:result.data})
        }
    }*/

    componentWillMount(){
        let {baseInfo,queryBaseInfo} = this.props
        ////如果baseInfo不存在
        //!baseInfo ? queryInfo():null
        if(!baseInfo){
            queryBaseInfo()
        }
    }
    render(){
        let {baseInfo} = this.props
        if(!baseInfo){
            return ''
        }
        let {name,email,phone} = baseInfo
        return <div className="personBaseInfo">
            <p>
                <span>用户名</span>
                <span>{name} </span>
            </p>
            <p>
                <span>邮箱</span>
                <span>{email} </span>
            </p>
            <p>
                <span>电话</span>
                <span>{phone} </span>
            </p>
            <Button type="danger" onClick={async ev=>{
                await exitLogin();
                this.props.history.push('/person')

            }}>退出登录</Button>
        </div>
    }
}
export default withRouter(connect(state=>({...state.person}),action.person)(Info))
