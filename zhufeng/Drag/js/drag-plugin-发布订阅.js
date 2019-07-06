~function(){//自执行函数
  if(typeof $==='undefined'){//判断jQuery是否有值
    throw new ReferenceError('Sorry,no jQuery!')
  }
  class Drag{//构造函数
    constructor(ele,options={}){
      if(typeof ele==='undefined' || ele.nodeType!=1){
        throw new ReferenceError('ele、object')
      }
      //空函数，我们可以把它赋值给所有回调函数默认值，也就是回调函数不传，执行的就是这个空函数
      let enmptyFn = function(){

      }
      //init parameters
      let {selector = ele} = options;

      /*
      * dragTarget:通过谁来移动
      * ele：移动谁
      * */
      this.ele =ele;
      this.dragTarget = selector;
      if(typeof selector==='string'){//传递一个选择器进来了，我们是想通过操作ele中某个元素让ele实现移动
        this.dragTarget = $(ele).find(selector)[0]
      }
      //给当前实例挂载三个属性：三个属性就是三个计划表
      this.dragstartPlan = $.Callbacks();
      this.dragingPlan = $.Callbacks();
      this.dragendPlan = $.Callbacks();

      //dragStart:保证执行原型上的方法，方法中的this都是当前类的实例。
      this.dragTarget.addEventListener('mousedown',this.down.bind(this))



    }
    //mousedown
    down(ev){
      console.log(this);
      this.starX = ev.clientX;
      this.starY = ev.clientY;

      let $ele = $(this.ele);
      this.starL = parseFloat($ele.css('left'));
      this.starT = parseFloat($ele.css('top'));

      this.MOVE = this.move.bind(this);
      this.UP = this.up.bind(this)
      document.addEventListener('mousemove',this.MOVE)
      document.addEventListener('mouseup',this.UP);

      this.dragstartPlan.fire(this,ev)//通知某一个计划表中的方法执行，this:把当前类的实例传递给计划表中每一个方法



    }
    mousemove
    move(ev){
      let {starX,starY,starL,starT} = this;
      let curL = ev.clientX-starX+starL;
      let curT = ev.clientY-starY+starT;
      $(this.ele).css({
        left:curL,
        top:curT
      })
      this.curL = curL;
      this.curT = curT;
      this.dragingPlan.fire(this,ev)
    }
    //mouseup
    up(ev){
      document.removeEventListener('mousemove',this.MOVE)
      document.removeEventListener('mouseup',this.UP)
      this.dragendPlan.fire(this,ev)
    }

  }
  window.Drag = Drag;
}(jQuery)
/*
* ele：当前要实现的拖拽元素
* */
/*new Drag(ele,{
  selector:'h3' //selector:当前需要操作的目标元素选择器（按住它实现让ele移动，不传默认就是按住ele移动）
})*/
