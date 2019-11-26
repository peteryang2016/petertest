import React from 'react';
import ReactDOM from 'react-dom';
import{Provider} from 'react-redux'
import './static/css/reset.min.css'
import 'bootstrap/dist/css/bootstrap.css'
import VoteRedux from './component/voteRedux/Vote'
import store from './store/index'
ReactDOM.render(

    <Provider store={store}>
        <VoteRedux/>
    </Provider>, document.getElementById('root'));



