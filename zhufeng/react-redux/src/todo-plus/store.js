import {createStore,combineReducers} from 'redux'

import todo from './store/todo/reducers'
import visibilityFilter from './store/todo/visibilityFilter'
import counter from './store/counter/reducers'


let render = combineReducers({
    todo,
    counter,
    visibilityFilter
})


let store = createStore(render)

export default store
