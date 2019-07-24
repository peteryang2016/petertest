import {
    SET_VISIBILITY_FILTER,
    visibilityFilter
} from '../../actions'
let {SHOW_ALL,SHOW_COMPLETED,SHOW_ACTIVE} = visibilityFilter
export default function reducer(state=SHOW_ALL,action) {
    switch (action.type) {
        case SET_VISIBILITY_FILTER:
            return action.filter
        default:
            return state;
    }
}
