<template>
  <div class="detail-container hide-tab-bar">
    <van-nav-bar
      title="房屋详情"
      left-text="返回"
      left-arrow
      @click-left="onClickLeft"
    />
  </div>
</template>

<script setup>
import { useRoute } from "vue-router";

const route = useRoute();
console.log(route.params.id);
</script>

<style lang="less" scoped>
</style>