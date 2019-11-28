import React from 'react'
import action from '../../store/action/index'
import {connect} from 'react-redux'
class Votehead extends React.Component{
    constructor(props){
        super(props)
    }

    componentWillMount(){
        this.props.init({title:'react-redux-peter',n:20,m:20});
    }
    render(){
        let {n,m,title} = this.props;
        console.log(title);
        return(
            <div className="panel-heading">
                <h3 className="panel-title">11111-{this.props.title}</h3>
            </div>
        )
    }
}
/*
//标准写法：
let mapStateToProps = (state)=>{
    return {
        ...state.vote
    }

}
let mapDispatchToProps = (dispatch)=>{
    return {
        init(initData){
            dispatch(action.vote.init(initData))
        }
    }
}
export default connect(mapStateToProps,mapDispatchToProps)(Votehead)
*/
//简单写法：
export default connect(state=>({...state.vote}),action.vote)(Votehead)
