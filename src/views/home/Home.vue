<template>
  <div class="home">
    <nav-bar class="home-nav"><div slot="center">购物节</div></nav-bar>
    <tab-control 
                :title="['流行','新款','精选']" 
                class="tab-control" 
                @tabClick='tabClick' 
                ref="topTabControl"
                v-show="isTabShow "
                />
    <scroll class="content" 
            ref="scroll" 
            :probe-type='3' 
            @scroll="contentScroll" 
            :pull-up-load='true'
            @pullingUp='loadMore'> 
      <home-swiper :banners='banners' @swiperImageLoad='swiperImageLoad'/>
      <home-recommend-view :recommends='recommends'/>
      <feature-view/>
      <tab-control 
            :title="['流行','新款','精选']" 
            class="tab-control" 
            @tabClick='tabClick' 
            ref="tabControl"/>
      <good-list :goods="showGoods"/>
    </scroll>
    <!-- 返回顶部/ -->
    <back-top class="back-top" @click.native="backTop" v-show="isDisplay"/>
   
  </div>
</template>

<script>
import HomeSwiper from './childComps/HomeSwiper.vue'
import HomeRecommendView from './childComps/HomeRecommendView.vue'
import FeatureView from './childComps/FeatureView.vue'

import TabControl from 'components/content/tabControl/TabControl.vue'
import NavBar from 'components/common/navbar/NavBar.vue'
import GoodList from 'components/content/goods/GoodList.vue'
import Scroll from 'components/common/scroll/Scroll.vue'
// import BackTop from 'components/content/backTop/BackTop.vue'

import {getHomeMultidata, getHomeGoods}from 'network/home.js'
import {itemListenerMixin,backTopMixin} from 'common/mixin.js'



export default {
  components:{
    HomeSwiper,
    HomeRecommendView,
    FeatureView,
    TabControl,
    NavBar,
    GoodList,
    Scroll,
    // BackTop,
  },
  data() {
    return {
      banners:[],
      recommends:[],
      goods:{
        'pop':{page:0,list:[]},
        'new':{page:0,list:[]},
        'sell':{page:0,list:[]},
      },
      currentType:'pop',
      isDisplay:false,
      tabControlTop:0,
      isTabShow:false,//是否吸顶
      saveY:0,


    }
  },
  mixins:[itemListenerMixin,backTopMixin],
  computed:{
    showGoods(){
      return this.goods[this.currentType].list
    }
  },
  created() {
    // 请求轮播图数据
    this.getHomeMultidata()
    // 请求商品数据
    this.getHomeGoods('pop')
    this.getHomeGoods('new')
    this.getHomeGoods('sell') 

    
  },
  activated() {
    this.$refs.scroll.scrollTo(0,this.saveY,100)
    this.$refs.scroll.refresh()
  },
  deactivated() {
    this.saveY = this.$refs.scroll.getScrollY()

  },
  mounted() {
    // // 接收图片加载的事件
    // const refresh = debounce(this.$refs.scroll.refresh,200)
    // this.itemImgListener = ()=>{
    //   refresh()
    // }
    // this.$bus.$on('itemImageLoad',this.itemImgListener)

    // 获取tabControl的offsetTop
    // console.log(this.$refs.tabControl.$el.offsetTop);


  },
  methods: {
    // 监听轮播图加载
    swiperImageLoad(){
      this.tabControlTop = this.$refs.tabControl.$el.offsetTop;
    },

    // backTop(){
    //   this.$refs.scroll.scrollTo(0,0)
    // },
    // 事件监听
    tabClick(index){
      switch(index){
        case 0:
          this.currentType = 'pop'
          break
        case 1:
          this.currentType = 'new'
          break
        case 2:
          this.currentType = 'sell'
          break
      }
      console.log(this.$refs.tabControl);
      this.$refs.topTabControl.currentIndex = index
      this.$refs.tabControl.currentIndex = index


    

    },
    // 控制滑动位置,操作返回顶部按钮的显示与隐藏
    contentScroll(poasition){
      // 判断backtop是否显示
      this.isDisplay = (-poasition.y) > 1000

      // 决定tabcontrol是否吸顶
      this.isTabShow = (-poasition.y) > this.tabControlTop

    },

    loadMore(){
      this.getHomeGoods(this.currentType)
    },

    // 网络i请求相关方法
    getHomeMultidata(){
      getHomeMultidata().then(res =>{
        // console.log(res);
        this.banners = res.data.banner.list
        this.recommends = res.data.recommend.list
        
      })
    },
    getHomeGoods(type){
      const page = this.goods[type].page + 1
      getHomeGoods(type,page).then(res=>{
        this.goods[type].list.push(...res.data.list)
        this.goods[type].page += 1
        // 完成上拉加载更多,不然不可以连续加载
        this.$refs.scroll.finishPullUp()
      })
    },
    

  },

}
</script>

<style scoped>
  .home{
    /* padding-top: 44px; */
    position: relative;
    height: 100vh;
  }
  .home-nav{
    background-color:#ff8198;
    color: white;
    /* position: fixed;
    left: 0;
    right: 0;
    top: 0;
    z-index: 9999; */

  }
  /* .tab-control{
    position: sticky;
    top: 44px;
    background-color: #fff;
    z-index: 9;
  } */
  .tab-control{
    position: relative;
    z-index: 8;
  }
  .fixed{
    position: fixed;
    top: 44px;
    left: 0;
    right: 0;
  }
  .content{
    height: calc(100% - 93px);
    overflow: hidden;
    /* margin-top: 44px; */
  }
  
  
</style>