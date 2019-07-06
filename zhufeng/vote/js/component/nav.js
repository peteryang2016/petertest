/*
* 导航插件：导入插件后，可以动态向页面中manBox盒子的起始位置创建一个navBox，并且完成相关的业务处理
* 1.进入到登录页面或者注册页面，都会记录fromURL，当登录或者注册成功的时候，跳转回到原有的页面。
* 2.验证是否已经登录，展示不同的信息
* 3.完成其余的业务，列如：退出、点击用户名进入到详情页等
* */
$(function anonymous() {
    let $mainBox = $('.mainBox'),
        $navBox = null,
        $navList = null;

    //检测是否登录
    axios.get('/checkLogin').then((result)=>{

        //控制导航的显示
        let code = parseFloat(result.code);
        $mainBox.prepend(`
            <nav class="navBox">
                <a href="index.html">首页</a>
                ${code===0 ? `<a href="javascript:;">登录</a>
                                <a href="javascript:;">注册</a>`:
                                `<a href="detail.html"></a>
                                <a href="javascript:;">退出</a>`}
            </nav>`)
        $navBox = $mainBox.find('.navBox');
        $navList = $navBox.find('a')
        return code;
    }).then(code=>{
        //如果已经登录：获取登录用户的用户信息
        if(code===0) return;
        return axios.get('/getUser');
    }).then(result=>{
        //未登录传递的时undefined，已登录传递的是用户的信息
        if(typeof result!=='undefined'){
            console.log(result);
            let {data:{name}} = result;
            $navList.eq(1).html(name);
        }
    }).then(()=>{
        //基于时间委托给navBox中的a绑定点击事件
        $navBox.tap(ev=>{
            let target = ev.target,
                tarTag = target.tagName,
                tarINN = target.innerHTML;
            if(tarTag!=='A') return;
            if(tarINN==='登录'){
                window.location.href = `login.html?fromURL=${encodeURIComponent(window.location.href)}`
                return
            }
            if(tarINN==='注册'){
                window.location.href = `register.html?fromURL=${encodeURIComponent(window.location.href)}`
                return
            }
            if(tarINN==='退出'){
                axios.get('exitLogin');
                window.location.href = window.location.href;//页面刷新
                return
            }
        })
    })
});