import React from 'react';
import ReactDOM from 'react-dom';
class Toggle extends React.Component{
    constructor(props){
        super(props)
        this.state = {isToggle:true}
    }
    handleClick(msg){
        console.log(this);
        console.log(msg);

    }
    render(){
        return(
            <button onClick={this.handleClick.bind(this,'click')}>
                {this.state.isToggle?'关闭':'打开'}
            </button>
        )
    }
}
ReactDOM.render(<Toggle />,document.getElementById('root'))
