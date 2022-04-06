<template>
  <div id="tab-bar">
      <slot></slot>
  </div>
</template>

<script>
export default {

}
</script>

<style>
    #tab-bar{
        height: 49px;
        border-top: 1px solid #eee;
        background: color #f6f6f6; 

        position: fixed;
        left: 0;
        right: 0;
        bottom: 0;

        display: flex;
    }

</style>