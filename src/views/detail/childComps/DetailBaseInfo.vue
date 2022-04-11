<template>
  <div class="base-info">
    <p class="info-title">{{ goods.title }}</p>
    <div class="info-price">
      <span class="new-price">{{ goods.newPrice }}</span>
      <s class="old-price">{{ goods.oldPrice }}</s>
      <!-- v-if是为了让数据不存在时不显示这个框     -->
      <span v-if="goods.discount " class="discount">{{ goods.discount }}</span>
    </div>
    <ul class="info-other">
      <li v-for="(item,index) in goods.columns" :key="index">{{ item }}</li>
    </ul>
    <ul class="info-service">
      <li v-for="(item,index) in goods.services" :key="index"> <!--少显示一条服务数据太多换行不好看      -->
        <img :src="item.icon" alt="">
        {{ item.name }}
      </li>
    </ul>
  </div>

</template>

<script>
export default {
  name: "DetailBaseInfo",
  props: {
    goods: {
      type: Object,
      default() {
        return {}
      }
    }
  },
  updated() {

  }
}
</script>

<style scoped>
.base-info {
  padding: 15px 8px 0;
  border-bottom: 5px solid #f2f5f8;
}

.info-title {
  color: black;
  margin-bottom: 10px;
}

.new-price {
  font-size: 24px;
  color: var(--color-high-text);
}

.old-price {
  margin-left: 3px;
  font-size: 14px;
}

.discount {
  position: relative;
  top: -8px;
  display: inline-block;
  padding: 3px;
  margin-left: 3px;
  font-size: 8px;
  text-align: center;
  border-radius: 5px;
  color: #fff;
  background-color: var(--color-high-text);
}

.info-other {
  display: flex;
  justify-content: space-between;
  padding-bottom: 7px;
  margin-top: 25px;
  font-size: 14px;
  border-bottom: 1px solid #EFEFEF;
}

.info-other li {
  list-style: none;
}

.info-service {
  display: flex;
  justify-content: space-between;
  height: 61px;
}

.info-service li {
  /* height: 61px; */
  line-height: 61px;
  overflow: hidden;
  font-size: 12px;
  list-style: none;
  color: #666666;
}

.info-service li img {
  position: relative;
  top: -2px;
  width: 18px;
  height: 18px;
  vertical-align: middle;
}
</style>
