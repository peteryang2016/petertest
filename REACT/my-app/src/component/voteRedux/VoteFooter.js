import React from 'react'
import * as TYPE from '../../store/action-types.js'
import action from '../../store/action/index'
import {connect} from 'react-redux'
class VoteFooter extends React.Component{
    constructor(props){
        super(props)
    }
    render(){
        return(
            <div className="panel-footer">
                <button className="btn btn-success" onClick={
                    this.props.support
                }>支持</button>
                &nbsp;&nbsp;&nbsp;&nbsp;&nbsp;
                <button className="btn btn-danger" onClick={
                    this.props.against
                }>反对</button>
            </div>
        )
    }
}
/*
//标准写法
let mapStateToProps = state=>{
    return {
        ...state.vote
    }
}
let mapDispatchToProps = dispatch=>{
    return {
        support(){
            dispatch(action.vote.support())
        },
        against(){
            dispatch(action.vote.against())
        }
    }
}
export default connect(mapStateToProps,mapDispatchToProps)(VoteFooter)
*/
//简单写法
export default connect(state=>({...state.vote}),action.vote)(VoteFooter)
