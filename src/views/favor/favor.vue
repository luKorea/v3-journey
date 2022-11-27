<template>
  <div>
    <input
      type="text"
      placeholder="自定义全局指令v-global-focus"
      v-global-focus
    />
    <!-- <input type="text" placeholder="自定义局部指令v-focus" v-focus /> -->
    <div v-unit>{{111}}</div>
  </div>
</template>

<script setup>
// const vFocus = {
//   mounted(el) {
//     el?.focus();
//   },
// };
</script>

<style lang="less" scoped>
</style>