<template>
  <div class="home-container" ref="homeRef">
    <nav-bar>
      <template #center>
        <span>旅途优选</span>
      </template>
    </nav-bar>
    <div class="banner">
      <img src="@/assets/img/home/banner.webp" alt="" />
    </div>

    <!-- 定位 -->
    <location-cpn></location-cpn>
    <!-- 分类 -->
    <categories-cpn></categories-cpn>
     <!-- 浮动搜索 -->
     <div class="search-bar bottom-gray-line" v-if="isShowSearchBar">
      <search-bar></search-bar>
    </div>
    <!-- 列表 -->
    <list-cpn></list-cpn>
  </div>
</template>

<script>
export default {
  name: 'home'
}
</script>
<script setup>
import { watch, computed, ref, onActivated } from 'vue';

import NavBar from "@/components/nav-bar/nav-bar.vue";
import SearchBar from '@/components/search-bar/search-bar.vue'
import LocationCpn from "./cpns/location.vue";
import CategoriesCpn from "./cpns/categories.vue";
import ListCpn from "./cpns/list.vue";

import { useGetData, homeStore } from "./hooks/use-page-list";
import useScroll from "@/hooks/use-scroll";

useGetData();

const homeRef = ref()

const { isReachBottom, scrollTop } = useScroll(homeRef);
watch(isReachBottom, (newValue) => {
  if (newValue) {
    homeStore.fetchHouseListData().then(() => {
      isReachBottom.value = false;
    });
  }
});

onActivated(() => {
  homeRef.value?.scrollTo({
    top: scrollTop.value
  })
})

const isShowSearchBar = computed(() => scrollTop.value >= 360);
</script>

<style lang="less" scoped>
.home-container {
  height: 100vh;
  padding-bottom: 60px;
  overflow-y: auto;
  .banner {
    img {
      width: 100%;
    }
  }
  .search-bar {
    position: fixed;
    z-index: 9;
    top: 0;
    left: 0;
    right: 0;
    height: 45px;
    padding: 16px 16px 10px;
    background-color: #fff;
  }
}
</style>