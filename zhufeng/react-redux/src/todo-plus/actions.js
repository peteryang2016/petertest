export const INCREASE = 'INCREASE';
export const DESCREASE = 'DESCREASE';

export const ADD_TODO = 'ADD_TODO'
export const DELETE_TODO = 'DELETE_TODO'
export const TOGGLE_TODO = 'TOGGLE_TODO';
export const TOGGLE_ALL = 'TOGGLE_ALL'
export let SET_VISIBILITY_FILTER = 'SET_VISIBILITY_FILTER'
export const visibilityFilter = {
  SHOW_ALL:'SHOW_ALL',
  SHOW_COMPLETED:'SHOW_COMPLETED',
  SHOW_ACTIVE:'SHOW_ACTIVE'

}
export function addTodo(text){
  return {type:ADD_TODO,text}
}
export function deleteTodo(index){
  return {type:DELETE_TODO,index}
}
export function toggleTodo(index){
  return {type:TOGGLE_TODO,index}
}
//全部选中，取消全选复选框
export function toggleAll(checked) {
  return {type:TOGGLE_ALL,checked}
}

//全部、未完成、已完成
export function setVisibilityFilter(filter) {
  return {type:SET_VISIBILITY_FILTER,filter}
}
