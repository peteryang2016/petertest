import * as TYPES from '../action-types'
export default function todo(state={
    data:[],
    flag:'all'
},action) {
    //为了防止不直接修改修改原有的状态信息，我们把原有的深度克隆一份，return的结果才是覆盖原有的信息
    state = JSON.parse(JSON.stringify(state))//或者state = {...state}
    switch (action.type) {
        //增加任务信息：payload传递进来需要增加的任务信息
        case TYPES.TODO_ADD:
            let {payload} = action;
            //给每一条增加id，如果data中没有数据那么id为1，否则找到最后一条的id在加1
            payload.id = state.data.length===0?1:(parseFloat(state.data[state.data.length-1]['id'])+1);
            //state = {...state,data:[...state.data,payload]}
            state.data.push(payload)
            break;
            //更新筛选方式
        case TYPES.TODO_FILTER:
            //state = {...state,flag:action.text};
            state.flag = action.text;
            break;
            //修改任务状态
        case TYPES.TODO_UPDATE_STATE:
            let  {taskId,newState} = action;
            let item = state.data.find((item,index)=>item.id===taskId)
            if(item){
                item.state = newState;
            }
            console.log(item);
            break;
        case TYPES.TODO_DELETE:
            state.data = state.data.filter(item=>{
                return item.id!=action.taskId
            })

            break;
    }
    console.log(state);
    return state;
}
