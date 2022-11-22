<template>
  <div class="nav-bar">
    <div class="left">
      <slot name="left"></slot>
    </div>
    <div class="center">
      <slot name="center"></slot>
    </div>
    <div class="right">
      <slot name="right"></slot>
    </div>
  </div>
</template>

<script setup>
</script>

<style lang="less" scoped>
.nav-bar {
  display: flex;
  height: 46px;
  line-height: 46px;
  text-align: center;
  color: var(--primary-color);
  background-color: #fff;
  border-bottom: 1px solid var(--border-color);
  .left,
  .center,
  .right {
    flex: 1;
  }
}
</style>