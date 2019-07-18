import React from 'react'
import 'antd/dist/antd.css';
import {Row,Col} from 'antd';
import './App.css'
export default class App extends React.Component{
    render(){
        return(
           <div>
               <Row>
                 <Col span={12} offset={6}>
                   <div className="todoBox">
                      <div className="todoHeader">header</div>
                      <div className="todoBody">header</div>
                      <div className="todoFooter">todoFooter</div>
                   </div>
                 </Col>
               </Row>
           </div>
        )
    }
}
