import * as TYPES from '../action-types'
export default function custom(state={data:[]}, action) {
    //为了防止不直接修改修改原有的状态信息，我们把原有的深度克隆一份，return的结果才是覆盖原有的信息
    state = JSON.parse(JSON.stringify(state))//或者state = {...state}
    switch (action.type) {
        case TYPES.CUSTOM_CREATE:
            let {payload} = action
            state.data.push(payload)
            break;

    }
    console.log(state);
    return state;
}
