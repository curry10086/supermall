<template>
  <div>
    <scroll class="content">
      <div class="sub-category">
        <div class="sub-category-item" v-for="item in currentCategory">
          <a :href="item.link">
            <img :src="item.image" alt="">
            <p>{{ item.title }}</p>
          </a>
        </div>
      </div>
    </scroll>
  </div>
</template>

<script>
import Scroll from "@/components/common/scroll/Scroll";

export default {
  name: "SubCategory",
  components: {
    Scroll
  },
  props: {
    currentCategory: {
      type: Array,
      default() {
        return [];
      }
    }
  },
}
</script>

<style scoped>
.content {
  height: calc(100vh - 44px - 49px);
}

.sub-category {
  display: flex;
  flex-wrap: wrap;
  padding-top: 15px;
}

.sub-category-item {
  width: 33.33%;
  margin-bottom: 20px;
  text-align: center;
}

.sub-category-item img {
  width: 60px;
  margin-bottom: 6px;
}
</style>
