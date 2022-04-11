import {request} from './request'
export function getDetail(iid){
    return request({
        url:'/api/hy66/detail',
        params:{
            iid
        }

    })
}


//下面是创建一些数据模型类用于接收请求到的数据，对于我们所需要的数据更加方便提取

//商品基本信息数据
export class Goods {//因为服务器返回的数据太乱了不好找，我们通过该类接收我们需要的数据
    constructor(itemInfo, columns, services) {
        this.title = itemInfo.title
        this.desc = itemInfo.desc
        this.newPrice = itemInfo.price
        this.oldPrice = itemInfo.oldPrice
        this.discount = itemInfo.discountDesc
        this.columns = columns
        this.services = services
        this.realPrice = itemInfo.lowNowPrice
    }
}

//店铺信息数据
export class Shop {
    constructor(shopInfo) {
        this.logo = shopInfo.shopLogo;
        this.name = shopInfo.name;
        this.fans = shopInfo.cFans;
        this.sells = shopInfo.cSells;
        this.score = shopInfo.score;
        this.goodsCount = shopInfo.cGoods
    }
}

//商品介绍数据
export class GoodsParam {
    constructor(info, rule) {
        // 注: images可能没有值(某些商品有值, 某些没有值)
        this.image = info.images ? info.images[0] : '';
        this.infos = info.set;
        this.sizes = rule.tables;
    }
}

//请求详情页推荐商品数据
export function getRecommend() {
    return request({
        url: '/api/hy66/recommend'
    })
}