<template>
  <div  class="app">
    <router-view></router-view>
    <tab-bar v-if="!route.meta.hiddenTabBar"></tab-bar>
    <loading></loading>
  </div>
</template>

<script setup>
import TabBar from '@/components/tab-bar/tab-bar.vue'
import Loading from '@/components/loading/loading.vue'
import { useRoute } from 'vue-router';
const route = useRoute()
</script>

<style scoped>
</style>