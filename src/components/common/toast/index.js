import Toast from './Toast'

const obj = {}

obj.install = function(Vue){
    // 创建组件构造器
    const toastConstrustor = Vue.extend(Toast)
    // 创建组件对象
    const toast = new toastConstrustor()
    // 将组件对象挂载到某个元素上
    toast.$mount(document.createElement("div"))
    console.log(toast.$el);
    document.body.appendChild(toast.$el)
    
    Vue.prototype.$toast = toast

}

export default obj