import React from 'react'
import Votehead from './Votehead'
import PropTypes from 'prop-types'
import Votebody from "./Votebody";
import VoteFooter from "./VoteFooter";
import VoteMyRedux from "../../index";
export default class Component extends React.Component{
    constructor(props){
        super(props)
        let {count:{n,m},myRedux} = this.props;
        myRedux.updateState(state=>{
            return {
                ...state,
                n,
                m
            }
        })
    }
    render(){
        return(
            <div className="panel panel-default" style={{width:'500px',margin:'0 auto'}}>
                <Votehead title={this.props.title}/>
                <Votebody myRedux={this.props.myRedux}/>
                <VoteFooter myRedux={this.props.myRedux}/>
            </div>
        )
    }
}
