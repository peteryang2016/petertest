import {ADD_TODO, TOGGLE_TODO, SET_VISIBILITY_FILTER, visibiletyFilter} from './action';
const {SHOW_ALL}  = visibiletyFilter

const initialState = {
  visibilityFilter: visibiletyFilter.SHOW_ALL,
  todos: [{text:'默认TODO项目',completed:false}]
}

function todoAPP(state=initialState,action) {
  return {
    visibilityFilter:visibilityFilter(state.visibilityFilter,action),
    todos:todos(state.todos,action)
  }
  /*switch (action.type) {
    case SET_VISIBILITY_FILTER :
      return Object.assign({},state,{
        visibilityFilter:action.filter
      })
    case ADD_TODO:
      return Object.assign({},state,{
        todos:[
          ...state.todos,
          {
            text:action.text,
            completed:false
          }
        ]
      })
    case TOGGLE_TODO:
      return Object.assign({},state,{
        todos:state.todos.map((todo,index)=>{
          if(index==action.index){
            completed : !todo.completed
          }
        })
      })
    default:
      return state;

  }*/

}
//修改todo的完成状态、添加todo
function todos(state=[],action){//传递{type:TOGGLE_TODO,index:2}
  switch (action.type) {
    case ADD_TODO:
      return [
        ...state,
        {
          text:action.text,
          completed:false
        }
      ]
    case TOGGLE_TODO:
      return state.map((todo,index)=>{
        if(index===action.index){
              return Object.assign({},todo,{
                completed:!action.completed
              })
            }
            return todo
          })
    default:
      return state;
  }
}
function visibilityFilter(state=SHOW_ALL,action) {
  switch (action.type) {
    case SET_VISIBILITY_FILTER:
      return action.filter;
    default:
      return state

  }
}

export default todoAPP
