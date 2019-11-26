import React from 'react'
import {connect} from 'react-redux'
import {Button} from 'antd'
import {queryInfo,addShopCart,removeShopCart} from "../../api/course";
import Qs from 'qs'
import action from '../../store/action/index'
import course from "../../store/reducer/course";

class Info extends React.Component{
    constructor(props){
        super(props)
        this.state = {
            data:null,//这个页面的信息
            isShop:-1,//存储是否已经加入到购物车中   -1还没有加入购物车（按钮显示加入购物车）、0已加入购物车（按钮显示移除购物车）1已支付（按钮不显示）
        }
    }
    async componentDidMount() {
        let {location:{search}} = this.props//获取url参数 ?courseid=xxx
        let {courseId = 0} = Qs.parse(search.substr(1))||{}//将字符串解析对象 courseId=1
        this.courseId = courseId;//将courseId挂载到实例上，挂载到实例上的目的是在其他方法中也可以随时使用courseId
        let result = await queryInfo(courseId)
        if(parseFloat(result.code)===0){
            //校验当前的课程是已支付还是未支付，或者是还未加入购物车
            let {pay,unPay} = this.props.shopCart;
            let isShop = -1;
            //在redux未购买和已购买的集合中筛选是否有当前展示的课程，有的话说明当前课程已经加入购物车了，没有说明还未加入
            //pay.find(item=>parseFloat(item.id)===parseFloat(courseId))?isShop=1:null;
            pay.find(item=>{
                if(parseFloat(item.id)===parseFloat(courseId)){
                    isShop = 1
                }
            })
            //unPay.find(item=>parseFloat(item.id)===parseFloat(courseId))?isShop=0:null;
            unPay.find(item=>{
                if(parseFloat(item.id)===parseFloat(courseId)){
                    isShop = 0
                }
            })
            this.setState({
                data:result.data,//这个页面的信息
                isShop
            })
        }
    }

    render(){
        let {data,isShop} = this.state;
        if(!data) return '暂无数据'
        return <div className="baseInfo">
            <video src="" controls preload='none'/>{/*controls:默认浏览器播放器播放*/}
            <div className="content">
                <h3>名称:{data.name}</h3>
                <p>描述{data.dec}</p>
                <span>价格：{data.price}</span>
                {
                    isShop!==1?(<Button type={isShop===-1?'dashed':''} onClick={this.handleShopCart}>{isShop===-1?'加入购物车':'从购物车移除'}</Button>):''
                }

            </div>
        </div>
    }

    handleShopCart = async ()=>{
        if(this.state.isShop===-1){
            //还未加入购物车（按钮：加入购物车）
            let result = await addShopCart(this.courseId);
            if(parseFloat(result.code)===0){
                this.props.queryUnpay()//dispatch派发任务；通知redux容器中的购物信息进行更新
                //页面重新展示最新样式
                this.setState({isShop:0});
            }else{
                alert('失败')
            }
            return
        }
        //已经加入购物车(按钮显示移除购物车)
        let result = await removeShopCart(this.courseId);
        if(parseFloat(result.code)===0){
            this.props.queryUnpay()//dispatch派发任务；更新购物车存储的数据，通知redux容器中的购物信息进行更新
            //页面重新展示最新样式
            this.setState({isShop:-1});
        }else{
            alert('失败')
        }

    }
}
export default connect(state=>state.course,action.course)(Info)
