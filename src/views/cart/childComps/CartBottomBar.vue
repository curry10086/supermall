<template>
  <div class="bottom-bar">
    <div class="check-content">
      <check-button
        :is-checked="isSelectAll"
        class="check-button"
        @click.native="checkClick"
      />
      <span>全选</span>
    </div>

    <div class="price">合计：{{ totalPrice }}</div>

    <div class="calculate" @click="calcClick">去计算({{ checkedLength }})</div>
  </div>
</template>

<script>
import CheckButton from "./CheckButton";
export default {
  name: "CartBottomBar",
  components: {
    CheckButton
  },
  methods: {
    checkClick() {
      if(this.isSelectAll) {  //全部选中
        this.$store.state.cartList.forEach(item => item.checked = false)
      } else {  //部分或全部不选中
        this.$store.state.cartList.forEach(item => item.checked = true)
      }
    },
    calcClick() {
      if(!this.isSelectAll) {
        this.$toast.show('请选择要购买的商品', 2000)
      }
    }
  },
  computed: {
    totalPrice() {

      return (
        "￥" +
        this.$store.state.cartList
          .filter(item => {
            return item.checked;
          })
          .reduce((preValue, item) => {
            return (preValue + item.price * item.count);
          }, 0)
          .toFixed(2)
      );
    },
    checkedLength() {
      return this.$store.state.cartList
        .filter(item => {
          return item.checked;
        }).length;
    },
    isSelectAll() {
      if (this.$store.state.cartList.length === 0) {
        return false;    //购物车为空，全选为false
      } else {
        return this.$store.state.cartList.every(item => item.checked);
      }
    }
  }
};
</script>

<style scoped>
.bottom-bar {
  position: relative;
  display: flex;

  /* bottom: 40px; */
  height: 40px;
  line-height: 40px;

  background-color: #eee;
  font-size: 14px;
}
.check-content {
  display: flex;
  align-items: center;
  margin-left: 10px;
  width: 60px;
}
.check-button {
  width: 20px;
  height: 20px;
  line-height: 20px;
  margin-right: 5px;
}
.price {
  margin-left: 20px;
  flex: 1;
}
.calculate {
  width: 90px;
  background: red;
  color: #fff;
  text-align: center;
}
</style>
