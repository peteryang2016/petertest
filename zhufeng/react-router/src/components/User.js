import React from 'react'
import {HashRouter as Router,Route,Link} from 'react-router-dom'
export default class User extends React.Component{
    render(){
        return(
            <div className="container">
                <div className="row">
                    <div className="col-md-4">
                        <ul>
                            <li><Link to='/user/usera'>User1</Link></li>
                            <li><Link to='/user/userb'>User2</Link></li>
                        </ul>
                    </div>
                    <col-md8>
                        <Router>
                            <Route path="/user/usera" component={Usera} />
                            <Route path="/user/userb" component={Userb} />
                        </Router>
                    </col-md8>
                </div>
            </div>

        )
    }
}

function Usera() {
    return(<h1>User1</h1>)
}
function Userb() {
    return(<h1>User2</h1>)
}
