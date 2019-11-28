import React from 'react'
import ReactDOM from 'react-dom'
import {HashRouter,Switch,Route,Redirect} from 'react-router-dom'

/*redux*/
import {Provider} from 'react-redux'
import store from './store/index.js'

/*antd*/
import {ConfigProvider,Button} from 'antd'
import zhCN from 'antd/es/locale/zh_CN'

import './static/css/reset.min.css'
import './static/css/common.less'
import 'antd/dist/antd.css'

import NavTop from "./component/NavTop";
import NavBottom from "./component/NavBottom";
import Home from './routes/Home'
import Mycourse from './routes/Mycourse'
import Person from './routes/Person'

ReactDOM.render(<Provider store={store}>
    <HashRouter>
        <ConfigProvider locale={zhCN}>
            <div>
                <NavTop/>
                <main className="container">
                    <Switch>
                        <Route path="/course" component={Home}></Route>
                        <Route path="/mycourse" component={Mycourse}></Route>
                        <Route path="/person" component={Person}></Route>
                        <Redirect to="/course"/>{/*除以上的路由外，其他hash都会跳转到首页*/}
                    </Switch>
                </main>
                <NavBottom/>
            </div>
        </ConfigProvider>
    </HashRouter>
</Provider>,document.getElementById("root"))
