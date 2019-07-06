$(function() {
  let $diaLogMark = $('.diaLogMark');
  let $diaLogBox = $('.diaLogBox');
  let $boxTitle = $diaLogBox.find('.title')
  let $closeBtn = $boxTitle.find('i')
  //1.先让diaLogBox在屏幕中间
  let winW = document.documentElement.clientWidth;
  let winH = document.documentElement.clientHeight;
  let boxW = $diaLogBox[0].offsetWidth;
  let boxH = $diaLogBox[0].offsetHeight;

  $diaLogBox.css({
    top:(winH-boxH)/2+'px',
    left:(winW-boxW)/2+'px',
  })
  //2.点击关闭按钮让dialog消失
  $closeBtn.on('click',function () {
    //fadeOut:jq提供的时渐隐动画
    $diaLogBox.stop().fadeOut(200,()=>{
      //这里属于动画完成
      //.stop():结束当前运行的，
      $diaLogMark.css('display','none');
    })
    //也可以写成这样
    /*$diaLogMark.css('display','none');
    $diaLogBox.css('display','none')*/
  })
  //3.实现拖拽效果
  /*
  * 思路：
  * A:鼠标在H3中按下（mouseDown）证明拖拽开始
  * B:鼠标在H3中移动（mouseMove）让盒子也跟着移动
  * C:鼠标在H3中松开（mouseUp）证明拖拽结束，此时我们在H3移动，不做任何处理。
  * */
  //鼠标按下做的事情:记录鼠标的起始位置和盒子的起始位置，在移动的过程中需要使用
  let dragStart = function dragStart(ev) {
    //this:h3
    //方案1：添加自定义属性
    /*$(this).attr({//jq设置自定义属性（属性值最后都是字符串）
      strX:ev.clientX,
      strY:ev.clientY,
      //基于jq中的css获取的样式属性值是带单位的
      strL:parseFloat($diaLogBox.css('left')),
      strT:parseFloat($diaLogBox.css('top'))
    })*/
    //方案2：直接当作普通对象加在私有属性上，好处：在使用的时候let {starX,strY,strL,strT} = this
    //基于普通对象的方式获取设置属性，获取的时候this.xxx获取即可。
    this.starX = ev.clientX;
    this.starY = ev.clientY;
    this.starL = parseFloat($diaLogBox.css('left'));
    this.starT = parseFloat($diaLogBox.css('top'));
    //this.setCapture();//把当前元素this和鼠标邦在一起

    //$boxTitle.on('mousemove',dragMove);//只有按下后才会给move行为绑定方法（在H3中移动鼠标才会让其做一些事情）


    /*$(document).on('mousemove',dragMove);
    $(document).on('mouseup',dragEnd);
    //此时dragMove/dragEnd中的this都是docuent，但是我们在dragMove使用的this希望和dragStart中的this相同，都是h3即可。
    //解决方案A:bind：
    //解决方案B:箭头函数：
    */
    //bind:是预先处理this，call也是改变this执行，是改变this，立即把dragMove执行，不会等mousemove触发
    this.DRAG_MOVE = dragMove.bind(this)
    this.DRAG_END  = dragEnd.bind(this)
    $(document).on('mousemove',this.DRAG_MOVE);
    $(document).on('mouseup',this.DRAG_END);

  }
  //鼠标移动做的事情：让盒子跟随鼠标一起移动（边界移动）
  let dragMove = function dragMove(ev) {
    //随时根据鼠标的当前位置，减去起始的鼠标位置，计算出鼠标的偏移值，用偏移值加上盒子的起始位置，算出盒子的当前位置。
    //this:是h3
    let {starX,starY,starL,starT} = this;

    //做边界判断
    let curL= ev.clientX-starX+starL;
    let curT= ev.clientY-starY+starT;
    let minL = 0,minT = 0,maxL = winW-boxW,maxT = winH-boxH;
    curL = curL<minL?minL:(curL>maxL?maxL:curL);
    curT = curT<minT?minT:(curT>maxT?maxT:curT)
    $diaLogBox.css({
      left:curL,
      top:curT
    })

  }
  //鼠标离开做的事情
  let dragEnd = function dragEnd() {
    //$boxTitle.off('mousemove',dragMove)//手指在h3中抬起，证明结束拖拽，我们把给move绑定的方法移除，这样让鼠标在运动的时候，盒子也不会处理
    $(document).off('mousemove',this.DRAG_MOVE);
    $(document).off('mouseup',this.DRAG_END);
  }
  $boxTitle.mousedown(dragStart);

  //$boxTitle.mouseup(dragEnd);



});
/*
* 拖拽的一个问题：当鼠标操作移动过快，盒子需要计算最新的位置，但计算速度跟不上鼠标的移动，导致鼠标离开了盒子（具体来说离开了H3），而我们的所有方法都是绑定给H3的相关事件行为的，鼠标不在h3上，不管做什么操作都不会和之前绑定的方法有关
* 1.鼠标继续移动，盒子也不懂了，因为并没有触发h3的mouse-move
* 2.鼠标在h3以外松开，没有触发它的mouseUp，也就是没有执行取消mousemove绑定方法的操作，此时H3的mousemove还绑定着呢，这样即使你鼠标松开了，我们鼠标重回到h3上，也会触发它的move，让盒子跟着走。
* 解决问题：
* 1.用一根绳子把h3和鼠标栓在一起，这样鼠标就不会离开h3了,这个不兼容google浏览器
*   this.setCapture()
*   this.releaseCapture()  把绳子解绑
* 2.鼠标移动在快，也不会逃离document，此时我们可以把给document的mousemove绑定方法drgMove（给document的mouseup绑定方法dragEnd），只要是在文档中移动或者抬起鼠标都执行对应的操作即可。
* */
