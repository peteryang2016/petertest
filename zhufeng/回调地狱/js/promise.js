/*
* Promise是ES6新增加的内置类：目的是为例管理异步操作的
* 1.new Promise()创建类的一个实例，每一个实例都可以管理一个异步操作
* 必须传递一个回调函数进去（回调函数中管理你的异步操作），不传递报错。
* 回调函数中有两个参数：
*   resolve：异步操作成功做的事情（代指成功后的事件队列，成功后要做的所有的事情都放到成功这个事件队列中）
*   rejuect：异步操作失败做的事情 (代指失败后的事件队列）
*   new Promise的时候立即把回调函数执行了（promise是同步的）
* 2.基于Promise.prototype.then方法（还有catch方法、finally方法）向成功队列和失败队列中依次加入需要处理的事情
*
* 3.如果多个then调用，不是像我们想象的依次把增加的方法执行
*       异步操作成功或者失败，先把第一个then中的方法执行，每执行一个then会返回一个新的promise实例，这个实例管控的是第一个then中方法执行的成功还是失败
*/
/*
let promise1 = new Promise((resolve,reject)=>{
    $.ajax({
        url:'json/a.json',
        success:(result)=>{//success(result){
            resolve(result);
        },
        error:(msg)=>{
            reject(msg)
        }
    })
})

promise1.then(
    result=>{
        console.log(result);
    },
    msg=>{
        console.log('no');
    }
).catch(msg=>{
    console.dir(msg)
})
*/

let fn = function () {
    return new Promise(resolve=>{
        console.log('promise');
        setTimeout(function () {
            resolve('promise执行')
        },1000)
    })
}
let promise = fn();
promise.then((result)=>{
    console.log(result);
})
console.log('window');