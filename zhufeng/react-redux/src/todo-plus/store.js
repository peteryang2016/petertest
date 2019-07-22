import {createStore,combineReducers} from 'redux'

import todo from './store/todo/reducers'
import counter from './store/counter/reducers'


let render = combineReducers({
    todo,
    counter
})


let store = createStore(render)

export default store
