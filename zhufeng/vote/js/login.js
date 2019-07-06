let loginRender = (function ($) {
    let $userName = $('#userName'),
        $userPass = $('#userPass'),
        $submit = $('#submit');


    //处理fromURL
    let fromURL = utils.queryURLParams()['fromURL'];
    fromURL?fromURL=decodeURIComponent(fromURL):fromURL='index.html';

    let submitFn = function submitFn() {
        //验证输入格式是否符合要求，如果不符合要求，没必要发请求（暂没写）
        axios.post('/login',{
           name:$userName.val().trim(),
           password: hex_md5($userPass.val().trim())
        }).then(result=>{
            let code = parseFloat(result.code);
            if(code===0){//登录成功
                window.location.href = fromURL;
                return
            }
            alert('失败')
        })
    }

    return{
        init:function () {
            $submit.tap(submitFn)
        }
    }
})(Zepto);
loginRender.init()