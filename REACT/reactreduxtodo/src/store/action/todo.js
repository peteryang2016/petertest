import * as TYPES from '../action-types'

let todo = {
    add(payload){
        return {type:TYPES.TODO_ADD,payload}
    },
    //更新筛选的类别：text（）
    filter(text){
        return {type:TYPES.TODO_FILTER,text}
    },
    //更新指定任务的状态信息
    updataState(taskId,newState){
        return {
            type:TYPES.TODO_UPDATE_STATE,
            taskId,
            newState
        }
    },
    remove(taskId){
        return {
            type:TYPES.TODO_DELETE,
            taskId
        }
    }
}
export default todo
