import React from 'react'
import {connect} from 'react-redux'
import Link from '../components/Link'
import {SET_VISIBILITY_FILTER,} from "../../action";
import {setVisibilityFilter} from "../actions";




//将redux 中state映射到组件中的state
let mapStateToProps=(state,ownProps)=>{
  return{
        active:ownProps.filter===state.visibilityFilter
    }
}
//把展示组件的变化同步到store中
let mapDispatchToProps=(dispatch,ownProps)=>{
    return{
        onClick:()=>dispatch(setVisibilityFilter(ownProps.filter))
    }
}
let FilterLink = connect(mapStateToProps,mapDispatchToProps)(Link)
export default FilterLink
