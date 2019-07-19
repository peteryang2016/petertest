import React from 'react'
import 'antd/dist/antd.css';
import {Row,Col} from 'antd';
import './App.css'
export default class App extends React.Component{
    constructor(){
        super();
        this.state = {num:0};

    }
    changeClick = ()=>{
        this.setState({num:this.state.num+1})
    }
    componentWillMount(){
        alert('11')
        console.log(this.state.num);
    }
    render(){
        return(
           <div>
               <Row>
                 <Col span={12} offset={6}>
                   <div className="todoBox">
                      <div className="todoHeader">header</div>
                      <div className="todoBody">header</div>
                      <div className="todoFooter">todoFooter</div>
                      <div><button onClick={this.changeClick}>{this.state.num}</button></div>
                   </div>
                 </Col>
               </Row>
           </div>
        )
    }
}
