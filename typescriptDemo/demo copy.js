"use strict";
//定义一个操作mysql数据库的类   注意：要实现泛型接口，这个类也应该是一个泛型类
var MysqlDB = /** @class */ (function () {
    function MysqlDB() {
    }
    MysqlDB.prototype.add = function (info) {
        throw new Error("Method not implemented.");
    };
    MysqlDB.prototype.update = function (info, id) {
        throw new Error("Method not implemented.");
    };
    MysqlDB.prototype.delete = function (id) {
        throw new Error("Method not implemented.");
    };
    MysqlDB.prototype.get = function (id) {
        throw new Error("Method not implemented.");
    };
    return MysqlDB;
}());
//定义一个操作mssql数据库的类
var MssqlDB = /** @class */ (function () {
    function MssqlDB() {
    }
    MssqlDB.prototype.add = function (info) {
        console.log(info);
        return true;
    };
    MssqlDB.prototype.update = function (info, id) {
        throw new Error("Method not implemented.");
    };
    MssqlDB.prototype.delete = function (id) {
        throw new Error("Method not implemented.");
    };
    MssqlDB.prototype.get = function (id) {
        throw new Error("Method not implemented.");
    };
    return MssqlDB;
}());
//操作用户表，定义一个user类和数据表做映射
var User = /** @class */ (function () {
    function User() {
    }
    return User;
}());
var u = new User();
u.username = 'peter';
u.password = '123456';
var oMysql = new MssqlDB();
oMysql.add(u);
