import React from 'react'
import {connect} from 'react-redux'
import action from '../store/action/index'
class Body extends React.Component{
    constructor(props){
        super(props)
    }
    render(){
        //获取redux中的任务数据，根据flag标识，筛选对应的内容
        let {data,flag} = this.props
        data = data.filter((item,index)=>{
            let {state} = item;
            state = parseFloat(state)
            if(flag==='all') return true;
            if(flag==='complate') return state===1;
            if(flag==='uncomplate') return state===0;

        })
        return(
            <div className="panel-body">
                <ul className="list-group">
                    {
                        data.map((item,index)=>{
                            let {id,name,state} = item;
                            state = parseFloat(state)
                            return <li className="list-group-item" key={index}>
                                {/*!!state:!是将数字类型转换为布尔值*/}
                                <input name="todo" type="checkbox" checked={!!state}
                                       onChange={(ev)=>{
                                           //更新当前任务的状态信息
                                           let newState = ev.target.checked?1:0;
                                           this.props.updataState(id,newState)

                                        }}/>
                                <span className={state===1?'complete':''}>{name}</span>
                                <a href="javascript:;" className="btn-danger"
                                   onClick={()=>{
                                       this.props.remove(id)
                                   }}>删</a>
                            </li>
                        })
                    }
                    {/*<li className="list-group-item">
                        <input name="todo" type="checkbox"/>
                        <span className="complete">123</span>
                        <a href="javascript:;" className="btn-danger">删</a>
                    </li>*/}
                </ul>
            </div>
        )
    }
}
export default connect(state=>({...state.todo}),action.todo)(Body)
