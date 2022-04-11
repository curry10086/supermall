<template>
  <div class="category">
    <nav-bar class="nav-bar">
      <h2 slot="center">分类</h2>
    </nav-bar>
    <div class="content">
      <slide-bar class="slide-bar"
                 :category-list="categoryList"
                 @slideItemClick="slideItemClick"/>
      <sub-category class="sub-category"
                    :current-category="currentCategory"/>
    </div>
  </div>
</template>

<script>
import navBar from "components/common/navbar/NavBar";
import SlideBar from "./childComps/SlideBar";
import SubCategory from "./childComps/SubCategory";
import Scroll from "components/common/scroll/Scroll";

import {getCategory, getSubCategory, getSubDetail} from "network/category";

export default {
  name: "Category",
  components: {
    navBar,
    SlideBar,
    SubCategory,
    Scroll
  },
  data() {
    return {
      categoryList: [],
      subCategory: [],//保存所有二级分类数据
      currentCategory: []
    }
  },
  methods: {
    //点击一级分类显示对应二级分类数据
    slideItemClick(index) {
      console.log('点击一级分类触发');
      this.setCurrentCategory(index);
    },
    //设置当前要显示的二级分类数据
    setCurrentCategory(index) {
      this.currentCategory = this.subCategory[index];
    },
    getCategory() {
      //请求一级分类数据
      getCategory().then(res => {
        console.log(res, '一级分类数据请求成功');
        //一级分类请求完后才开始请求二级分类，因为它们需要通过一级分类中的字段来请求
        this.categoryList = res.data.category.list;
        this.$nextTick(() => {
          //请求二级分类数据
          for (let i = 0; i < this.categoryList.length; i++) {
            this.getSubCategory(this.categoryList[i].maitKey, i);//将i传过去是为了记录每个分类数据的一二级导航位置索引一致
          }
        })
      })
    },
    //请求二级分类数据的封装函数
    getSubCategory(maitKey, index) {
      getSubCategory(maitKey).then(res => {
        //遍历一级导航数量相等空数组用来占位，这样下面按指定位置插入时才不会乱位
        for (let i = 0; i < this.categoryList.length; i++) {
          this.subCategory.push([]);
        }
        //将二级导航数据按照一级导航中对应的位置插入
        this.subCategory.splice(index, 1, res.data.list);
        this.setCurrentCategory(0);
      })
    }

  },
  created() {
    this.getCategory();
  },

}
</script>

<style scoped>

.category {
  background-color: #fff;
}

.category .nav-bar {
  position: relative;
  z-index: 9;
  background-color: var(--color-tint);
}

.content {
  display: flex;
}

.sub-category {
  flex: 1;
}

/*去除浏览器默认滚动条*/
/*::-webkit-scrollbar{*/
/*  display: none;*/
/*}*/
</style>
