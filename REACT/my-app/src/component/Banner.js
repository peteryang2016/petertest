import React from 'react'
import PropTypes from 'prop-types'
import '../static/css/banner.css'
export default class Banner extends React.Component{
    //设置属性的默认值和规则
    static defaultProps = {
        data:[],
        interval:3000,
        step:1,
        speed:300
    }
    static propTypes = {
        data:PropTypes.array,
        interval:PropTypes.number,
        step:PropTypes.number,
        speed:PropTypes.number,
    }
    constructor(props){
        super(props)
        let {step,speed} = this.props
        this.state = {//往实例上挂载一个state
            step:step,
            speed:speed

        }
    }
    componentWillMount() {
        let {data} = this.props;
        //克隆数据
        let cloneData = data.slice(0);//原封不动克隆一份
        cloneData.push(data[0])//克隆原数组的第一项，放到新数组尾部
        cloneData.unshift(data[data.length-1])
        this.cloneData = cloneData;//挂载到实例上供其他方法调用
    }
    componentDidMount(){
        //把定时器返回值挂载到实例上，方便后期清除：结束自动轮播
        this.autoTimer = setInterval(this.moveRight,this.props.interval)
    }
    componentWillUpdate(nextProps,nextState) {
        //边界判断:如果最新修改的step索引大于最大索引（说明此事已经是末尾了，不能往后走了），我们让其立即回到（无动画）索引为1的位置
        if(nextState.step>(this.cloneData.length-1)){
            this.setState({
                step:1,
                speed:0
            })
        }
        //向左边界判断：如果当前最新修改的索引已经小于0，说明不能继续向左走了，我们让其立即回到倒数第二张图片位置（真实的最后一张图片）
        if(nextState.step<0){
            this.setState({
                step:this.cloneData.length-2,
                speed:0
            })

        }

    }
    componentDidUpdate() {
        //只有是从克隆的第一张立即切换到真实第一张后，我们才做如下处理：让其从当前第一张运动到第二张即可。
        let {step,speed} = this.state;
        if(step===1 && speed===0){
            //为啥要设置定时器延迟：css3的transition有一个问题（主栈执行的时候，短时间内遇到两次设置transition-drration代码，以最后一次设置为主）
            let delayTimer = setTimeout(()=>{
                clearTimeout(delayTimer)
                this.setState({
                    step:step+1,
                    speed:this.props.speed
                })
            })
        }




        //向左边界判断：立即回到倒数第二张图片（真实数据的最后一张），我们让其向回在运到一张
        if(step===this.cloneData.length-2 &&speed===0){
            let delayTimer = setTimeout(()=>{
                clearTimeout(delayTimer)
                this.setState({
                    step:step-1,
                    speed:this.props.speed
                })
            })
        }
    }

    render(){
        let {data} = this.props,
            {cloneData} = this;
        if(data.length===0) return ''

        //控制wrapper样式
        let {step,speed} = this.state;
        let wrapperSty = {
            width:cloneData.length*1000+'px',
            left:-step*1000+'px',
            transition:`left ${speed}ms linear 0ms`
        }
        return(
            <section className="container"
                     onMouseEnter={this.movePause}
                     onMouseLeave={this.movePlay}
                     onClick={this.handleClick}>
                <ul className="wrapper" style={wrapperSty} onTransitionEnd={()=>{
                    /*wrapper切换动画完成，再去执行下一次切换任务*/
                    this.isRun = false;
                }}>
                    {cloneData.map((item,index)=>{
                        let {title,pic} = item;
                        return <li key={index} ><img src={pic} alt={title}/></li>
                    })}
                </ul>
                <ul className="focus">
                    {data.map((item,index)=>{
                        let tempIndex = step-1;
                        //step===0?tempIndex = data.length-1:null;
                        tempIndex = step===0?data.length-1:tempIndex;
                        //step===(cloneData.length-1)?tempIndex=0:null;
                        tempIndex=step===(cloneData.length-1)?0:tempIndex;
                        return <li key={index} className={tempIndex===index?'active':''}></li>
                    })}
                </ul>
                <a href="javascript:;" className="arrow arrowLeft"></a>
                <a href="javascript:;" className="arrow arrowRight"></a>
            </section>
        )
    }

    //向右切换:自动轮播或者点击有切换按钮
    moveRight = ()=>{
        this.setState({
            step:this.state.step+1
        })
    }

    //自动轮播的暂停和开启
    movePause = ()=>{
        clearInterval(this.autoTimer);
    }

    movePlay = ()=>{
        this.autoTimer = setInterval(this.moveRight,this.props.interval)
    }

    //事件委托
    handleClick = (ev)=>{
        let target = ev.target;
        let tarTag = target.tagName;
        let tarClass = target.className;
        if(tarTag==='A' && /(^| +)arrow( +|$)/.test(tarClass)){

            if(this.isRun) return;//防止点击过快判断
            this.isRun = true;
            //右按钮
            if(tarClass.indexOf('arrowRight')>=0){
                this.moveRight()
                return
            }
            //左按钮
            this.setState({
                step:this.state.step-1
            })

            return;
        }
    }
}
