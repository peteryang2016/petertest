let musicRender = (function () {
    let $headerBox = $('.headerBox');
    let $contentBox = $('.contentBox');
    let $footerBox = $('.footerBox');
    let $wrapper = $contentBox.find('.wrapper');
    let $lyricList = null;
    let musicAudio = $('#musicAudio')[0];
    let $playBtn = $headerBox.find('.playBtn');
    let $current = $footerBox.find('.current');
    let $already = $footerBox.find('.already');
    let $duration = $footerBox.find('.duration');



    /*计算content区域的高度*/
    let computedContent = function computedContent() {
        let widH = document.documentElement.clientHeight;
        let font = parseFloat(document.documentElement.style.fontSize);
        $contentBox.css({
            height:widH-$headerBox[0].offsetHeight-$footerBox[0].offsetHeight-.8*font
        })
    }

    /*获取歌词*/
    let queryLyric = function queryLyric() {
        return new Promise(resolve=>{
            $.ajax({
                url:'json/lyric.json',
                method:'get',
                dataType:'json',
                async:true,
                success:resolve,/*成功之后执行resolve*/
            })
        })
    };

    /*绑定歌词数据*/
    let bindHTML = function bindHTML(lyricAry){

        let str = ``;
        lyricAry.forEach(item=>{
            let {minutes,seconds,content} = item
            str+=`<p data-minutes="${minutes}"  data-seconds="${seconds}">${content}</p>`
        })
        $wrapper.html(str);
        $lyricList = $wrapper.find('p');

    };
    //计算时间-秒转换分钟
    let computedTime= function computedTime(time) {
        //time：秒
        let minutes = Math.floor(time/60);//转换成分钟，向下取整
        let seconds = Math.floor(time-minutes*60)//计算剩余的秒数
        minutes<10?minutes = '0'+minutes:null;
        seconds<10?seconds = '0'+seconds:null;
        return `${minutes}:${seconds}`
    };

    //匹配歌词，实现歌词对应
    let translateY = 0;
    let matchLyric = function matchLyric(currentTime){
        //currentTime:已经播放的时间
        let [minutes,seconds] = computedTime(currentTime).split(':');

        //在歌词集合中筛选出我们想要展示的。
        let $cur = $lyricList.filter(`[data-minutes="${minutes}"`).filter(`[data-seconds="${seconds}"`);
        if($cur.length===0) return;
        if($cur.hasClass('active')) return; //当前歌词已经被选中了（列如：这句歌词可能需要五秒才能播放完成，我们定时器监听5次，第一次设置后，后面四次不需要重新设置了）

        let index = $cur.index();
        $cur.addClass('active').siblings().removeClass('active');
        if(index>=4){
            //已经对应超过4条歌词了，接下来每当对应一条都让wrapper向上移一行

            let curH = $cur[0].offsetHeight;
            translateY-=curH;
            $wrapper.css('transform',`translateY(${translateY}px)`)
        }
    }
    let autoTimer = null;
    /*开始播放*/
    let $plan = $.Callbacks();//发布订阅模式
    let playRun = function playRun() {
        musicAudio.play();
        musicAudio.addEventListener('canplay',()=>{
            $playBtn.css('display','block').addClass('move');
            //控制音乐暂停播放
            $playBtn.tap(()=>{
                //让音乐暂停时候，先判断目前是暂停还是播放
                if(musicAudio.paused){//是暂停状态
                    musicAudio.play();
                    $playBtn.addClass('move')
                    return;
                }
                //当前是播放状态我们其暂停
                musicAudio.pause();
                $playBtn.removeClass('move')
            })
            //控制进度条
            let duration = musicAudio.duration;//总时间s
            $duration.html(computedTime(duration));
            //随时监听播放状态
            autoTimer = setInterval( ()=>{
                let currentTime =  musicAudio.currentTime;//当前播放时间
                if(currentTime>=duration){//播放完成
                    clearInterval(autoTimer)
                    $already.html(computedTime(duration))//把总时间赋给播放时间
                    $current.css('width','100%')
                    musicAudio.pause();
                    $playBtn.removeClass('move')
                    return
                }
                //正在播放中
                $already.html(computedTime(currentTime))
                $current.css('width',currentTime/duration*100+'%')
                matchLyric(currentTime)
            },1000)


        })//能够播放了。发布订阅模式
    };
    //控制暂停播放
    $plan.add(()=>{

    });
    //控制进度条
    //let autoTimer = null;
    $plan.add(()=>{


    });

    return{
        init:function () {
            computedContent();
            let promise = queryLyric();
            promise.then(result=>{
                //format-data 格式化数据,去掉歌词中的特殊内容
                let {lyric=''} = result;
                let obj = {32:' ',40:'(',41:')',45:'-'};
                lyric = lyric.replace(/&#(\d+);/g,(...arg)=>{
                    let [item,num] = arg;
                    item = obj[num]||item;
                    return item
                })
                return lyric;//上一个then方法中返回的结果会作为下一个then实参传递过去
            }).then(lyric=>{
                //lyric：是上一次then处理好的结果
                //把歌词对应的分钟、秒、歌词内容等信息依次存储起来
                lyric +='&#10';//向歌词的末尾加结束符
                let lyricAry = [];
                let reg = /\[(\d+)&#58;(\d+)&#46;\d+\]([^&#]+)&#10;/g;
                lyric.replace(reg,(...arg)=>{
                    let [,minutes,seconds,content] = arg;
                    lyricAry.push({
                        minutes:minutes,
                        seconds:seconds,
                        content:content

                    })

                });
                console.log(lyricAry);
                return lyricAry
            }).then(bindHTML).then(playRun)
        }
    }
})()
musicRender.init()