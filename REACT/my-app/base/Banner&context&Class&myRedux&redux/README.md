#一、Banner:使用生命周期来实现
```
import Banner from "./component/Banner";
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
/*
    *  data:轮播图需要绑定的数据（空数组）
    *  interval：自动轮播间隔时间（3000MS）
    *  step：默认展示图片的索引（记住第一张、最后一张克隆一张）（1）
    *  speed：每一张切换所需要的运动时间（300MS）
    *
    */
<Banner data={IMG_DATA}
            interval={3000}
            step={1}
            speed={300}/>
```



#二、Vote计数器：使用conText上下文来实现
```$xslt
import Vote from './component/vote-context/Vote'
<Vote title="赛事情况" count={{m:68,n:23}}/>
```

#三、 父组件中有一些信息，父组件把一个方法传递给A，A中把方法执行（方法执行修改父组件信息值），父组件再把最新的信息传递给B即可，等价于A操作，影响了B

```
class Head extends React.Component{
    constructor(){
        super();
    }
    render(){
        return(
            <div className="panel-heading">
                <h3 className="panel-title">点击次数：{this.props.count}</h3>
            </div>
        )
    }
}

class Body extends React.Component{
    constructor(){
        super();
    }
    render(){
        return(
            <div className="panel-body">
                <button className="btn btn-success" onClick={this.props.callBack}>点我啊</button>
            </div>
        )
    }
}

class Panel extends React.Component{
    constructor(){
        super();
        this.state = {n:0}
    }
    onChange = ()=>{
        this.setState({n:this.state.n+1})
    }
    render(){
        return(
            <section className="panel panel-default" style={{width:'50%',margin:'0 auto'}}>
                <Head count={this.state.n}/>
                <Body callBack={this.onChange}/>
            </section>
        )
    }
}
```
#四、myRedux（自己写一个非常low的redux）
#五、redux的vote
