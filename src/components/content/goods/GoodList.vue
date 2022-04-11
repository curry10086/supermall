<template>
  <div class="goodsList">
      <good-list-item v-for="item in goods" :key="item.index" :goodsItem='item'/>
  </div>
    
  
</template>

<script>
import GoodListItem from './GoodListItem.vue'

export default {
  components: { GoodListItem },
  props:{
        goods:{
            type:Array,
            default(){
                return []
            }
        }

    }
}
</script>

<style>
.goodsList{
    display: flex;
    flex-wrap: wrap;
    justify-content: space-around;
    padding:2px;
    
}

</style>