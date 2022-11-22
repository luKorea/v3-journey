<template>
  <div class="location-wrap">
    <!-- 位置 -->
    <div class="location bottom-gray-line">
      <div class="city" @click="goCityPage">{{ currentCity.cityName }}</div>
      <div class="address" @click="getCurrentAddress">
        <span>我的位置</span>
        <van-icon name="map-marked" color="var(--primary-color)" />
      </div>
    </div>
    <!-- 日期范围 -->
    <div
      class="section date-range bottom-gray-line"
      @click="showCalendar = true"
    >
      <div class="start">
        <div class="date">
          <span class="tip">入住</span>
          <span class="time">{{ startDateStr }}</span>
        </div>
        <div class="stay">共{{ stayCount }}晚</div>
      </div>
      <div class="end">
        <div class="date">
          <span class="tip">离店</span>
          <span class="time">{{ endDateStr }}</span>
        </div>
      </div>
    </div>
    <van-calendar
      v-model:show="showCalendar"
      type="range"
      color="var(--primary-color)"
      :show-confirm="false"
      :formatter="formatText"
      @confirm="onConfirm"
    />
    <!-- 价格/人数选择 -->
    <div class="section price-counter bottom-gray-line">
      <div class="start">
        <van-field
          v-model="searchInfo.price"
          left-icon="gold-coin-o"
          placeholder="价格不限"
          clearable
        />
      </div>
      <div class="end">
        <van-field
          v-model="searchInfo.number"
          left-icon="friends-o"
          placeholder="人数不限"
          clearable
        />
      </div>
    </div>
    <!-- 关键字 -->
    <div class="section keyword bottom-gray-line">
      <van-field
        v-model="searchInfo.keyword"
        left-icon="search"
        placeholder=" 关键字/位置/民宿名"
        clearable
        @clear="clickItemIndex = -1"
      />
    </div>
    <!-- 热门建议 -->
    <div class="section hot-suggests">
      <template v-for="(item, index) in hotSuggests" :key="index">
        <div
          class="item"
          :style="{
            color: item.tagText.color,
            background: item.tagText.background.color,
          }"
          :class="{ 'item-active': clickItemIndex === index }"
          @click="handleClickItem(item.tagText.text, index)"
        >
          {{ item.tagText.text }}
        </div>
      </template>
    </div>

    <!-- 搜索按钮 -->
    <div class="section search-btn">
      <div class="btn" @click="searchBtnClick">开始搜索</div>
    </div>
  </div>
</template>

<script setup>
import { useCityStore, useHomeStore } from "@/stores/modules";
import { getDiffDays } from "@/utils/format_date";
import { useRouter } from "vue-router";
import { storeToRefs } from "pinia";
import { ref } from "vue";
import useSearch from "@/hooks/use-search";
import useMain from "@/hooks/use-main";

const router = useRouter();

const cityStore = useCityStore();
const { currentCity } = storeToRefs(cityStore);

const goCityPage = () => {
  router.push({
    path: "/city",
  });
};
// 获取用户当前位置
const getCurrentAddress = () => {
  navigator.geolocation.getCurrentPosition(
    (res) => {
      console.log(res);
    },
    (err) => console.log(err, "获取位置失败")
  );
};

// 日期范围的处理
const { startDate, endDate, mainStore, startDateStr, endDateStr, stayCount } =
  useMain();
const showCalendar = ref(false);
const onConfirm = (value) => {
  // 1.设置日期
  const selectStartDate = value[0];
  const selectEndDate = value[1];
  mainStore.startDate = selectStartDate;
  mainStore.endDate = selectEndDate;
  stayCount.value = getDiffDays(selectStartDate, selectEndDate);
  // 2.隐藏日历
  showCalendar.value = false;
};

const homeStore = useHomeStore();
const { hotSuggests } = storeToRefs(homeStore);

// 开始搜索
const searchInfo = ref({});
const clickItemIndex = ref(-1);
const handleClickItem = (keyword, index) => {
  if (clickItemIndex.value === index) return;
  clickItemIndex.value = index;
  searchInfo.value = {
    ...searchInfo.value,
    keyword,
  };
};

const searchBtnClick = () => {
  useSearch(router, {
    startDate: startDate.value,
    endDate: endDate.value,
    currentCity: currentCity.value.cityName,
    ...searchInfo.value,
  });
};
</script>

<style lang="less" scoped>
.location {
  display: flex;
  height: 44px;
  line-height: 44px;
  padding: 0 10px 0 20px;
  box-sizing: border-box;
  color: var(--van-gray-6);
  .city {
    flex: 1;
  }
  .address {
    width: 74px;
  }
}
.section {
  display: flex;
  flex-wrap: wrap;
  align-items: center;
  padding: 0 20px;
  color: #999;
  height: 44px;

  .start {
    flex: 1;
    display: flex;
    height: 44px;
    align-items: center;
  }

  .end {
    min-width: 20%;
    padding-left: 20px;
  }

  .date {
    display: flex;
    flex-direction: column;

    .tip {
      font-size: 12px;
      color: #999;
    }

    .time {
      margin-top: 3px;
      color: #333;
      font-size: 15px;
      font-weight: 500;
    }
  }
}

.date-range {
  height: 44px;
  .stay {
    flex: 1;
    text-align: center;
    font-size: 12px;
    color: #666;
  }
}

.price-counter {
  .start {
    border-right: 1px solid var(--line-color);
  }

  :deep(.van-cell) {
    padding-left: 0 !important;
  }
}

.keyword {
  :deep(.van-cell) {
    padding-left: 0 !important;
  }
}

.hot-suggests {
  margin: 10px 0;
  height: auto;

  .item {
    padding: 4px 8px;
    margin: 4px;
    border-radius: 14px;
    font-size: 12px;
    line-height: 1;
  }
  .item-active {
    background-color: var(--primary-color) !important;
    color: #fff !important;
  }
}
.search-btn {
  .btn {
    width: 342px;
    height: 38px;
    max-height: 50px;
    font-weight: 500;
    font-size: 18px;
    line-height: 38px;
    text-align: center;
    border-radius: 20px;
    color: #fff;
    background-image: var(--theme-linear-gradient);
  }
}
</style>