/*
* 把每一个模块单独设定的reducer函数合并成总的reducer
*
* 为了保证合并reducer过程中，每个模块管理的状态信息不会相互冲突，redux在合并的时候把容器中的状态进行分开管理（以合并reducer时候设置的属性名作为状态划分的属性名，把各版本管理的状态放到自己的属性下即可）
* */
import {combineReducers} from "redux";
import vote from './vote';
import personal from './personal';
let reducer = combineReducers({
    vote,
    personal
})
export default reducer

