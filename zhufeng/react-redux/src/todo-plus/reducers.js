import {
  ADD_TODO,
  DELETE_TODO,
  TOGGLE_TODO,
  TOGGLE_ALL,
  SET_VISIBILITY_FILTER,
  visibilityFilter
} from './actions'
import {object} from "prop-types";
export function reducer(state={test:{},visibilityFilter:visibilityFilter.SHOW_ALL,list:[{text:"todo1",completed:false},{text:"todo2",completed:true},{text:"todo3",completed:false}]},action){
  switch (action.type) {
    case ADD_TODO:
      return Object.assign({},state,{list:[...state.list,{text:action.text, completed: false}]})
    //return {list:[...state.list,action.text]}
    case DELETE_TODO://state={index:0}
            /*
      * let list = state.list;
      *list.splice(action.index)
      *return {list:[...list]}//为啥[...list]而不直接list?因为我们额状态具有不变性，每次都要返回一个新的对象。
      * */
      return {list:state.list.filter((todo,index)=>index!==action.index)}
    case TOGGLE_TODO:
      return {
        list:state.list.map((todo,index)=>{//[{text:'',completed:false}]
          if(index===action.index){
            return Object.assign({},todo,{completed:!todo.completed})
          }
          return todo
        })
      }
    case TOGGLE_ALL:
      //return Object.assign({},{list:[...state.list]},{list:[{completed:action.checked}]})
     return {
        list:state.list.map(todo=>Object.assign({},todo,{completed:action.checked}))
      }
    case 'TEST':
      console.log(action);
      return Object.assign({},state,{test:action.text})
      //{test:action.text,list:[...state.list]}
    case SET_VISIBILITY_FILTER:
      console.log(action);
      return Object.assign({},state,{visibilityFilter:action.filter})


    default:
      return state
  }
}

















