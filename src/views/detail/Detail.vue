<template>
  <div class="detail">
      <detail-nav-bar class="detail-nav-bar" @titleClick='titleClick' ref="nav"/>
      <scroll class="content" ref="scroll" :probe-type='3' @scroll="contentScroll"> 
        <detail-swiper :top-images="topImages"/>
        <detail-base-info :goods="goods"/>
        <detail-shop-info :shop-info="shopInfo"/>
        <detail-goods-info :detail-info='detailInfo' @imageLoad='imageLoad'/>
        <detail-param-info ref="params" :param-info='paramInfo'/>
        <detail-comment-info ref="comment" :comment-info="commentInfo"/> 
        <good-list ref="recommend" :goods='recommend'/>

      </scroll>
      <back-top class="back-top" @click.native="backTop" v-show="isDisplay"/>
      <detail-bottom-bar @addToCart='addToCart'/>
      <!-- <toast :message='message' :show='show'/> -->
      
  </div>
</template>

<script>
import DetailNavBar from './childComps/DetailNavBar.vue';
import DetailSwiper from './childComps/DetailSwiper.vue';
import DetailBaseInfo from './childComps/DetailBaseInfo.vue';
import DetailShopInfo from './childComps/DetailShopInfo.vue';
import DetailGoodsInfo from './childComps/DetailGoodsInfo.vue';
import DetailParamInfo from './childComps/DetailParamInfo.vue';
import DetailCommentInfo from './childComps/DetailCommentInfo.vue';
import DetailBottomBar from './childComps/DetailBottomBar.vue';

import Scroll from 'components/common/scroll/Scroll.vue'
import GoodList from 'components/content/goods/GoodList.vue';
// import Toast from 'components/common/toast/Toast.vue';

import {getDetail,Goods,Shop,GoodsParam,getRecommend} from 'network/detail.js'
import {itemListenerMixin,backTopMixin} from 'common/mixin.js'

export default {
    name:'Detail',
    components: { DetailNavBar, DetailSwiper,DetailBaseInfo, DetailShopInfo, Scroll, DetailGoodsInfo, DetailParamInfo, DetailCommentInfo,GoodList, DetailBottomBar },

    data() {
        return {
            iid:null,
            topImages:[],
            goods:{},
            shopInfo: {},
            detailInfo: {},
            paramInfo:{},
            commentInfo: {},
            recommend: [],
            themeTopYs: [],//保存顶部各个标题对应要切换的offsetTop值
            // isShowBackTop: false,//记录返回顶部按钮是否显示
            // message:'',
            // show:false

        }
    },
    mixins:[itemListenerMixin,backTopMixin],
    created() {
        this.iid = this.$route.params.iid

        getDetail(this.iid).then(res=>{

            // console.log(res);
            const data = res.result
            // 获取轮播图
            this.topImages = data.itemInfo.topImages
            // 获取商品信息
            this.goods = new Goods(data.itemInfo,data.columns,data.shopInfo.services)
            //3.获取店铺信息
            this.shopInfo = new Shop(data.shopInfo);

            // 4.保存商品的详情数据
            this.detailInfo = data.detailInfo;

            // 5.获取参数的信息
            this.paramInfo = new GoodsParam(data.itemParams.info, data.itemParams.rule)

            //6.获取评论数据
            if(data.rate.cRate !== 0){
                this.commentInfo = data.rate.list[0];
            }
        }),
        getRecommend().then(res =>{
            const data = res.data
            this.recommend = data.list
        })
    },
    methods: {
        // 添加购物车
        addToCart(){
            let product = {}
            product.image = this.topImages[0]
            product.title = this.goods.title
            product.desc = this.goods.desc
            product.price = this.goods.realPrice
            product.iid = this.iid
            // this.$store.commit('addCart',product)
            this.$store.dispatch("addToCart",product).then(res =>{
                console.log(res);
                this.$toast.show(res)
            })

        },
        // 图片加载
        imageLoad(){
            this.$refs.scroll.refresh()
            this.themeTopYs.push(0)
            this.themeTopYs.push(this.$refs.params.$el.offsetTop)
            this.themeTopYs.push(this.$refs.comment.$el.offsetTop)
            this.themeTopYs.push(this.$refs.recommend.$el.offsetTop)
        },
        titleClick(index){
            this.$refs.scroll.scrollTo(0,- this.themeTopYs[index],200)
        },
        contentScroll(position){
            const positionY = -position.y

            let length = this.themeTopYs.length
            for(let i = 0;i < length;i++){
                if((i <length - 1 && positionY > this.themeTopYs[i] && positionY <= this.themeTopYs[i + 1]) || 
                    (i === length - 1 && positionY >= this.themeTopYs[i])){
                        // console.log(111);
                        this.$refs.nav.currentIndex = i
                }

            }


              //1、判断到顶按钮显示隐藏
            this.isDisplay = (-position.y) > 1000
        }
    },

}
</script>

<style scoped>
.detail{
    position: relative;
    z-index: 10;
    background-color: #fff;
    height: 100vh;
}
.detail-nav-bar{
    position: relative;
    z-index: 10;
    background: #fff;
}
.content{
    height: calc(100% - 44px - 49px);
}
</style>