import React from 'react';
import ReactDOM from 'react-dom';
import './static/css/reset.min.css'
import 'bootstrap/dist/css/bootstrap.css'
import Banner from "./component/Banner";
import Vote from './component/vote-context/Vote'
import VoteMyRedux from './component/vote-myRedux/Vote'
import VoteRedux from './component/voteRedux/Vote'
import PropTypes from 'prop-types'
import store from './store/index'

//import Dialog from "./component/Dialog";
//全局下挂载一个容器来实现信息共享
let myRedux = (function anonymous() {//自执行函数
    let stateObj = {};//状态对象
    let listenAry=[];//监听数组，状态改变时它要做的事
    function updateState(callBack) {//callback就是要修改状态的操作
        //callBack回调函数中一定是修改并且返回最新的状态信息,用返回的状态信息替换原有的状态信息
        let newObj = callBack(stateObj)
        stateObj = {...stateObj,...newObj}
        //当状态更改通知计划表中的方法执行
        listenAry.forEach(item=>{
            if(typeof item === 'function'){
                item()
            }
        })
    }

    //获取状态信息
    function getState() {
        return stateObj;
    }
    function subscribe(fn) {
        for (let i = 0; i < listenAry.length; i++) {
            let item = listenAry[i];
            if(item===fn){
                return;
            }
        }
        listenAry.push(fn)
    }
    return {
        updateState,
        getState,
        subscribe
    }

    //react不允许给windo上加全局属性，所以我们只能用属性传参的方式
    /*window.myRedux = {
        updateState,
        getState,
        subscribe
    }*/

})();
class Dialog extends React.Component{
    /*
        this.props是只读的，我们无法再方法中修改它的值，但是可以给其设置默认值或者设置一些规则（例如：设置是否是必须传递的以及传递值的类型等。）
    */
    static defaultProps= {
        lx:'系统提示'
    }
    /*prop-types是facebook公司开发的一个插件，基于这个插件我们可以给组件床底的属性设置规则(设置规则不会影响页面的渲染，但是会在控制台抛出警告错误)*/
    static propTypes = {
        //con:PropTypes.string, //传递的内容需要是字符串
        con:PropTypes.string.isRequired,//不仅传递的内容是字符串，并且还必须传递。

    }
    constructor(){
        super()//es6中的extends继承，一旦使用了constructor，第一行位置必须设置super执行：相当于React.Component.call(this),也就是call继承，把父类私有的属性继承过来。
        this.state = {test:1}
    }
    componentWillMount(){
        setInterval(()=>{
            this.setState({test:this.state.test+1})
        },5000)
        console.log(this.state.test);
    }
    componentWillUpdate() {
        console.log('componentWillUpdate',this.state.test);
    }

    componentDidMount(){
        console.log('componentDidMount');
        console.log(this.state.test);
    }
    render(){
        console.log('render');
        return <section>
            <h3>系统提示</h3>
            <div></div>
        </section>
    }
}
/*class Temp extends React.Component{
    constructor(){
        super();
        this.state = {text:'Peter'}
    }
    //1秒钟更新状态
    componentDidMount() {
        setTimeout(()=>{
            this.setState({text:'杨德金'})
        },1000)
    }

    render(){
        let {text} = this.state
        return(
            <section className="panel panel-default">
                <div className="panel-heading">
                    <input type="text" className="form-control" value={text} onChange={(ev)=>{
             //在文本框的onChange中修改状态信息，实现的是视图改变数据
             this.setState({
                 text:ev.target.value
             })
                    }}/>
                </div>
                <div className="panel-body">
                    {text}
                </div>
            </section>
        )
    }
}*/


let IMG_DATA=[/*{
    id:1,
    title:'',
    pic:require('./static/images/1.png')
},{
    id:2,
    title:'',
    pic:require('./static/images/2.png')
},{
    id:3,
    title:'',
    pic:require('./static/images/3.png')
},{
    id:4,
    title:'',
    pic:require('./static/images/4.png')
},{
    id:5,
    title:'',
    pic:require('./static/images/5.png')
}*/]
for(let i=1;i<=5;i++){
    IMG_DATA.push({
        id:i,
        title:'',
        pic:require(`./static/images/${i}.jpg`)
    })
}
ReactDOM.render(<main>
   {/*<Dialog type="请登录" content="新的jsx语法">
       <button className="btn btn-success">登录</button>
       <button className="btn btn-danger">取消</button>
   </Dialog>

    <Dialog type="请登录" content={
    <div>
    <input type="text" className="form-control" placeholder="请输入用户名"/>
    <input type="password" className="form-control" placeholder="请输入密码"/>
    </div>
}>
<button className="btn btn-success">登录</button>
    <button className="btn btn-danger">取消</button>

    </Dialog>*/}


    {/*
    *  data:轮播图需要绑定的数据（空数组）
    *  interval：自动轮播间隔时间（3000MS）
    *  step：默认展示图片的索引（记住第一张、最后一张克隆一张）（1）
    *  speed：每一张切换所需要的运动时间（300MS）
    *
    */}
    <Banner data={IMG_DATA}
            interval={3000}
            step={1}
            speed={300}/>
    <Vote title="赛事情况-conText" count={{m:68,n:23}}/>
    <VoteMyRedux myRedux={myRedux} title="赛事情况-myRedux" count={{n:100,m:100}}/>
    <VoteRedux store={store} title="redux"/>
</main>, document.getElementById('root'));



