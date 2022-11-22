<template>
  <div class="detail-container hide-tab-bar">
  </div>
</template>

<script setup>
import { useRoute } from 'vue-router';

const route = useRoute()
console.log(route.params.id);
</script>

<style lang="less" scoped>

</style>