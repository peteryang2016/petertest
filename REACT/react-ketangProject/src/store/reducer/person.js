import * as TYPES from '../action-types.js'
export default function person(state={baseInfo:null},action) {
    state = JSON.parse(JSON.stringify(state))
    let payload = {};
    switch (action.type) {
        case TYPES.PERSON_QUERY_BASE:
            payload = action.payload;
            state.baseInfo = parseFloat(payload.code)===0 ? payload.data : null;
            break;
    }
    return state
}
