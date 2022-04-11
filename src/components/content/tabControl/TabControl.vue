<template>
  <div class="tab-control">
      <div v-for="(item,index) in title" 
            :key="index" 
            class="tab-control-item"
             @click="changeItem(index)"  
             :class='{active:currentIndex === index}'>
          <span>{{item}}</span>
      </div>
  </div>
</template>

<script>
export default {
    props:{
        title:{
            type:Array,
            default(){
                return []
            }
        }
    },
    data() {
        return {
            currentIndex:0
        }
    },
    methods: {
        changeItem(index){
            this.currentIndex = index
            this.$emit('tabClick',index)
        }
    },
}
</script>

<style>
.tab-control{
    display: flex;
    text-align: center;
    font-size: 15px;
    height: 40px;
    line-height: 40px;
}
.tab-control-item{
    flex: 1;
    
}
.active span{
    color: #ff5777;
    border-bottom: 1px solid #ff5777;
    padding-bottom: 5px;
    
}

</style>