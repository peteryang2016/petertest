import React from 'react'
import action from '../../store/action/index'
import {connect} from 'react-redux'
class Votebody extends React.Component{
    constructor(props){
        super(props)
        /*let {n,m,title} = this.props.store.getState().vote;
        this.state = {n, m,title}*/
     }
    /*componentWillMount() {
        this.props.store.dispatch(action.vote.init({title:'我长得帅吗？',n:600,m:600}))
        this.setState({
            ...this.props.store.getState().vote
        })
    }

    componentDidMount() {
        this.props.store.subscribe(()=>{
            let {n,m,title} = this.props.store.getState().vote
            this.setState({n, m,title})
        })
    }*/

    render(){
        let {n,m,title} = this.props
        let rate = n/(n+m)*100
        rate = isNaN(rate)?0:rate;
        return(
            <div className="panel-body">
                小标题：{title}
                <br/>
                支持：{n}
                <br/>
                反对：{m}
                <br/>
                支持率：{rate.toFixed(2)}%
            </div>
        )
    }
}
/*
//标准写法：
let mapStateToProps = (state)=>{
    return {...state.vote}
}
let mapDispatchToProps = (dispatch)=>{
    return {
        init(initData){
            dispatch(action.vote.init(initData))
        }
    }
}
export default connect(mapStateToProps,mapDispatchToProps)(Votebody)
*/
//简单写法
export default connect(state=>({...state.vote}),action.vote)(Votebody)
