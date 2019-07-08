import React from "react";
export default class TodoHeader extends React.Component{
    constructor(props){
        super(props)
    }
    handleKeyUp = (event)=>{
        let title = event.target.value;
        if(event.keyCode===13){
            this.props.addTodo({title})
            event.target.value = ''
        }
    }
    render(){
        return(
            <div className="input-group">
                <input type="text" placeholder="请输入要增加的项目" onKeyUp={this.handleKeyUp} className="form-control"/>
            </div>
        )
    }
}
