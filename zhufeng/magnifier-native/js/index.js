let smallBox = document.querySelector('.smallBox');
let bigBox = document.querySelector('.bigBox');
let bigImg = bigBox.querySelector('img');
let mark = null
//鼠标滑入，创建mark
smallBox.onmouseenter = function () {
  if(!mark){
    mark = document.createElement('div');
    mark.className = 'mark';
    this.appendChild(mark);
    bigBox.style.display = 'block';
  }

};

//鼠标移动：让mark也跟着移动
/*
* 1.smallBox父级参照物是body（如果不是body，我们就需要机遇offset方法获取它距离body的偏移了）
* 2.鼠标处于mark盒子中间的位置（随时计算出mark盒子的top、left即可）
* 3.做边界判断（mark不能移出smallBox）
* */
smallBox.onmousemove = function (ev) {
  if(!mark) return;
  //鼠标在mark盒子中间计算的left、top
  let curL = ev.pageX - smallBox.offsetLeft-mark.offsetWidth/2;
  let curT = ev.pageY - smallBox.offsetTop-mark.offsetHeight/2;
  //计算出来的值不能超过边界
  let minL = 0;
  let minT = 0;
  let maxL = smallBox.offsetWidth-mark.offsetWidth;
  let maxT = smallBox.offsetHeight-mark.offsetHeight;
  curL = curL<minL?minL:(curL>maxL?maxL:curL)
  curT = curT<minT?minT:(curT>maxT?maxT:curT)
  //给mark赋值样式，让其移动到指定的位置
  mark.style.left = `${curL}px`;
  mark.style.top = `${curT}px`;

  //mark移动多少，bigImg像其相反的方向移动三倍，不能使用这个方法，因为smallBox和bigBox的宽度、高度不一样，如果smallBox和bigBox的宽度、高度一样才可以这样写
  /*bigImg.style.top = -curT*3+'px';
  bigImg.style.left = -curL*3+'px';*/

  //mark移动的距离(left)/smallBox的宽度 ==== 大图移动的距离/大图的宽度
  //假如mark移动的距离为10/smallBox的宽度300 ===大图距离n/1050    大图距离n=35   0.03333333*1050
  bigImg.style.top = -curT*3.5+'px';
  bigImg.style.left = -curL*3.5+'px';
};

smallBox.onmouseleave = function () {
  if(mark){
    this.removeChild(mark);//从页面中移除mark，但是此时mark变量还存储这之前的值（页面中移除是dom操作，但是mark是js变量，没啥关系）
    mark = null;//手动赋值为null，代表mark已经不存在了。
    bigBox.style.display = 'none';
  }

}
