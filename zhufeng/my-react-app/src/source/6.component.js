import React from 'react';
import ReactDOM from 'react-dom';
function formatDate(date) {
    return date.toString()
}
function Avatar(props) {
    return(
        <img className="Avatar"
             src={props.user.avatarUrl}
             alt={props.user.name}
        />
    )
}
function UserInfo(props) {
    return(
        <div className="UserInfo">
            <Avatar user={props.user}/>

            <div className="UserInfo-name">
                {props.user.name}
            </div>
        </div>
    )
}
function Comment(props) {
    return (
        <div className="Comment">
            <UserInfo user={props.author}/>
            <div className="Comment-text">
                {props.text}
            </div>
            <div className="Comment-date">
                {formatDate(props.date)}
            </div>
        </div>
    );
}
let data = {
    author:{
        avatarUrl:'http://www.baidu.com/img/bd_logo1.png',
        name:'peter'
    },
    text:'评论内容',
    date:new Date()
}
ReactDOM.render(<Comment  {...data} />,document.getElementById('root'))
