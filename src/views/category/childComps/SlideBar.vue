<template>
  <div>
    <scroll class="content">
      <ul>
        <li
          v-for="(item,index) in categoryList"
          @click="itemClick(index)"
          :class="{'active':index === currentIndex}"
          :key="index">
          <span>{{ item.title }}</span>
        </li>
      </ul>
    </scroll>
  </div>
</template>
<script>
import Scroll from "@/components/common/scroll/Scroll";

export default {
  name: "SlideBar",
  components: {
    Scroll
  },
  props: {
    categoryList: {
      type: Array,
      default() {
        return [];
      }
    }
  },
  data() {
    return {
      isActive: true,
      currentIndex: 0
    }
  },
  methods: {
    itemClick(index) {
      this.currentIndex = index;
      this.$emit('slideItemClick', index);
    }
  },
}
</script>

<style scoped>
.content {
  height: calc(100vh - 44px - 49px);
}

ul {
  width: 90px;
  list-style: none;
}

li {
  height:55px;
  text-align: center;
  background-color: #F6F6F6;
}

li span {
  display: block;
  position: relative;
  top: 50%;
  border-left: solid 3px transparent;
  transform: translateY(-50%);
}


.active {
  background-color: white;
}

.active span {
  background-color: white;
  border-left-color: var(--color-high-text);
  color: var(--color-high-text);
}


</style>
