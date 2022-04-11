import Vue from 'vue'
import App from './App.vue'
import router from './router'
import store from './store'

import  FastClick  from 'fastclick'
import VueLazyload from 'vue-lazyload'


import toast from 'components/common/toast'


Vue.config.productionTip = false
Vue.prototype.$bus = new Vue()

//安装toast插件
//只要执行了Vue.use就执行了import toast from 'components/common/toast' 里面的东西
Vue.use(toast)

// 解决移动端3000ms延迟
FastClick.attach(document.body)

// 使用懒加载插件
Vue.use(VueLazyload)

new Vue({
    render: h => h(App),
    router,
    store
}).$mount('#app')
