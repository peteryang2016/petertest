import * as TYPES from '../action-types'

let custom = {
    create(payload){
        return {
            type:TYPES.CUSTOM_CREATE,
            payload//payload={id,name}
        }
    }
}
export default custom
