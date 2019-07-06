let listBox = document.getElementById("list");
let headerBox = document.getElementById("header");
let linkList = headerBox.getElementsByTagName("a");
let productList = listBox.getElementsByTagName("li");

~function(){
   let productData = null;
   let xhr=new XMLHttpRequest;
    xhr.open("GET",'json/product.json',false);
    xhr.onreadystatechange = ()=>{
        xhr.readyState===4&&xhr.status===200?productData=xhr.responseText:null;
        productData ? productData = JSON.parse(productData) : null;
    }
    xhr.send(null);

    var str = ``
    for(var i=0;i<productData.length;i++){
        let {id,title,price,time,hot,img} = productData[i];
        str+=`<li class="item" data-price="${price}" data-time="${time}" data-hot="${hot}">
            <a href="javascript:;">
                <img src="${img}" alt="">
                <p>${title}</p>
                <span>${price}</span>
            </a>
        </li>`
    }
    listBox.innerHTML = str;
}()

~function(){
    let sortList = function(){
        //this 指向了我点击的那个a标签,通过call修改的this指向

        //按照价格升序排列
        //1.基于getElementsByTagName获取的元素集合是类数组不能直接使用数组中的sort方法，
        let productAry = [].slice.call(productList);//类数组转换为数组，方法1
        //let productAry = [...productList];//类数组转换为数组，方法2
        //2.基于sort给所有的li按照价格进行排序
        productAry.sort((a,b)=>{
            //如果这里用箭头函数this指向的是上下文，运行环境是sortList，即我点击的a标签
            //如果这里用普通函数this指向的时window
            //a:当前项，b：下一项
            //如果当前项 "-" 下一项大于0,a和b交互位置，否则小于等于0什么都不做。
            //a是当前li，b是下一个li，我们应该获取出每个li的价格，让价格相减从而实现排序（数据绑的的时候，我们可以把后面需要用的价格、日期、销量等信息存储到li的自定义属性上，在dom结构中显示，后期需要用的这个值得时候，我们基于自定义属性获取到即可）
            let aInn,
                bInn;
            //写法1
            /*switch(this.index){
                case 0:
                    aInn = a.getAttribute('data-time').replace(/-/g,'');
                    bInn = b.getAttribute('data-time').replace(/-/g,'');
                    break;
                case 1:
                    aInn = a.getAttribute('data-price');
                    bInn = b.getAttribute('data-price');
                    break;
                case 2:
                    aInn = a.getAttribute('data-hot');
                    bInn = b.getAttribute('data-hot');
                    break;
            }*/
            //写法2
            let ary = ['data-time','data-price','data-hot'];
            aInn = a.getAttribute(ary[this.index])
            bInn = b.getAttribute(ary[this.index])
            if(this.index===0){
                aInn = a.getAttribute(ary[this.index]).replace(/-/g,'');
                bInn = b.getAttribute(ary[this.index]).replace(/-/g,'');
            }
            return (aInn - bInn) * this.flag;

        })

        //3.按照排行顺序的数组，我们把li重新增加到页面中。
        for (let i=0;i<productAry.length;i++){
            let curLi = productAry[i];
            listBox.appendChild(curLi);//像listBox中追加li，DOM的映射机制
            //DOM的映射机制：页面中的html元素，和js中通过相关方法获取到的元素集合或者元素对象存在映射关系（一个改另外一个会跟着自动修改）
        }



    }
    for (let i = 0; i <linkList.length ; i++) {
        let curLink = linkList[i];
        curLink.index = i;
        curLink.flag = -1;//给li加一个flag
        curLink.onclick = function(){
            //点击当前的a标签，我们需要让其余的a标签flag回归原始值（-1），这样下一次在点击某一个a标签，还是从-1开始乘，变为1，也就是从升序开始。
            for (let j = 0; j < linkList.length; j++) {
                let item = linkList[j];
                if(item!=this){
                    item.flag = -1;
                }
                
            }


            //this 指向的时我点击的a标签元素<a href="javascript:0">价格</a>
            this.flag*=-1;//-1*-1=1;1*-1=-1;第一次点击可以让flag的值从1~-1来回切换（第一次点击变为1，第二次点击变为-1）
            //sortList();
            sortList.call(this)//让sortList函数体中的this指向我点击的a标签。  <a href="javascript:0">价格</a>
        }
    }
    /*linkList[1].flag = -1;//给li加一个flag
    linkList[1].onclick = function(){
        //this 指向的时我点击的a标签元素<a href="javascript:0">价格</a>
        this.flag*=-1;//-1*-1=1;1*-1=-1;第一次点击可以让flag的值从1~-1来回切换（第一次点击变为1，第二次点击变为-1）
        //sortList();
        sortList.call(this)//让sortList函数体中的this指向我点击的a标签。  <a href="javascript:0">价格</a>
    }*/
}()