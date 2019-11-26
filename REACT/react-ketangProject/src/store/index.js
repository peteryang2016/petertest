import {createStore,applyMiddleware} from "redux";
import reduxLooger from 'redux-logger'
import reduxThunk from 'redux-thunk'
import reduxPromise from 'redux-promise'
import reducer from './reducer/index.js'
let store = createStore(reducer,applyMiddleware(reduxLooger,reduxThunk,reduxPromise));
export default store;
