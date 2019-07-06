//操作谁就获取谁
let $hours = document.getElementById("hours")
let $minutes = document.getElementById("minutes")
setInterval(function () {
    //每隔1秒执行一次
    let date = new Date();//得到当前事件
    let hours = date.getHours();//得到当前的小时
    let minutes = date.getMinutes()//得到秒数
    set($hours,hours*30);
    set($minutes,minutes*6)
},1000)
function set(ele,deg) {
    ele.style.tranform = `rotate(${deg}deg)`;
}
