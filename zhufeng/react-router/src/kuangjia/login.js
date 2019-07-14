import React from 'react'
import {Redirect,Link} from 'react-router-dom'

export default function(props){
        function changeClick() {
          localStorage.setItem("login","true")
          props.history.push(props.location.state.from)//路由跳转

        }
        return (
              <button onClick={changeClick}>登录</button>
        )
}
