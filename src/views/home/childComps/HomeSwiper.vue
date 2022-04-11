<template>
      <div id="hy-swiper">
          <!-- 图片 -->
        <div class="swiper">
            <div class="slide"  v-for="item in banners" :key="item.id">
                <a :href="item.link">
                    <img :src="item.image" @load="imageLoad"/>
                </a>   
            </div>
        </div>
        <div class="next leftnext" @click="previous">←</div>
        <div class="next rightnext" @click="next">→</div>
        <div class="indicator" >
            <div v-for="(item, index) in slideCount" class="indi-item" :class="{active: index === currentIndex-1}" @click="changeItem(index+1)" :key="index"></div>
        </div>
    </div>
</template>

<script>
export default {
    props:{
        banners:{
            type:Array,
            default(){
                return []
            }
            
        }
    },
    data() {
        return {
            slideCount:0,//元素个数
            currentIndex:1,//当前正在页面
            totalWidth:0,//总宽度
            swiperStyle:{}, // swiper样式
            interval:3000,

            scrolling: false, // 是否正在滚动

            isLoad:false//是否轮播图加载
        }
    },
    mounted() {
         // 1.操作DOM, 在前后添加Slide
      setTimeout(() => {
        this.handleDom();
      }, 500)

      this.startTimer()

    },
    methods: {
      imageLoad(){
        if(!this.isLoad){
          this.$emit('swiperImageLoad')
          this.isLoad = !this.isLoad 
        }
      },

        changeStatus(){
            console.log(111);
        },
         /**
       * 操作DOM, 在DOM前后添加Slide
       */
        handleDom() {
                // 1.获取要操作的元素
                let swiperEl = document.querySelector('.swiper');
                let slidesEls = swiperEl.getElementsByClassName('slide');

                // 2.保存个数
                this.slideCount = slidesEls.length;

                // 3.如果大于1个, 那么在前后分别添加一个slide
                if (this.slideCount > 1) {
                    let cloneFirst = slidesEls[0].cloneNode(true);
                    let cloneLast = slidesEls[this.slideCount - 1].cloneNode(true);
                    swiperEl.insertBefore(cloneLast, slidesEls[0]);
                    swiperEl.appendChild(cloneFirst);
                    this.totalWidth = swiperEl.offsetWidth;
                    this.swiperStyle = swiperEl.style;
                }

                // 4.让swiper元素, 显示第一个(目前是显示前面添加的最后一个元素)
                this.setTransform(-this.totalWidth);
                
            },

            /**
           * 定时器操作
           */
          startTimer() {
            this.playTimer = window.setInterval(() => {
              this.currentIndex++;
              this.scrollContent(-this.currentIndex * this.totalWidth);
                }, this.interval)
          },
          stopTimer: function () {
            window.clearInterval(this.playTimer);
          },

          /**
           * 滚动到正确的位置
           */
          scrollContent(currentPosition) {
            // 0.设置正在滚动
            this.scrolling = true;

            // 1.开始滚动动画
            // this.swiperStyle.transition ='transform '+ this.animDuration + 'ms';
            this.setTransform(currentPosition);

            // 2.判断滚动到的位置
            this.checkPosition();

            // 4.滚动完成
            this.scrolling = false
          },

          /**
           * 校验正确的位置
           */
          checkPosition() {
            // window.setTimeout(() => {
              // 1.校验正确的位置
            //   this.swiperStyle.transition = '0ms';
              if (this.currentIndex >= this.slideCount + 1) {
                this.currentIndex = 1;
                this.setTransform(-this.currentIndex * this.totalWidth);
              } else if (this.currentIndex <= 0) {
                this.currentIndex = this.slideCount;
                this.setTransform(-this.currentIndex * this.totalWidth);
              }

              // 2.结束移动后的回调
            //   this.$emit('transitionEnd', this.currentIndex-1);
            // }, this.animDuration)
          },

          /**
           * 设置滚动的位置
           */
          setTransform(position) {
            this.swiperStyle.transform = `translate3d(${position}px, 0, 0)`;
          },

        

          
          /**
           * 控制上一个, 下一个
           */
          previous() {
            this.changeItem(this.currentIndex-1);
          },

          next() {
            this.changeItem(this.currentIndex+1);
          },

          changeItem(num) {
            // 1.移除定时器
            this.stopTimer();
            console.log(num);

            // 2.修改index和位置
            this.currentIndex = num;
            this.scrollContent(-this.currentIndex * this.totalWidth);
            console.log(this.currentIndex);

            // 3.添加定时器
            this.startTimer();
          }
    },
}
</script>

<style>
  #hy-swiper {
    overflow: hidden;
    position: relative;
  }

  .swiper {
    display: flex;
  }
  .next{
      position: absolute;
      top: 50%;
  }
  .rightnext{
      right:0
  }
  .indicator {
    display: flex;
    justify-content: center;
    position: absolute;
    width: 100%;
    bottom: 8px;
  }

  .indi-item {
    box-sizing: border-box;
    width: 8px;
    height: 8px;
    border-radius: 4px;
    background-color: #fff;
    line-height: 8px;
    text-align: center;
    font-size: 12px;
    margin: 0 5px;
  }

  .indi-item.active {
    background-color: rgba(212,62,46,1.0);
  }

   .slide {
    width: 100%;
    flex-shrink: 0;
  }

  .slide img {
    width: 100%;
  }
</style>