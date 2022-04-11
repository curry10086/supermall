import { ADD_COUNTER, ADD_TO_CART } from './mutations-type'
export default{
    addToCart(context, payload) {   
        return new Promise((resolve,reject) => {
            let oldProduct = context.state.cartList.find(
                item => item.iid == payload.iid
            );
            //2、判断oldProduct
            if (oldProduct) { //数量加一
                context.commit(ADD_COUNTER, oldProduct);
                resolve('当前商品数量加一')
            } else {  //添加新的商品
                payload.count = 1;
                // context.state.cartList.push(payload);
                context.commit(ADD_TO_CART, payload);
                resolve('添加新商品')
            }
        })
    }
    
}