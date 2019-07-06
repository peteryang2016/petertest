var oTab = document.getElementById('tab');
var tabList = oTab.getElementsByTagName('li');
var divList = oTab.getElementsByTagName('div');
function changeTab(curIndex) {
    //curIndex:记录当前点击li的索引
    for (var i = 0; i < tabList.length; i++) {
        tabList[i].className = divList[i].className = ''
    }
    tabList[curIndex].className = 'active'
    divList[curIndex].className = 'active'
}

//es6 let解决办法
/*
* 基于es6中的let来创建变量，是存在块级作用域的（类似于私有作用域）
*作用域：
*   1.全局作用域
*   2.私有作用域（函数执行）
*   3.块级作用域（一般用大口号包起来的都是块级作用域，前提是es6的语法规范）
* */
for (let i = 0; i < tabList.length; i++) {
    tabList[i].onclick = function () {
        changeTab(i)
    }
}

//自定义属性方式解决
/*for (var i = 0; i < tabList.length; i++) {
    tabList[i].myIndex =
    tabList[i].onclick = function () {
        changeTab(this.myIndex)
    }

}*/

/*for (var i = 0; i < tabList.length; i++) {
    tabList[i].onclick = (function (n) {
        var i= n
        //让自执行函数执行，把执行的返回值（return）赋值给onclick（此处onclick绑定是返回的小函数，点击的时候执行的是小函数），自执行函数在给事件赋值的时候就已经执行了
        //自执行函数执行形成一个私有作用域（不释放：返回的函数对应的堆地址被外卖的事件占用了）
        return function () {
            changeTab(i)
        }
    })(i)
}*/
/*
* 总结：循环三次，形成三个不销毁的私有作用域（自执行函数执行），而每一个不销毁的栈内存中斗存储了一个私有变量i，而这个值分别是每一次执行传递进来的全局i的值（也就是：第一个不销毁的作用域存储的时0，第二个是1，第三个2）；当点击的时候，执行返回的小函数，遇到变量i，向它自己的上级作用域查找，找到i值分别是0、1、2达到了我们想要的效果；
* */


/*

for (var i = 0; i < tabList.length; i++) {
    (
        function (n) {
            tabList[n].onclick = function () {
                changeTab(n)
            }
        }
    )(i)
}
*/
