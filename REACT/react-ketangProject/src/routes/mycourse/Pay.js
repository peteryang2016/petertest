import React from 'react'
import {connect} from 'react-redux'
import action from '../../store/action/index'
import CourseItem from './CourseItem'
import {checkLogin} from '../../api/person'
import {Link} from 'react-router-dom'
import {Alert} from 'antd'
class Pay extends React.Component{
    constructor(props){
        super(props)
        this.state = {
            isLogin:false
        }
    }
    async componentDidMount(){
        let result =  await checkLogin();
        console.log(result);
        if(parseFloat(result.code)===0){
            this.setState({isLogin:true})
        }
    }
    render(){
        if(this.state.isLogin===false){
            return <Link to="/person/login">
                <Alert type="warning" description="还未登录，请先登录"/>
            </Link>
        }
        let {pay } = this.props.shopCart;
        if(pay.length===0){
            return <Alert description="购物车空空" type="warning" style={{marginTop:'.2rem'}}/>
        }

        return <ul className="courseItem">
            {
                pay.map((item,index)=>{
                    return <CourseItem key={index} item={item}/>
                })
            }

        </ul>
    }
}
export default connect(state=>state.course,action.course)(Pay)
