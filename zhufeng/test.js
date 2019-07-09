class Person{
    constructor(){
        this.name='peter';
        this.age=19;
        this.sayName()
    }

    sayName(){
        console.log(this.name)
    }
    sayAge(){
        console.log(this.age)
    }
}
let person = new Person();
person.sayAge()


