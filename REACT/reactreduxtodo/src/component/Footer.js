import React from 'react'
import {connect} from 'react-redux'
import action from '../store/action/index'
import * as TYPES from '../store/action-types'

class Footer extends React.Component{
    constructor(props){
        super(props)
        this.showData = [
            {text:'全部',flag:'all'},
            {text:'已完成',flag:'complate'},
            {text:'未完成',flag:'uncomplate'}
        ]//实例挂载一个属性
    }
    render(){
        let {flag} = this.props;
        return(
            <div className="panel-footer">
                <ul className="nav nav-pills" onClick={this.updateFilter}>
                    {
                        this.showData.map((item,index)=>{
                            let {text,flag:itemFlag} = item;
                            return <li key={index} className={itemFlag===flag?'presentation active':'presentation'} key={index}>
                                <a href="javascript:;" flag={itemFlag}>{text}</a>
                            </li>
                        })
                    }


                </ul>
            </div>
        )
    }
    updateFilter = (ev)=>{
        let target = ev.target;
        let tarTag = target.tagName
        //合并事件源，事件源是LI，也让其变为里面的A
        if(tarTag==='LI'){
            let target = target.firstElementChild;
            let tarTag = target.tagName
        }
        if(tarTag==='A'){
            //let text = 'all';
            //target.innerHTML==='已完成'? text = "complate" : null;
            //target.innerHTML === '未完成'? text = "uncomplate" : null;
            /*
            let text = 'all';
            switch (target.innerHTML) {
                case '已完成':
                    text = 'complate';
                    break
                case '未完成':
                    text = 'uncomplate';
                    break
                default:
                    text = 'all';
                    break
            }*/
            let text = target.getAttribute('flag')
            //当前筛选状态和点击的按钮是一致的，这样是没有必要在重新更新筛选状态的
            if(this.props.flag===text){
                return
            }
            this.props.filter(text)
        }


    }
}
export default connect(state=>({...state.todo}),action.todo)(Footer)
