let productRender = (function () {
    let productData = null;
    //let productBox = document.getElementById("productBox");
    let productBox = document.querySelector(".productBox");
    //let headerBox = document.getElementById("headerBox");
    let headerBox = document.querySelector(".headerBox");
    //let linkList = headerBox.getElementsByTagName("a");
    let linkList = headerBox.querySelectorAll("a");
    //let productList = productBox.getElementsByTagName("li");
    let productList = null;

    let getData = function () {
        let xhr = new XMLHttpRequest;
        xhr.open("GET",'json/product.json',false);
        xhr.onreadystatechange = function () {
            if(xhr.readyState === 4 && xhr.status === 200){
                productData = JSON.parse(xhr.responseText);

            }
        }
        xhr.send(null)
    }
    //完成数据绑定
    let bindHTML = function () {
        let str = ``;
        productData.forEach((item,index)=>{
            let {title,price,hot,time,img} = item;
            str+=`<li data-time="${time}" data-hot="${hot}" data-price="${price}">
                <a href="javascript:;">
                    <img src="${img}" alt="">
                    <p>${title}</p>
                    <span>${price}</span>
                    <span>时间:${time}</span>
                    <span>热度:${hot}</span>
                </a>
            </li>`
        });
        productBox.innerHTML = str;
        productList = productBox.querySelectorAll('li')
        console.log(productList);
    }

    //给三个排序标签绑定点击事件
    let bindClick = function () {
        //把类数组转换为数组
        [].forEach.call(linkList,(curLink,index)=>{
            //循环三次，执行三次这个方法，每一次执行都会形成一个闭包，每一个闭包中保存了当前这个a对应的索引index
            curLink.flag = -1;
            curLink.onclick=function () {
                this.flag*=-1;
                //1.给productList进行排序（依据点击列的不同排序）
                //点击的需要获取每一个li的价格/热度等信息，此时我们可以在绑定的时候，把这些信息存储到自定义属性上，点击的时候根据自定义属性获取即可。
                //A:根据点击li的索引获取按照谁来排序
                let ary= ['data-time','data-price','data-hot'];
                let productListAry = [...productList];
                productListAry.sort((a,b)=>{
                    let aInn=a.getAttribute(ary[index]);
                    let bInn=b.getAttribute(ary[index]);
                    if(index===0){//对于日期来说，我们需要去除字符之间的中杠，才能实现数学相减。
                        aInn = a.getAttribute(ary[index]).replace(/-/g,'')
                        bInn = b.getAttribute(ary[index]).replace(/-/g,'')
                    }
                    return (aInn - bInn)*this.flag;

                });
                //2.按照最新顺序依次添加到容器中
                let frg = document.createDocumentFragment()
                productListAry.forEach((curLi)=>{
                    //productBox.appendChild(curLi);

                    //基于文档碎片减少dom回流
                    frg.appendChild(curLi);
                })
                productBox.appendChild(frg);
                frg = null;
            }
        })
    }
    return {
        init:function () {
            getData();
            bindHTML();
            bindClick();
        }
    }
})();
productRender.init();