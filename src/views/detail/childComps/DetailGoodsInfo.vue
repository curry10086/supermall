<template>
  <div class="detail-goods-info" v-if="Object.keys(detailInfo).length !== 0">
    <p>
      {{ detailInfo.desc }}
    </p>
    <div>{{ detailInfo.detailImage[0].key }}</div>
    <ul>
      <li v-for="(item,index) in (detailInfo.detailImage[0].list)" :key="index">
        <img :src="item" alt="" @load="imageLoad">
      </li>
    </ul>
  </div>

</template>

<script>
export default {
  name: "DetailGoodsInfo",
  props: {
    detailInfo: {
      type: Object,
      default() {
        return {}
      }
    }
  },
  data(){
    return{
      counter: 0,//记录当前加载图片的张数
      imagesLength: 0//数组中共要加载图片的张数
    }
  },
  methods: {
    //监听图片有没有加载完，也就是加载的图片长度等于要加载图片的总长度
    imageLoad() {
      if (++this.counter === this.imagesLength) {
        this.$emit('imageLoad')
      }
    }
  },
  watch: {
    detailInfo() {
      //图片数据每次变更都会被监听到并实时刷新
      this.imagesLength = this.detailInfo.detailImage[0].list.length
    }
  }
}
</script>

<style scoped>
.detail-goods-info {
  padding: 20px 15px 0;
}

.detail-goods-info p {
  position: relative;
  padding: 15px 0;
  font-size: 15px;
}

.detail-goods-info p::before {
  content: '';
  position: absolute;
  top: 0;
  left: 0;
  width: 90px;
  height: 5px;
  border-left: solid #333333 5px;
  border-bottom: solid 1px #666666;
  background-color: transparent;
}

.detail-goods-info p::after {
  content: '';
  position: absolute;
  bottom: 0;
  right: 0;
  width: 90px;
  height: 5px;
  border-right: solid #333333 5px;
  border-bottom: solid 1px #666666;
  background-color: transparent;
}

.detail-goods-info div {
  padding: 10px 0;
  font-size: 15px;
}

.detail-goods-info ul img {
  width: 100%;
}

.detail-goods-info ul li {
  list-style: none;
}
</style>
