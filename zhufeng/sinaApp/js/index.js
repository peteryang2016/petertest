let headerRender = (function () {
    let $headerBox = $('.headerBox');
    let $navMenu = $headerBox.find('.navMenu');
    let $navBox = $('.navBox');

    let handleTap = function handleTap() {
        //$navBox.stop().slideToggle(200);//zepto和jq不完全一样：zp中只实现了部分jq方法
        let block = $navBox.css('display');
        if(block === 'none'){
            $navBox.css('display','block');
            return
        }
        $navBox.css('display','none');

    };

    return{
        init:function init() {
            $navMenu.tap(handleTap)
        }
    }
})();
headerRender.init();

/*banner*/
let bannerRender = (function () {
    let $bannerBox = $('.bannerBox');
    let $wrapper = $bannerBox.find('.swiper-wrapper');

    let queryData = function queryData() {
        return new Promise(resolve =>{
            $.ajax({
                url:'banner.json',
                dataType:'json',
                success:resolve
            })
        })
    };
    let bindHTML = function bindHTML(result){
        let str = ``;
        result.forEach(item=>{
            let {img,desc} = item
            str+=`<div class="swiper-slide">
                <img src="${img}" alt="">
                <p>${desc}</p>
            </div>`;
        });
        $wrapper.html(str)
        $bannerBox.css('display','block');

    }
    let swiperInit = function swiperInit() {
        let swiper = new Swiper('.bannerBox', {
            loop:true,
            autoplay: 2000,//可选选项，自动滑动
            autoplayDisableOnInteraction:false,
            pagination : '.swiper-pagination',
            paginationType:'fraction'
        })
    }

    return{
        init:function init() {
            let promise = queryData();
            promise.then(bindHTML)
                .then(swiperInit)


        }
    }
})()
bannerRender.init();

/*message*/
let messageRender = (function () {
    let $messageBox = $('.messageBox');
    let $wrapper = $messageBox.find('.swiper-wrapper');

    let queryData = function queryData() {
        return new Promise(resolve =>{
            $.ajax({
                url:'aside.json',
                dataType:'json',
                success:resolve
            })
        })
    };
    let bindHTML = function bindHTML(result){
        let str = ``;
        result.forEach(item=>{
            let {title,link} = item
            str+=`<div class="swiper-slide"><a href="${link}">${title}</a></div>`;
        });
        $wrapper.html(str)
        $messageBox.css('display','block');

    }
    let swiperInit = function swiperInit() {
        let swiper = new Swiper('.messageCon', {
            loop:true,
            autoplay: 3000,//可选选项，自动滑动
            direction:'vertical'
        })
    }

    return{
        init:function init() {
            let promise = queryData();
            promise.then(bindHTML)
                .then(swiperInit)


        }
    }
})();
messageRender.init();

/*news*/
let newsRender=(function () {
    let $newsBox = $('.newsBox');
    let loading= false;
    let queryData = function queryData() {
        return new Promise(resolve =>{
            $.ajax({
                url:'news.json',
                dataType:'json',
                success:resolve
            })
        })
    };
    let bindHTML = function bindHTML(result){
        let frg = document.createDocumentFragment();
        result.forEach(item=>{
            let newsGroup = document.createElement('ul');
            newsGroup.className = 'newsGroup';
            newsGroup.setAttribute('data-isLoad',false);
            frg.appendChild(newsGroup);

            //像每一组ul中追加多个li
            let str = ``;
            let newsList= item.news;//item['news']
            newsList.forEach(cur=>{
                if('imgList' in cur){
                    str+=`<li class="latest">
                <a href="${cur.link}">
                    <h3>${cur.title}</h3>
                    <div class="imgBox">
                        ${
                            cur.imgList.map(img=>{
                                return `<p><img data-src="${img}" alt=""></p>`
                            }).join('')
                        }
                        <!--<p><img data-src="img/news.jpg" alt=""></p>
                        <p><img data-src="img/news.jpg" alt=""></p>
                        <p><img data-src="img/news.jpg" alt=""></p>-->
                    </div>
                    <span>${cur.comment}<i class="icon-comment"></i></span>
                </a>
            </li>`;
                    return;
                }
                str+=`<li>
                <a href="${cur.link}">
                    <div><img data-src="${cur.src}" alt=""></div>
                    <h3>${cur.title}</h3>
                    <span>${cur.comment}<i class="icon-comment"></i></span>
                </a>
            </li>`
            })
            newsGroup.innerHTML = str;


        });
        $newsBox[0].appendChild(frg);
        frg = null;//frg 使用完必须销毁
        loading = false
        $newsBox.css('display','block');

    }
    let timeLoad = function timeLoad(result) {
        let $newsGroup = $newsBox.find('.newsGroup[data-isLoad="false"]')
        $newsGroup.each(function () {
            let $this = $(this);
            $this.attr('data-isLoad','true');
            let lazyTime = setTimeout(()=>{
                $this.find('img[data-src]').each(function (index,item) {
                    let tempImg = new Image;
                    tempImg.src = item.getAttribute('data-src');
                    tempImg.onload = function () {
                        item.src = this.src//this就是tempImg
                        item.style.opacity = 1;
                        tempImg = null;
                    }
                })
                clearTimeout(lazyTime)
            },500)
        })
    }

   return {
       init:function () {
           let promise = queryData();
           promise.then(bindHTML).then(timeLoad);

           $(window).on('scroll',function () {
               if(loading) return;
               let winH = document.documentElement.scrollHeight;//总高度
               let curH = document.documentElement.clientHeight+document.documentElement.scrollTop;//视口高度  滚动条卷起来的高度
               if(curH+50>=winH){//+50是距底部还有50的距离的时候
                   //快到底部了，我们加载最新的数据（ajax请求）
                   loading = true
                   let promise = queryData();
                   promise.then(bindHTML).then(timeLoad);
               }
           })
       }
   }
})();
newsRender.init();