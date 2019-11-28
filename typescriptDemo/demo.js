let a = 5;
let obj = {
    a : 10,
    foo: function(){
        console.log(this.a)
    }
}

let bar = obj.foo
console.log(bar)
obj.foo() 
bar()