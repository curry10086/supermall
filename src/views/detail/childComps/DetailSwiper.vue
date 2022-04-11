<template>
    <swiper class="detail-swiper">
        <swiper-item class="siper-item" v-for="(item,index) in topImages" :key="index">
            <img :src="item" alt="">
        </swiper-item>
    </swiper>
  
</template>

<script>
import Swiper from 'components/common/swiper/Swiper.vue'
import SwiperItem from 'components/common/swiper/SwiperItem.vue'
export default {
  components: { Swiper, SwiperItem },
    props:{
        topImages:{
            type:Array,
            default(){
                return []
            }
        }
    }
}
</script>

<style scoped>
.detail-swiper{
    height: 300px;
    overflow: hidden;

}

</style>