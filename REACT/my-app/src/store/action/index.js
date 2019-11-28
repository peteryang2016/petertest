/*
* 合并所有的action-creator，类似于reducer合并，为了防止冲突，合并后的对象是以版块名称单独划分管理
* */
import personal from './personal'
import vote from './vote'

let action = {
    vote,
    personal
}

export default action
