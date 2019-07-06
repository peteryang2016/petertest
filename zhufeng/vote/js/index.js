
let matchRender = (function ($) {
    let limit = 10,//每页展示的数量
        page = 1,//当前第几页
        search = '',
        pageNum = 1,//总共有多少页
        total=0,//总条数
        isRun = false;//是否正在加载最新数据
    let $userList = $('.userList'),
        $wrapper = $userList.find('ul'),
        $tip = $userList.find('.tip'),
        $headerBox = $('.headerBox'),
        $searchBtn = $headerBox.find('.searchBtn');

    let $sign = $('.sign')




    //获取数据
    let queryData = function queryData() {
         axios.get(`/getMatchList`,{
            params:{
                limit,
                page,
                search
            }
        }).then((result=>{
             pageNum = parseFloat(result.pageNum);
             total = parseFloat(result.total);
            return result
         })).then(bindHTML)
    };

    //数据绑定
    let bindHTML = function bindHTML(result) {
        let {code,list=[]} = result;
        if (parseFloat(code)!==0){
            //获取数据失败
            $wrapper.css('display','none');
            $tip.css('display','block');
            return
        }
        $wrapper.css('display','block');
        $tip.css('display','none');

        //获取数据成功，
        let $frg = $(document.createDocumentFragment());
        list.forEach((item,index)=>{
            let {id,name,picture,sex,matchId,slogan,voteNum,isVote} = item
            $frg.append(`<li>
                <a href="detail.html?userId=${id}">
                    <img src="${picture}" alt="${name}" class="picture">
                    <p class="title">
                        <span>${name}</span>
                        |
                        <span>编号 #${matchId}</span>
                    </p>
                    <p class="slogan">${slogan}</p>
                </a>
                <div class="vote">
                    <span class="voteNum">${voteNum}</span>
                    ${parseFloat(isVote)===0?`<a href="javascript:;" class="voteBtn">投他一票</a>
                </div>`:``}

            </li>`)
        });
        $wrapper.append($frg)
        $frg = null;
        isRun = false;


    }
    return {
        init:function () {
            //开始展示第一页内容
            queryData()

            //下拉加载更多
            $(window).on('scroll',()=>{
                //卷起来的高度+滚动的的高度大于等于了文档真实的高度
                let {clientHeight,scrollTop,scrollHeight} = document.documentElement;
                if((clientHeight+scrollTop+100)>=scrollHeight){
                    if(isRun) return;//正在加载中
                    if(page>=pageNum) return;//所有数据都加载完成了。
                    isRun = true
                    page++;
                    queryData();
                }
            });

            //点击搜索
            $searchBtn.tap(()=>{
                if(isRun) return;
                isRun = true;

                search = $searchBtn.prev('input').val().trim();
                page = 1;
                $wrapper.html('');//还要把之前ul中的内容清空，然后展示最新搜索的信息即可
                queryData();
            })

            //点击我要参数
            $sign.tap((ev)=>{
                console.log(ev);

            })
        }
    }
})(Zepto);
matchRender.init();