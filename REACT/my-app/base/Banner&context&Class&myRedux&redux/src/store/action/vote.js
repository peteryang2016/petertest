/*
* 每个版块单独的action-creator：就是把dispatch派发时候需要传递的action对象进一步封装处理（react-redux中我们会体验到它的好处的）
* */
import * as TYPE from '../action-types'

let vote = {
    support(){
        return {type:TYPE.VOTE_SUPPORT}
    },
    against(){
        return {type:TYPE.VOTE_AGAINST}
    },
    init(initData={}){
        return {type:TYPE.VOTE_INIT,...initData}
    }

}
export default vote

