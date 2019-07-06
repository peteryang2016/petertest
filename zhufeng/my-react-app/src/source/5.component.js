import React from 'react';
import ReactDOM from 'react-dom';
function Welcome(props){
    return (
       <h1>hello,{props.name}</h1>
   )
}
let element = <Welcome name="peter" age="8" />
/*
* 组件运行方式
* 1.render发现一个用户自定义组件，如果标签名是以大写字母开头就是用户自定义组件，如果小写字母开头就是DOM组件
* 2.先把jsx的属性封装成一个props对象{name:"peter",age:"8"}
* 3.把它作为参数传递给welcome函数，获取到一个返回值，返回值是一个react元素
* 4.render方法会把此react元素渲染到页面上。
* */
ReactDOM.render(element,document.getElementById('root'))
