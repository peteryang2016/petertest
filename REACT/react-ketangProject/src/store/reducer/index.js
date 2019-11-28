import {combineReducers} from 'redux'
import course from './course.js'
import person from './person.js'
let reducer = combineReducers({
    course,
    person
})
export default reducer
