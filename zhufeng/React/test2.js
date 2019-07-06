class Point{
    constructor(){
        this.x = 'x';
        this.y = 'y';
    }
}
class ColorPoint extends Point{
    constructor(x,y,color){
        super(x,y);//在这里表示父类的构造函数，用来新建父类的this对象。
        this.color = this.y;
    }

    toString(){
        return this
    }
}
p1 = new ColorPoint();
console.log(p1.toString());
