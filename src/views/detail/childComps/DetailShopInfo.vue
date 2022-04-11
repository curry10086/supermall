<template>
  <div class="shop-info">
    <div class="hd">
      <img :src="shopInfo.logo" class="logo">
      <span class="name">{{ shopInfo.name }}</span>
    </div>
    <div class="md">
      <div class="lt">
        <div>
          <p>{{ finalPrice }}</p>
          <p>销量</p>
        </div>
        <div>
          <p>{{ shopInfo.goodsCount }}</p>
          <p>全部宝贝</p>
        </div>
      </div>
      <span class="line"></span><!--  分割线      -->
      <div class="rt">
        <p v-for="(item,index) in shopInfo.score" :key="index">
          <span>{{ item.name }}</span>
          <span :class="{'score-better':item.isBetter}">{{ item.score }}</span>
          <em :class="{'better-more':item.isBetter}">{{ item.isBetter ? '高' : '低' }}</em>
        </p>
      </div>
    </div>
    <div class="ft">
      <button>
        进店逛逛
      </button>
    </div>

  </div>
</template>

<script>
export default {
    name: "DetailShopInfo",
    props: {
        shopInfo: {
        type: Object,
        default() {
            return {}
        }
        }
    },
    computed: {
        finalPrice() {
            if (this.shopInfo.sells < 10000) {
                return this.shopInfo.sells
            }
            return (this.shopInfo.sells / 10000).toFixed(1) + '万'
            }
        },

}
</script>

<style scoped>
.shop-info {
  width: 100%;
  padding: 25px 8px;
  border-bottom: 5px solid #f2f5f8;
}

.shop-info .hd {
  height: 45px;
  line-height: 45px;
}

.shop-info .hd .logo {
  width: 40px;
  height: 40px;
  border-radius: 50%;
  vertical-align: middle;
}

.shop-info .hd .name {
  margin-left: 8px;
  border-radius: 50%;
  color: #666666;
}

.shop-info .md {
  display: flex;
  height: 82px;
  margin-top: 25px;
  font-size: 14px;
  color: #666666;
}

.shop-info .md .lt {
  flex: 1;
  display: flex;
  align-items: center;
  justify-content: space-evenly;
  border-right: 1px solid rgba(0, 0, 0, .1);
}

.shop-info .md .lt div {
  text-align: center;
}


.shop-info .md .lt div p:first-child {
  margin-bottom: 10px;
  font-size: 18px;
}


.shop-info .md .rt {
  flex: 1;
  display: flex;
  flex-direction: column;
  justify-content: space-between;
  align-items: center;
}

.shop-info .rt p span {
  margin-right: 6px;
}

.shop-info .rt p em {
  font-style: normal;
  color: #fff;
  background-color: green;
}

.shop-info .ft {
  margin-top: 22px;
  height: 30px;
  text-align: center;
}

.shop-info .ft button {
  margin: 0 auto;
  padding: 4px 42px;
  border: none;
  border-radius: 8px;
  font-size: 14px;
  text-align: center;
  color: #666666;
  background-color: #f2f5f8;
}

.score-better {
  color: var(--color-high-text);
}

.shop-info .rt p em.better-more {
  background-color: var(--color-high-text);
}


</style>
