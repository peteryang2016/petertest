import axios from './index'

//获取轮播图数据
export function queryBanner(){
    return axios.get('/course/banner')
}

//获取列表信息
export function queryList(payload){
    return axios.get('/course/list',{
        params:{
            payload
        }
    })
}

//获取详细信息
export function queryInfo(courseID) {
    return axios.get('/course/info',{
        params:{
            courseID
        }
    })
}

//加入购物车
export function addShopCart(courseID) {
    return axios.post('/store/add',{
        courseID
    })
}
//从购物车移除
export function removeShopCart(courseID) {
    return axios.post('/store/remove',{
        courseID
    })
}
//从服务器获取最新的购物车信息
export function queryShopCart(state=0) {//0:未付款1是已付款
    return axios.get('/store/info',{
        params:{
            state
        }
    })
}
//支付
export function payShopCart(storeID) {
  return axios.post('/store/pay',{
      storeID
  })
}
