import Vue from 'vue'
import Vuex from 'vuex'

import actions from './actions'
import mutations from './mutations'
import getters from './getters'

// 1.安装插件
Vue.use(Vuex)

const state = {
    cartList: []
}
// 创建Store对象
const store = new Vuex.Store({
    state,
    actions,
    mutations,
    getters,
        // mutations唯一的目的就是修改state中的状态
        // mutations中每个方法尽可能完成事件比较单一
        // addCart(state,payload){
        //     console.log(state);
        //     let oldProduct = state.cartList.find(item => item.iid === payload.iid)
        //     if (oldProduct){
        //         oldProduct .count += 1
        //     }else{
        //         payload.count = 1
        //         state.cartList.push(payload)

        //     }
        // }
        // addCounter(state,payload){
        //     payload.count ++
        // },
        // addToCart(state,payload){
        //     state.cartList.push(payload)
        // }
   
    
})
// 导出，挂载到vue实例上面
export default store