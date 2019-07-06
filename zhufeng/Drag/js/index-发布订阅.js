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

  let drag = new Drag($diaLogBox[0],{
    selector:'h3'
  })
  //后期想干什么，直接往计划表中增加方法即可
  drag.dragstartPlan.add((_this,ev)=>{//_this执行计划表传递给每一个方法的实例
    _this.dragTarget.style.backgroundColor = 'red'
  })

  drag.dragingPlan.add((_this,ev)=>{
    let minT = 0,
        minL = 0,
        maxT = winH - boxH,
        maxL = winW - boxW;
    let {curL,curT} = _this;
    curL = curL<minL?minL:(curL>maxL?maxL:curL)
    curT = curT<minT?minT:(curT>maxT?maxT:curT)
    $(_this.ele).css({
      left:curL,
      top:curT
    })
  })

  drag.dragendPlan.add((_this,ev)=>{
    _this.dragTarget.style.backgroundColor = '#ddd'
  })



});
