import * as TYPES from '../action-types.js'
let INIT_STATE = {
    bannerData:[],
    courseData:{
        total:1,
        limit:10,
        page:1,
        data:[]
    },
    courseType:'all',
    shopCart:{
        unPay:[],
        pay:[]
    },
    selectAll:true//存储的时全选还是全不选
}
export default function course(state=INIT_STATE,action) {
    state = JSON.parse(JSON.stringify(state))
    switch (action.type) {
        //获取轮播图数据
        case TYPES.COURSE_QUERY_BANNER:
            let {code,data} = action.payload
            if(parseFloat(code)===0){
                state.bannerData = data
            }else{
                state.bannerData = [];
            }
            break;
            //获取课程列表信息
        case TYPES.COURSE_QUERY_LIST:
            let {result,flag,courseType} = action;
            state.courseType = courseType;
            if(parseFloat(result.code)===0){
                state.courseData.total = parseFloat(result.total);
                state.courseData.limit = parseFloat(result.limit);
                state.courseData.page = parseFloat(result.page);
                if(flag==='push'){//push追加
                    state.courseData.data.push(...result.data)
                    //或者用concat()拼接
                    //state.courseData.data = state.courseData.data.concat(result.data)
                }else{//replace替换
                    state.courseData.data = result.data
                }

            }
            break;
            //获取购物车信息(已支付、未支付)
        case TYPES.COURSE_UNPAY:
            if(parseFloat(action.result.code)===0){
                state.shopCart.unPay =action.result.data
                //给每一条数据加一个选中的属性
                state.shopCart.unPay = state.shopCart.unPay.map(item=>{
                    return {...item,check:true}
                })
                state.selectAll = true;
            }
            break;
        case TYPES.COURSE_PAY:
            if(parseFloat(action.result.code)===0){
                state.shopCart.pay =action.result.data
            }
            break;
            //操作全选等
        case TYPES.COURSE_HANDLE:
            let mode = action.mode
            if(mode==='all'){
                state.selectAll = !state.selectAll;
                state.shopCart.unPay=state.shopCart.unPay.map(item=>{
                    return {...item,check:state.selectAll}
                })
            }else{//传递的时id
                let item = state.shopCart.unPay.find(item=>{
                    return parseFloat(item.id)===mode
                });
                item.check = !item.check;
                //注意：验证是否所有的课程都是选中的，如果是全部选中的，全选也要选中
                let f = state.shopCart.unPay.find(item=>{
                    return item.check===false
                });
                f?state.selectAll = false:state.selectAll = true;

            }
            break;
    }
    return state
}
/*
* limit、page、total每一次从服务器获取信息后都要更新
* 1.第一次获取数据或者点击加载更多获取其他页的数据，都是把最新获取的这几条数据追加到courseData.data中，limit、page、total可以更换
* 2.点击筛选的时候，应该是把获取的数据信息，替换courseData.data
*
* dispatch派发的时候，还需要传递一个表示：flag=push、replace，代表是追加还是替换根据标识我们完成对应的操作。
*
*3.在redux容器中还需要记录一个信息，当前课程类型all、react、vue。。。由此更新标题的信息
* */
