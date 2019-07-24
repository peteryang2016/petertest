import {
  ADD_TODO,
  DELETE_TODO,
  TOGGLE_TODO,
  TOGGLE_ALL,
  visibilityFilter
} from '../../actions'
export default function reducer(state={list:[]},action){//state={test:{},visibilityFilter:visibilityFilter.SHOW_ACTIVE,list:[{text:"todo1",index:"0",completed:false},{text:"todo2",index:"1",completed:true},{text:"todo3",index:"2",completed:false}]}
  switch (action.type) {
    case ADD_TODO:
      return Object.assign({},state,{list:[...state.list,{text:action.text,index:action.index, completed: action.completed}]})
    //return {list:[...state.list,action.text]}
    case DELETE_TODO://state={index:0}
            /*
      * let list = state.list;
      *list.splice(action.index)
      *return {list:[...list]}//为啥[...list]而不直接list?因为我们额状态具有不变性，每次都要返回一个新的对象。
      * */
      return {list:state.list.filter((todo,index)=>index!==action.index)}
    case TOGGLE_TODO:

      /*return Object.assign({},state,{list:state.list.map(todo=>todo.index===action.index?{completed:!todo.completed}:todo)})*/
      /*return {
        list:state.list.map((todo,index)=>{//[{text:'',completed:false}]
          if(todo.index===action.index){
            return Object.assign({},todo,{completed:!todo.completed})
          }
          return todo
        })
      }*/
      return {...state,list:state.list.map((todo,index)=>{//[{text:'',completed:false}]
          if(todo.index===action.index){
            return Object.assign({},todo,{completed:!todo.completed})
          }
          return todo
        })}
    case TOGGLE_ALL:
      //return Object.assign({},{list:[...state.list]},{list:[{completed:action.checked}]})
     return {
       visibilityFilter:visibilityFilter.SHOW_ACTIVE,//**********************修改
        list:state.list.map(todo=>Object.assign({},todo,{completed:action.checked}))
      }
    case 'TEST':
      console.log(action);
      return Object.assign({},state,{test:action.text})
      //{test:action.text,list:[...state.list]}
    /*case SET_VISIBILITY_FILTER:
      console.log(action);
      return Object.assign({},state,{visibilityFilter:action.filter})

*/
    default:
      return state
  }
}

















