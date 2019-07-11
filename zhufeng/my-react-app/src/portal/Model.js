import React from 'react'
import ReactDOM from 'react-dom'
import './Model.css'
export default class Model extends React.Component{
    constructor(props){
        super(props)
        this.state = {show:false}
    }
    render(){
        return(
            <div>
                <button onClick={()=>this.setState({show:!this.state.show})}>显示</button>
                {
                    this.state.show?<Modal>
                        <div className="modal-container">
                            <div className="modal-content">
                                <h1>显示模态框窗口</h1>
                                <h2>Portal 提供了一种将子节点渲染到存在于父组件以外的 DOM 节点的优秀的方案</h2>
                            </div>
                        </div>
                    </Modal>:null
                }
            </div>
        )
    }
}


class Modal extends React.Component{
    constructor(props){
        super(props)
        this.container = document.getElementById("modal-root")
    }
    render(){
        return ReactDOM.createPortal(this.props.children,this.container)
    }
}
