<template>
  <div class="wrapper" ref="wrapper">
      <div class="content">
          <slot></slot>
      </div>
  </div>
</template>

<script>
import BScroll from 'better-scroll'
export default {
    data() {
        return {
            scroll:null
        }
    },
    props:{
        probeType:{
            type:Number,
            default:0
        },
        pullUpLoad:{
            type:Boolean,
            default:false
        }
    },
    mounted() {
        // 创建BScroll实例
        this.scroll = new BScroll(this.$refs.wrapper,{
            click:true,
            probeType: this.probeType ,//是否实时监听
            pullUpLoad:this.pullUpLoad// 监听上拉事件
        }),
        // 监听滚动位置
        this.scroll.on('scroll',(position)=>{
            this.$emit('scroll',position)
        })

        // 监听上拉事件
        if(this.pullUpLoad){
            this.scroll.on('pullingUp',()=>{
                this.$emit('pullingUp')
            })

        }
    },
    methods: {
        scrollTo(x,y,time=300){
            this.scroll.scrollTo(x,y,time)
        },
        finishPullUp(){
            this.scroll.finishPullUp()
        },
        refresh(){
            this.scroll.refresh()
        },
        getScrollY(){
            return this.scroll ? this.scroll.y : 0
        }

    },
}
</script>

<style scoped>
.wrapper{
    height: 100%;
}
</style>