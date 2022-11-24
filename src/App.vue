<template>
  <div class="app">
    <router-view v-slot="{ Component }">
      <keep-alive include="home">
        <component :is="Component"></component>
      </keep-alive>
    </router-view>
    <tab-bar v-if="!route.meta.hiddenTabBar"></tab-bar>
    <loading></loading>
  </div>
</template>

<script setup>
import TabBar from "@/components/tab-bar/tab-bar.vue";
import Loading from "@/components/loading/loading.vue";
import { useRoute } from "vue-router";
const route = useRoute();
console.log(route, 'route');
</script>

<style scoped>
</style>