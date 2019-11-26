function logProperty(){
    return function(target:any,attr:any){
        target[attr] = '修改'
        
    }
}


class HttpClint{
    @logProperty()
    apiURL:string|undefined
    constructor(){
        //this.apiURL = '构造函数'
    }
    getData(){
        console.log(this.apiURL)
    }
}
let http = new HttpClint()
http.getData()