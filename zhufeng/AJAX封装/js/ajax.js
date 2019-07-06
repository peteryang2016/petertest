(function anonymous(window) {
    function AJAX(options) {
        return new init(options)//return一个实例  {url:url,method:method,.....}
    }
    let init = function init(options={}){
        //init param
        let {
            url,
            method='GET',
            data=null,
            dataType='JSON',
            async=true,
            cache=true,
            success,
            error
        } = options;
        //mount:把配置项挂载实例上
        ['url','method','data','dataType','async','cache','success','error'].forEach(item=>{
            this[item] = eval(item)
        });
        //sendAjax:发送请求
        this.sendAjax()
    }
    AJAX.prototype = {
        constructor:AJAX,
        init,
        sendAjax() {//sendAjax:function(){}
            this.handleData();
            this.handleCache();
            let {method,url,async,success,data} = this
            let xhr = new XMLHttpRequest;
            xhr.open(method,url,async);
            xhr.onreadystatechange = ()=>{


                if(xhr.readyState===4){
                    //error   xhr.status为2或3的时候是不成功
                    if(!/^(2|3)\d{2}$/.test(xhr.status)){
                        error && error(xhr.statusText,xhr)
                        return;
                    }
                    //处理dataType
                    let result = this.handleDataType(xhr);
                    //success
                    success && success(result,xhr)
                }
            }
            xhr.send(data)
        },
        //处理dataType
        handleDataType(xhr){
            let dataType = this.dataType.toUpperCase();
            let result =xhr.responseText;
            switch (dataType) {
                case 'Text':
                    break;
                case 'JSON':
                    result = JSON.parse(result);
                    break;
                case 'XML':
                    result =xhr.responseXML;
                    break;
            }
            return result;
        },
        //处理cache
        handleCache(){
            let {url,method,cache} = this;
            if(method==='GET'&&cache===false){
                url += `${this.check()}_=${+(new Date())}`//url末尾加时间戳
                this.url = url;
            }
        },
        //处理data
        handleData(){
            let {data,method,cache} = this;
            if(!data) return;
            if(typeof data==='object'){
                //如果是个object对象，我们把它转换为x-www-form-urlencoded这种模式，方便后期传递给服务
                let str = ``
                for (let key in data){
                    if(data.hasOwnProperty(key)){
                       str+=`${key}=${data[key]}&`
                    }
                }
                data=str.substring(0,str.length-1);
            }
            //根据请求方式不一样，传递给服务器的方式也不同
            if(/^(GET|DELETE|HEAD|TRACE|OPTIONS)$/i.test(method)){
                this.url +=`${this.check()}${data}`;
                this.data = null;
                return
            }
            this.data = data//POST

        },
        //检测url中是否存在问号
        check(){
           return this.url.indexOf('?')>-1?'&':'?'
        }


    };
    init.prototype = AJAX.prototype;
    window.ajax = AJAX
})(window)