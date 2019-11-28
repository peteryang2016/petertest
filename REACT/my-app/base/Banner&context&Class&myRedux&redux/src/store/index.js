/*
redux工程化目录
store
    reducer  存放每一个模块的reducer
        vote.js
        personal.js
        .....
        index.js   把每一个模块的reducer最后合并成为一个reducer
    action  存放每一个模块需要进行的派发任务（actionCreator）
        vote.js
        personal.js
        ....
        index.js   所有模块的action进行合并最后合并成一个reducer
    action-types.js 所有派发任务的行为标识都在这里进行宏观（统一）管理
    index.js 创建store




* */
import {createStore} from 'redux'
import reducer from './reducer/index'
let store = createStore(reducer)
export default store
