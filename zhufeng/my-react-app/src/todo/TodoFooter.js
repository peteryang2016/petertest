import React from 'react';
import * as filterTypes from './filter-types'
export default class TodoFooter extends React.Component{
    render(){
        return(
            <div className="row">
                <div className="col-md-4">还有{this.props.activeTodoCount}件代办事项</div>
                <div className="col-md-6">
                    <button type="button" className={`btn ${this.props.filterType===filterTypes.ALL?'btn-primary':'btn-default'}`} onClick={()=>this.props.changeFilterType(filterTypes.ALL)}>全部</button>
                    <button type="button" className={`btn ${this.props.filterType===filterTypes.COMPLETED?'btn-primary':'btn-default'}`} onClick={()=>this.props.changeFilterType(filterTypes.COMPLETED)}>已完成</button>
                    <button type="button" className={`btn ${this.props.filterType===filterTypes.ACTIVE?'btn-primary':'btn-default'}`} onClick={()=>this.props.changeFilterType(filterTypes.ACTIVE)}>未完成</button>
                </div>
                <div className="col-md-2"></div>
            </div>
        )
    }
}
