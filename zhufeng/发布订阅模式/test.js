/*

订阅就是把要执行的方法放到数组；发布就是把数组的方法执行

* */

/*
* emit：发布
* on：订阅
* */
class Events{
  constructor(){
    this.stack = []
  }

  on(callback){//订阅
    this.stack.push(callback)
  }

  emit(){//发布
    this.stack.forEach(callback=>callback())
  }
}
let events = new Events()
let school = {}
events.on(function () {
  console.log('订阅');
  if(Object.keys(school).length===1){
    console.log(school);
  }
})
let fs = require('fs')
fs.readFile('./name.txt',"utf8",function (error,data) {
  console.log('fs');
  school.name = data
  events.emit()
})

