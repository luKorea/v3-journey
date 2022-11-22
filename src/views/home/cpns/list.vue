<template>
  <div class="list-container">
    <h2 class="title">热门精选</h2>
    <div class="list">
      <template v-for="item in houseList" :key="item.data.houseId">
        <house-item-v9
          v-if="item.discoveryContentType === 9"
          :item-data="item.data"
          @click="itemClick(item.data)"
        />
        <house-item-v3
          v-else-if="item.discoveryContentType === 3"
          :item-data="item.data"
          @click="itemClick(item.data)"
        />
      </template>
    </div>
  </div>
</template>

<script setup>
import { useHomeStore } from "@/stores/modules";
import { storeToRefs } from "pinia";

import HouseItemV3 from "@/components/house-item-v3/house-item-v3.vue";
import HouseItemV9 from "@/components/house-item-v9/house-item-v9.vue";
import { useRouter } from 'vue-router';

const homeStore = useHomeStore();
const { houseList } = storeToRefs(homeStore);

const router = useRouter()
const itemClick = (data) => {
  router.push(`/detail/${data.houseId}`)
}
</script>

<style lang="less" scoped>
.list-container {
  padding: 10px 8px;

  .title {
    font-size: 22px;
    padding: 10px;
  }

  .list {
    display: flex;
    flex-wrap: wrap;
  }
}
</style>