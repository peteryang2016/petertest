import React from 'react'
import Votehead from './Votehead'
import PropTypes from 'prop-types'
import Votebody from "./Votebody";
import VoteFooter from "./VoteFooter";
export default class Component extends React.Component{

    static childContextTypes = {
        m:PropTypes.number,
        n:PropTypes.number,
        callBack:PropTypes.func
    }
    getChildContext(){
        let {m,n} = this.state;
        return {
            m:m,
            n:n,
            callBack:this.handleClick
        }
    }
    constructor(props){
        super(props)
        let {count:{m,n}} = this.props;
        this.state = {m,n}
    }
    render(){
        return(
            <div className="panel panel-default" style={{width:'500px',margin:'0 auto'}}>
                <Votehead title={this.props.title}/>
                <Votebody/>
                <VoteFooter/>
            </div>
        )
    }
    handleClick = (type)=>{
        //support  against
        if(type==='support'){
            this.setState({m:this.state.m+1})
            return
        }
        this.setState({n:this.state.n+1})
    }

}
