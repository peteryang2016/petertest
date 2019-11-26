//es6 class创建类
class Parent{
    constructor(x,y){
        this.x = x;
        this.y = y;
    }
    //给Parent原型上添加方法（Parent.prototype添加方法）
    render(){//调用方式：this.render()

    }

    //给Parent设置私有方法
    static ajax(){//调用方式：Parent.ajax() 给Parent当做一个普通对象，设置的私有属性方法，和实例没关系

    }
}

Parent.prototype.AA = 12;//es6创建类的大括号中只能写方法（而且不能是箭头函数），不能设置属性，属性需要自己额外拿出来设置。
//new Parent(10,20)

//给Parent设置私有属性
Parent.BB = 12//把它作为对象设置的私有属性也只能拿到外面设置。


//es6继承
class Children extends Parent{
    constructor(){
        //私有属性继承
        super(10,20)//把Parent.constructor执行;Parent.constructor.call(this,10,20)   这个this是Children实例，将Parent.constructor中的this就指向了new Children()这个实例了,相当于这里也有了this.x=10;this.y=20。
        //this.x=10
        //this.y=20
        //this.ajax();//this.ajax is not a function 子类只能继承父类原型上的属性和方法和父类实例的私有属性和方法，对于父类作为普通对象设置的私有属性和方法是无法继承的。
    }
}

console.log(new Children());
/*
* {
*   x:10,
*   y:20
*   __proto__:Children.prototype
*       render
*       __proto__:Parent.prototype
*           render
*           AA:12
*           ___proto__:Object.prototype
* }
* */
