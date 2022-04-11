import * as types from './mutations-type.js'

export default {
    //mutations唯一的目的就是修改state的数据
    //mutations的设计原则：尽可能保持一个方法完成的事件比较单一
    [types.ADD_COUNTER](state, payload) {
        payload.count++

    },
    [types.ADD_TO_CART](state, payload) {
        payload.checked = true
        state.cartList.push(payload)
    }
}