function observe(value,cd){
    Object.keys(value).forEach((key)=>defineReactive(value,key,value[key],cd))
}
function defineReactive(obj,key,val,cd){
    Object.defineProperty(obj,key,{
        enumerable:true,
        configurable : true,
        get:()=>{
            return val
        },
        set:(newValue)=>{
            val = newValue
            cd()
        }
    })
}
function _proxy(data){
    let that = this;
    Object.keys(data).forEach(key=>{
        Object.defineProperty(that,key,{
            configurable: true,
            enumerable: true,
            get:()=>{
                return that._data[key]
            },
            set:()=>{
                val=that._data[key]
            }
        })
    })

}
class Vue{
    constructor(options){
        this._data = options.data
        //observe(this._data,options.render)
        _proxy.call(this,options.data)
    }
}
var app = new Vue({
    data:{
        name:'peter',
        age:18
    },
    render(){
        console.log('render')
    }
})
//app._data.name = 'abc'
//app._data.name = 'def'
//console.log(app._data.name)
console.log(app.name)
