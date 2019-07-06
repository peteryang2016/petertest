/*
* 1.鼠标进入和离开smallBox，控制mark以及bigBox的显示隐藏
* 2.控制mark在smallBox中运行，但是不能超过边界
* 3.当mark在smallBox中移动的时候，根据mark移动的距离，计算出bigImg在bigBox中移动距离（反向3倍）
*
* */
$(function () {
    var $magnifierBox = $('.magnifierBox');
    var $smallBox = $magnifierBox.find('.smallBox');
    var $mark = $smallBox.find('.mark');
    var $bigBox = $magnifierBox.find('.bigBox');
    var $bigImg = $bigBox.find('img')

    //控制mark、bigBox显示隐藏
    $smallBox.on('mouseenter',function (ev) {
        $mark.css('display','block');
        $bigBox.css('display','block')
        computedMark(ev);
    }).on('mouseleave',function () {
        $mark.css('display','none');
        $bigBox.css('display','none');
    }).on('mousemove',function (ev) {//jquery中的ev已经是兼容所有浏览器了
        computedMark(ev);//鼠标在盒子中移动，随时移动盒子位置

    })
    //鼠标在smllBox中移动的时候控制mark跟着移动
    function computedMark(ev) {
        var offsetObj = $smallBox.offset();
        //求markLeft所在的位置
        var curL = ev.pageX-offsetObj.left-$mark.outerWidth()/2;
        var curT = ev.pageY-offsetObj.top-$mark.outerHeight()/2;
        //边界判断
        var minL = 0;//最小Left值
        var minT = 0;//最小Top值
        var maxL = $smallBox.outerWidth()-$mark.outerWidth();//最大Left的值
        var maxT = $smallBox.outerHeight()-$mark.outerHeight();//最大Top值的值
        curL = curL<minL?minL:(curL>maxL?maxL:curL);
        curT = curT<minT?minT:(curT>maxT?maxT:curT)
        $mark.css({top:curT+'px',left:curL+'px'})
        //mark动，则右侧大图朝反向运动（横竖都是3倍）
        $bigImg.css({top:-curT*3+'px',left:-curL*3+'px'})
    }
})












































