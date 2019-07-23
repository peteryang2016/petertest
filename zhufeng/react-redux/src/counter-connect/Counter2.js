import React from 'react'
import {INCREASE,DESCREASE} from '../todo-plus/actions'
import connect from './connect'
class Counter2 extends React.Component{
    render(){
        return(
            <div>
                {this.props.value}
                <button onClick={this.props.onIncrease}>+</button>
                <button onClick={this.props.onDecrease}>-</button>
            </div>
        )
    }
}



//mapStateToProps:将store里的状态映射成属性
let mapStateToProps = (state) =>(
    {value:state.num}
)
//mapDispatchToProps  把dispatch方法映射成ui组件的属性
let mapDispatchToProps = (dispatch)=>(
    {
        onIncrease:()=>dispatch({type:INCREASE,num:2}),
        onDecrease:()=>dispatch({type:DESCREASE,num:1})
    }
)
export default connect(mapStateToProps,mapDispatchToProps)(Counter2)
