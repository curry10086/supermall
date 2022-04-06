<template>
  <div class="home">
    <nav-bar class="home-nav"><div slot="center">购物节</div></nav-bar>
    <home-swiper :banners='banners'/>
    <home-recommend-view :recommends='recommends'/>
  </div>
</template>

<script>
import NavBar from 'components/common/navbar/NavBar.vue'
import HomeSwiper from './childComps/HomeSwiper.vue'
import {getHomeMultidata} from 'network/home.js'
import HomeRecommendView from './childComps/HomeRecommendView.vue'
export default {
  components:{
    NavBar,
    HomeSwiper,
    HomeRecommendView
  },
  data() {
    return {
      banners:[],
      recommends:[]
    }
  },
  created() {
    getHomeMultidata().then(res =>{
      // console.log(res);
      this.banners = res.data.banner.list
      this.recommends = res.data.recommend.list
      
    })
  },

}
</script>

<style>
  .home-nav{
    background-color:#ff8198;
    color: white;
  }

</style>