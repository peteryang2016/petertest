import {INCREASE,DESCREASE} from "../todo-plus/actions";

export default function reducers(state={num:10},action){
    switch (action.type) {
        case INCREASE:
            return {num:state.num+action.num};
        case DESCREASE:
            return {num:state.num-action.num};
        default:
            return state
    }
}
