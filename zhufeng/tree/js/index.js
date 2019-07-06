$(function () {
  let $menuBox = $('.menuBox');

  $menuBox.on('click',function (ev) {
    let target = ev.target;
    $target = $(target)
    let tarTag = target.tagName;
    /*
    * 合并事件源：点击的是em，我们让target也等于它弟弟span，此时target只有span我们才处理，统一基于span位置为参照即可。
    * */
    if(tarTag==='EM'){
      $target = $target.next()
      target = $target[0]
      tarTag = target.tagName
    }

    if(tarTag==='SPAN'){
      let $ul = $target.next('ul');//获得$target下一个弟弟
      let $em = $target.prev('em')//获得$target上一个哥哥
      //基于JQ获取的结果一般都是jq对象，即使没有获取到元素也是一个length：0的空对象，而不是null，所以if($ul){....}这样不行
      if($ul.length===0) return;//如果没有下级结构，我们什么都不做处理，有下一级结构在控制显示隐藏即可。

      //em的样式类名：如果是plus（加号），说明当前是折叠的，我们应当让其展开，反之让其折叠起来
      if($em.hasClass('plus')){
        //展开
        $em.addClass('minus').removeClass('plus')
        $ul.stop().slideDown(200);
      }else{
        $em.addClass('plus').removeClass('minus')
        $ul.stop().slideUp(200);
        //点击外层收起，让它的子级也都收起
        setTimeout(function () {
          $ul.find('ul').css('display','none')
          $ul.find('em').removeClass('minus').addClass('plus')
        },200)

      }

    }

  })
});
