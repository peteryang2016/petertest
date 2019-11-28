import React from 'react'
import {connect} from 'react-redux'
import action from '../../store/action/index'
import CourseItem from './CourseItem'
import {Alert,Button} from 'antd'
import {removeShopCart,payShopCart} from '../../api/course'
import {checkLogin} from '../../api/person'
class Unpay extends React.Component{
    constructor(props){
        super(props)
    }
    render(){
        let {unPay} = this.props.shopCart
        if(unPay.length===0){
            return <Alert description="当前还没有购买，快去购买" type="warning" style={{marginTop:'.2rem'}}/>
        }
        return <div>
            <div style={{
                marginTop:'.2rem',
                height:'.7rem',
                lineHeight:'.7rem',
                padding:'.1rem'
            }}>
                <input type="checkbox" checked={this.props.selectAll}
                       onChange={this.props.handleSelect.bind(this,'all')}/>
                全选/全不选
                <Button type="dashed" onClick={this.handleRemove}>删除</Button>
                <Button type="dashed" onClick={this.handlePay}>支付</Button>
            </div>
            <ul className="courseItem">
                {
                    unPay.map((item,index)=>{
                        return <CourseItem key={index} item={item} input={true}/>
                    })
                }

            </ul>
        </div>
    }
    //删除选中项
    handleRemove=()=>{
        //获取所有被选中的课程id
        let selectIDList = []
        this.props.shopCart.unPay.forEach(item=>{
            if(item.check){
                selectIDList.push(item.id)
            }
        });
        if(selectIDList.length===0){
            alert('没有要被删除的信息')
            return;
        }
        //根据id发送删除的请求：生成一个axios删除操作的返回promise数组，基于promise.all验证是否都完成。
        selectIDList = selectIDList.map(courseID=>{
            return removeShopCart(courseID)
        })
        Promise.all(selectIDList).then(()=>{
            this.props.queryUnpay()//dispatch派发任务
        })
    }
    //支付选中项
    handlePay=async ()=>{
        //验证当前是否登录
        let result = await checkLogin()
        if(parseFloat(result.code)!==0){
            alert('请先登录')
            return
        }
        //获取被选中的id
        let selectIDList = []
        this.props.shopCart.unPay.forEach(item=>{
            if(item.check){
                selectIDList.push(item.storeID)
            }
        });
        if(selectIDList.length===0){
            alert('没有选中要支付的内容')
            return;
        }
        //根据id发送删除的请求：生成一个axios删除操作的返回promise数组，基于promise.all验证是否都完成。
        selectIDList = selectIDList.map(storeID=>{
            return payShopCart(storeID)
        })
        Promise.all(selectIDList).then(()=>{
            this.props.queryUnpay()//dispatch派发任务
            this.props.queryPay()//dispatch派发任务
        })

    }
}
export default connect(state=>state.course,action.course)(Unpay)
