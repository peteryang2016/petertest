import React from 'react'
import Votehead from './Votehead'
import PropTypes from 'prop-types'
import Votebody from "./Votebody";
import VoteFooter from "./VoteFooter";
import VoteMyRedux from "../../index";
export default class VoteRedux extends React.Component{
    constructor(props){
        super(props)
    }
    render(){
        let {store} = this.props
        return(
            <div className="panel panel-default" style={{width:'500px',margin:'0 auto'}}>
                <Votehead title={this.props.title}/>
                <Votebody store={store}/>
                <VoteFooter store={store}/>
            </div>
        )
    }
}
