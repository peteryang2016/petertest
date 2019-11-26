import React from 'react'
import {connect} from 'react-redux'
import Qs from 'qs'
class Detail extends React.Component{
    constructor(props){
        super(props)
    }
    render(){
        let {data,location:{search}}=this.props;
        console.log(search);
        let customID = Qs.parse(search.substr(1)).id||0
        customID = parseFloat(customID)
        let item = data.find(item=>parseFloat(item.id)===customID)
        if(!item) return '当前用户不存在'
        return(<div>
            编号：{item.id}
            <br/>
            姓名：{item.name}
        </div>)
    }
}
export default connect(state=>({...state.custom}))(Detail)
