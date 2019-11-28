import React from 'react'
import {connect} from 'react-redux'
import action from '../../store/action/index.js'
import {Link} from "react-router-dom";


class List extends React.Component{
    constructor(props){
        super(props)
    }
    render(){
        let {data} = this.props;
        return(<ul className="list-group">
            {
                data.map((item,index)=>{
                    return (

                        <li key={index} className="list-group-item">
                            <Link to={{
                                pathname:'/custom/detail',
                                search:`id=${item.id}`
                            }}>
                                编号：{item.id}
                                &nbsp;
                                姓名：{item.name}
                            </Link>
                    </li>
                    )
                })
            }
        </ul>)
    }
}
export default connect(state=>({...state.custom}))(List)
