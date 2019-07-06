;(function anonymous(window) {
    //设置默认的参数配置项
    let _default = {
        method:'GET',
        url:'',
        baseURL:'',
        headers:{},
        dataType:'JSON',
        data:null,//post系列请求基于请求主体传递给服务器的内容
        params:null,//GET系列请求基于问号传递给服务器的内容
        cache:true
    };

    //基于promise设计模式管理ajax请求
    let ajaxPromise = function ajaxPromise(options) {
        //options中融合了：默认配置信息、用户基于defaults修改的信息、用户执行GET/post方法时候传递的配置信息，月靠后的优先级越高
        let {url,baseURL,method,data,dataType,headers,cache, params} = options;

        if(/^(GET|DELETE|HEAD|OPTIONS)$/i.test(method)){
            //GET系列
            if(params){
                url+=`${ajaxPromise.check(url)}${ajaxPromise.formatData(params)}`
            }
            if(cache===false){
                url+=`${ajaxPromise.check(url)}_=${+(new Date())}`
            }
            data = null;//GET系列，请求主体就是什么都不放，放在url后面传参
        }else{
            //POST系列
            if(data){
                data = ajaxPromise.formatData(data)
            }
        }
        //基于promise发送ajax
        return new Promise((resolve,reject)=>{
            let xhr = new XMLHttpRequest;
            xhr.open(method,`${baseURL}${url}`);
            //如果headers存在，我们需要设置请求头
            if(headers!==null&&typeof headers==='object'){
                for (let attr in headers) {
                    if(headers.hasOwnProperty(attr)){
                        let val = headers[attr];
                        if(/[\u4e00-\u9fa5]/.test(val)){//val中包含中文，进行编码
//encodeURIComponent()//给中文进行编码
                            //decodeURIComponent()//编码进行解码
                            val = encodeURIComponent(val);
                        }
                        xhr.setRequestHeader(attr,val)
                    }
                }
            }
            xhr.onreadystatechange = ()=>{
                if(xhr.readyState===4){
                    if(/^(2|3)\d{2}$/.test(xhr.status)){//2或3开头的代表成功
                        dataType = dataType.toUpperCase();
                        let result = xhr.responseText;
                        dataType==='JSON'?result = JSON.stringify(result):(dataType=='XML'?result = xhr.responseXML:null)
                        resolve(result,xhr);
                        return;
                    }
                    reject(xhr.statusText,xhr)
                }

            }
            xhr.send(data);
        })
    }
    //这么做的目的：把默认配置暴露出去，后期用户在使用的时候可以自己设置一些基础的默认值（发送ajax请求的时候按照配置的信息进行处理）
    ajaxPromise.defaults = _default;

    //把对象转为urlencoded格式的字符串
    ajaxPromise.formatData = function formatData(obj){
        let str=``;
        for(let attr in obj){
            if(obj.hasOwnProperty(attr)){
                str+=`${attr}=${obj[attr]}&`
            }
        }
        return str.substring(0,str.length-1)
    };
    ajaxPromise.check = function check(url){
        return url.indexOf('?')> -1 ? '&' : '?';
    };

    //GET
    ['get', 'delete', 'head', 'options'].forEach(item => {
        ajaxPromise[item] = function anonymous(url, options = {}) {
            options = {
                ..._default,//默认值或者基于defaults修改的值
                ...options,//用户调取方法传递的配置项
                url:url,//请求的url地址（第一个参数：默认配置项和传递的配置项都不会出现url，只能这样获取）
                method:item.toUpperCase()//医患执行肯定是ajaxPromise.head执行，不会设置methods这个配置项，我们自己需要配置才可以
            };
            return ajaxPromise(options);
        };
    });

    //POST
    ['post','put','patch'].forEach(item=>{
        ajaxPromise[item] = function anonymous(url,data={},options={}) {
            options = {
                ..._default,//默认值或者基于defaults修改的值
                ...options,//用户调取方法传递的配置项
                url:url,//请求的url地址（第一个参数：默认配置项和传递的配置项都不会出现url，只能这样获取）
                method:item.toUpperCase(),//医患执行肯定是ajaxPromise.head执行，不会设置methods这个配置项，我们自己需要配置才可以
                data:data
            };
            return ajaxPromise(options);
        };
    });

    window.ajaxPromise = ajaxPromise
})(window);