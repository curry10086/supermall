<template>
  <div>
    <div id="shop-item">
      <div class="item-selecor">
        <check-button
          :is-checked="itemInfo.checked"
          @click.native="chekClick" 
        ></check-button>
      </div>
      <div class="item-img">
        <img :src="itemInfo.image" alt="商品图片" />
      </div>
      <div class="item-info">
        <div class="item-title">{{ itemInfo.title }}</div>

        <div class="info-bottom">
          <div class="item-price left">￥{{ itemInfo.price }}</div>
          <div class="item-count right">x{{ itemInfo.count }}</div>
        </div>
      </div>
    </div>
    <!-- {{itemInfo}} -->
  </div>
</template>

<script>
import CheckButton from "./CheckButton"
export default {
  name: "CartListItem",
  components:{
    CheckButton,
  },
  props: {
    itemInfo: {
      type: Object,
      default() {
        return {};
      }
    }
  },
  methods:{
    chekClick() {
      //修改模型，在vuex改
      this.itemInfo.checked = !this.itemInfo.checked
    }
  }
};
</script>

<style scoped>
#shop-item {
  width: 100%;
  display: flex;
  font-size: 0;
  padding: 5px;
  border-bottom: 1px solid #ccc;
}

.item-selecor {
  width: 20px;
  display: flex;
  justify-content: center;
  align-items: center;
}

.item-title {
  overflow: hidden;
  white-space: nowrap;
  text-overflow: ellipsis;
}

.item-img {
  padding: 5px;
}

.item-img img {
  width: 80px;
  height: 100px;
  display: block;
  border-radius: 5px;
}

.item-info {
  font-size: 17px;
  color: #333;
  padding: 5px 10px;
  /* position: relative; */
  overflow: hidden;
}

.item-count {
  margin-top: 44px;
}

.info-bottom .item-price {
  margin-top: 44px;
  color: orangered;
}
/* .right{
  float: right;
} */
</style>
