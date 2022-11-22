<template>
  <div class="city hide-tab-bar">
   <div class="city-search">
     <!-- 搜索 -->
     <van-search
      shape="round"
      show-action
      placeholder="城市/区域/位置"
      v-model="searchValue"
      @cancel="cancelOperation"
      clearable
    />
    <van-tabs v-model:active="tabActive" color="var(--primary-color)">
      <template v-for="(value, key, index) in allCities" :key="index">
        <van-tab :title="value.title" :name="key"></van-tab>
      </template>
    </van-tabs>
   </div>
   <div class="city-content">
    <template v-for="(value, key, index) in allCities" :key="index">
      <city-group :group-data="value" v-show="tabActive === key"></city-group>
    </template>
   </div>
  </div>
</template>

<script setup>
import { ref, computed } from "vue";
import { useRouter } from "vue-router";
import { useGetData } from "./hooks/use-page-list";

import CityGroup from './cpns/city-group.vue'

const router = useRouter();

const { allCities } = useGetData();

const searchValue = ref("");
const tabActive = ref();

// 获取当前选中的组别
const currentGroup = computed(() => allCities.value[tabActive.value])

const cancelOperation = () => router.back();
</script>

<style lang="less" scoped>
.city {
  .city-search {
    position: relative;
    z-index: 99;
    background-color: #fff;
  }
  .city-content {
    // 局部滚动
    height: calc(100vh - 98px);
    overflow-y: auto;
    background-color: var(--van-gray-1);
  }
}
</style>