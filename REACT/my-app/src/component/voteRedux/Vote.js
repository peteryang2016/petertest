import React from 'react'
import Votehead from './Votehead'
import Votebody from "./Votebody";
import VoteFooter from "./VoteFooter";
export default class VoteRedux extends React.Component{
    constructor(props){
        super(props)
    }
    render(){
        return(
            <div className="panel panel-default" style={{width:'500px',margin:'0 auto'}}>
                <Votehead/>
                <Votebody/>
                <VoteFooter/>
            </div>
        )
    }
}
