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
    selector:'h3',
    dragstart:function () {//拖拽开始
      //console.log(this);//this当前实例drag
      console.log('拖拽开始');
      this.dragTarget.style.backgroundColor = 'orange'
    },
    draging:function () {//拖拽中
      console.log('拖拽中');
      this.dragTarget.style.backgroundColor = 'red'
      let {curL,curT} = this
      let minL = 0,
          minT = 0,
          maxL = winW-boxW,
          maxT = winH-boxH;
      curL = curL<minL?minL:(curL>maxL?maxL:curL)
      curT = curT<minT?minT:(curT>maxT?maxT:curT)
      $(this.ele).css({
        left:curL,
        top:curT
      })

    },
    dragend:function () {//拖拽结束
      console.log('拖拽结束');
      this.dragTarget.style.backgroundColor = 'green'
    }
  })



});
