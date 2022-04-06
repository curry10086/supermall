<template>
    <div class="recommend">
        <div v-for="(item,index) in recommends" class="recommendItem" :key="index">
            <a :href="item.link">
                <img :src="item.image" />
                <div>{{item.title}}</div>
            </a>
        </div>

    </div>
</template>

<script>
export default {
    props:{
        recommends:{
            type:Array,
            default(){
                return []
            }
        }
    }

}
</script>

<style>
.recommend{
    display: flex;
    width: 100%;
    justify-content: center;
    text-align: center;
    padding: 10px 0 20px;
    border-bottom: 10px solid #eee;
}
.recommendItem{
    flex: 1;

}
.recommendItem img{
    width: 70px;
    height: 70px;
    margin-bottom: 10px;
}
</style>