"use strict";
//把类当作参数的泛型类
// class User{
//     userName:string| undefined;
//     password:string |undefined;
// }
// class ArticleCate{
//     title:string|undefined
//     content:string|undefined;
//     state:number|undefined
// }
// class MysqlDb{
//     add(info:ArticleCate):boolean{
//         console.log(info)
//         return true
//     }
// }
//把用户信息添加到数据库
// let u = new User()
// u.userName = 'peter'
// u.password = '123456'
// let m = new MysqlDb()
// m.add({userName:'peter',password:'123456'})
//把文章添加到数据库
// let a = new ArticleCate()
// a.content='内容';
// a.state=0;;
// a.title='标题';
// let m = new MysqlDb()
// m.add(a)
//使用泛型改造=========
var MysqlDb = /** @class */ (function () {
    function MysqlDb() {
    }
    MysqlDb.prototype.add = function (info) {
        console.log(info);
        return true;
    };
    return MysqlDb;
}());
var User = /** @class */ (function () {
    function User() {
    }
    return User;
}());
var ArticleCate = /** @class */ (function () {
    function ArticleCate(params) {
        this.title = params.title;
        this.content = params.content;
        this.state = params.state;
    }
    return ArticleCate;
}());
//把用户信息添加到数据库
var u = new User();
//增加数据，也可以直接在coustructor中加入
u.userName = 'peter';
u.password = '123456';
var m = new MysqlDb();
m.add(u);
//把文章添加到数据库
var a = new ArticleCate({
    content: '内容',
    state: 0,
    title: '标题'
});
var m1 = new MysqlDb();
m1.add(a);
