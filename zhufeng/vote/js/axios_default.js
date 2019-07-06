if(typeof axios!=='undefined'){
    axios.defaults.baseURL='http://localhost:8999';

    //允许跨域
    axios.defaults.withCredentials = true;

    //允许在向服务器发送前，修改请求数据,将data修改为urlencode格式
    axios.defaults.transformRequest = data=>{
        let str = ``
        if(data && typeof data==='object'){
            for (let attr in data) {
                if(data.hasOwnProperty(attr)){
                    str+= `?${attr}=${data[attr]}&`
                }
            }
            return str.substring(0,str.length-1)
        }

    }
    //设置请求头
    axios.defaults.headers['Content-Type'] = 'x-www-form-urlencoded';
    //拦截且，在我们响应成功之前，返回响应主体内容data
    axios.interceptors.response.use(result=>result.data);

}