import React from 'react'
import {connect} from 'react-redux'
import { Carousel,Icon,Button} from 'antd';
import course from "../../store/reducer/course";
import action from '../../store/action/index'
import {Link} from "react-router-dom";

class List extends React.Component{
    constructor(props){
        super(props)
        this.state = {isLoading:false}
    }
    async componentDidMount() {
        let {queryBanner,bannerData,courseData,queryList} = this.props
        if(!bannerData || bannerData.length===0){
            await queryBanner()//DISPATCH
        }
        if(courseData.data.length===0){
            await queryList()//DISPATCH
        }

    }
    //根据返回值来判断显示啥
    queryType = ()=>{
        let {courseType} = this.props;
        let text = '全部课程'
        switch(courseType){
            case 'react':
                text = 'React框架'
                break;
            case 'vue':
                text = 'vue框架'
                break;
            case 'xiaochengxu':
                text = '小程序框架'
                break;

        }
        return text;

    }
    loadMore = ()=>{
        let {queryList,courseData,courseType} = this.props;
        //防止过快点击
        if(this.state.isLoading) return ;
        this.setState({isLoading:true})

        //重新发送新的dispatch:page是在当前page的基础上累加1，type依然沿用当前筛选的type，flag点击加载更多，是像redux容器中追加新获取的信息
        queryList({
            page:courseData.page+1,
            type:courseType,
            flag:'push'

        })


    }

    componentWillReceiveProps(){
        //当前案例中，触发这个生命周期函数，说明传递给组件的属性改变了（路由重新渲染或redux容器中的状态改变了。）
        this.setState({isLoading:false})
    }


    render(){
        let {bannerData,courseType,courseData} = this.props
        let {data} = courseData;

        return <section className="ListBox">
            {/*轮播图*/}
            {
                bannerData&&bannerData.length!==0?(<Carousel autoplay>
                    {
                        bannerData.map((item,index)=>{
                            let {pic,name} = item;
                            return <div key={index}><img src={pic} alt={name}/></div>
                        })
                    }
                </Carousel>):null
            }

            {/*数据列表*/}
            <div className="courseList">
                <h2><Icon type="menu-folid"/>{/*全部课程*/}{this.queryType()}</h2>
                {data&&data.length!==0?(<div>
                    <ul>
                        {/*<li>
                            <Link to={{
                                pathname:'/course/info',
                                serach:'?'
                            }}>
                                <h3>React开发课程</h3>
                                <div className="content">
                                    <div className="pic">
                                        <img src="" alt=""/>
                                    </div>
                                    <div className="desc">
                                        <p>描述</p>
                                        <p>时间：1小时</p>
                                    </div>

                                </div>
                            </Link>
                        </li>*/}
                        {
                            data.map((item,index)=>{
                                let {name,pic,dec,id,time} = item;
                                return (<li key={index}>
                                    <Link to={{
                                        pathname:'/course/info',
                                        search:`?courseId=${id}`
                                    }}>
                                        <h3>{name}</h3>
                                        <div className="content">
                                            <div className="pic">
                                                <img src={pic} alt=""/>
                                            </div>
                                            <div className="desc">
                                                <p>{dec}</p>
                                                <p>时间：{time}</p>
                                            </div>

                                        </div>
                                    </Link>
                                </li>)
                            })
                        }
                    </ul>
                    {
                        //判断总条数和redux中的总条数相等，就隐藏"加载更多"按钮
                        courseData.total<=courseData.page?'':<Button type="dashed" onClick={this.loadMore} loading={this.state.isLoading}>加载更多</Button>
                    }

                </div>):'暂无数据'}


            </div>
        </section>
    }
}
export default connect(state=>({...state.course}),action.course)(List)
