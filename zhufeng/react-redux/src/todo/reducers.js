import {ADD_TODO,DELETE_TODO} from './actions'
export function reducer(state={list:[]},action){
  switch (action.type) {
    case ADD_TODO:
      return {list:[...state.list,action.text]}
    case DELETE_TODO://state={index:0}

      /*
      * let list = state.list;
      *list.splice(action.index)
      *return {list:[...list]}//为啥[...list]而不直接list?因为我们额状态具有不变性，每次都要返回一个新的对象。
      * */
      return {list:state.list.filter((todo,index)=>index!=action.index)}
    default:
      return state
  }
}
