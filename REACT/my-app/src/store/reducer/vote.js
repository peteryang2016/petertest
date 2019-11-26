/*
* vote板块的reducer
*   state：原始redux管理的状态信息（设置初始值）
*   action：dispatch派发的时候传递的行为对象（type,.....）
* */
import * as TYPE from '../action-types'
export default function  vote(state={n:0,m:0,title:''},action) {
    switch(action.type){
        case TYPE.VOTE_SUPPORT:
            return {...state,n:state.n+1};
        case TYPE.VOTE_AGAINST:
            return {...state,m:state.m+1}
        case TYPE.VOTE_INIT:
            state = {...state};
            for(const attr in action){
                if(action.hasOwnProperty(attr)){
                    if(action.type==='type') continue;
                    state[attr] = action[attr]
                }
            }
            return state;
        default:
            return state;
    }
}
