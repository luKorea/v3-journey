<template>
  <div class="detail-container hide-tab-bar" ref="detailRef">
    <tab-control
      class="tabs"
      v-if="showTabControl"
      @tab-item-click="tabClick"
      :titles="names"
      ref="tabControlRef"
    ></tab-control>
    <van-nav-bar
      title="房屋详情"
      left-text="返回"
      left-arrow
      @click-left="goBack"
    />
    <div v-if="mainPart" v-memo="[mainPart]">
      <banner-cpn :swipe-data="mainPart.topModule.housePicture.housePics" />
      <info-cpn
        :top-infos="mainPart.topModule"
        name="描述"
        :ref="getSectionRef"
      />
      <facility-cpn
        :ref="getSectionRef"
        name="设施"
        :house-facility="mainPart.dynamicModule.facilityModule.houseFacility"
      />
      <landlord-cpn
        name="房东"
        :ref="getSectionRef"
        :landlord="mainPart.dynamicModule.landlordModule"
      />
      <comment-cpn
        name="评论"
        :ref="getSectionRef"
        :comment="mainPart.dynamicModule.commentModule"
      />
      <notice-cpn
        name="须知"
        :ref="getSectionRef"
        :order-rules="mainPart.dynamicModule.rulesModule.orderRules"
      />
      <map-cpn
        name="地图"
        :ref="getSectionRef"
        :position="mainPart.dynamicModule.positionModule"
      />

      <intro-cpn
        name="简介"
        :ref="getSectionRef"
        :price-intro="mainPart.introductionModule"
      />
    </div>
    <div class="footer">
      <img src="@/assets/img/detail/icon_ensure.png" alt="" />
      <div class="text">弘源优选, 永无止境!</div>
    </div>
  </div>
</template>

<script setup>
import { useDetailStore } from "@/stores/modules";
import { useRoute, useRouter } from "vue-router";

import TabControl from "@/components/tab-control/tab-control.vue";
import BannerCpn from "./cpns/banner.vue";
import InfoCpn from "./cpns/infos.vue";
import FacilityCpn from "./cpns/facility.vue";
import LandlordCpn from "./cpns/landlord.vue";
import CommentCpn from "./cpns/comment.vue";
import NoticeCpn from "./cpns/notice.vue";
import MapCpn from "./cpns/map.vue";
import IntroCpn from "./cpns/intro.vue";

import { storeToRefs } from "pinia";
import { computed } from "@vue/reactivity";
import useScroll from "@/hooks/use-scroll";
import { ref, watch } from "vue";

const route = useRoute();
const router = useRouter();
const goBack = () => router.back();
const detailStore = useDetailStore();
detailStore.fetchDetailData(route.params.id);
const { detailInfos } = storeToRefs(detailStore);
const mainPart = computed(() => detailInfos?.value?.mainPart);

const detailRef = ref();
const { scrollTop } = useScroll(detailRef);
const showTabControl = computed(() => scrollTop.value > 300);
const sectionEls = ref({});
const names = computed(() => {
  return Object.keys(sectionEls.value);
});
const getSectionRef = (value) => {
  console.log(value.$el, "refValue");
  if (!value) return;
  const name = value.$el.getAttribute("name");
  sectionEls.value[name] = value.$el;
};

let isClick = false;
let currentDistance = -1;
const tabClick = (index) => {
  const key = Object.keys(sectionEls.value)[index];
  const el = sectionEls.value[key];
  let distance = el.offsetTop;
  if (index !== 0) {
    distance = distance - 44;
  }

  isClick = true;
  currentDistance = distance;

  detailRef.value.scrollTo({
    top: distance,
    behavior: "smooth",
  });
};

// 页面滚动, 滚动时匹配对应的tabControll的index
const tabControlRef = ref();
watch(scrollTop, (newValue) => {
  if (newValue === currentDistance) {
    isClick = false;
  }
  if (isClick) return;

  // 1.获取所有的区域的offsetTops
  const els = Object.values(sectionEls.value);
  const values = els.map((el) => el.offsetTop);

  // 2.根据newValue去匹配想要索引
  let index = values.length - 1;
  for (let i = 0; i < values.length; i++) {
    if (values[i] > newValue + 44) {
      index = i - 1;
      break;
    }
  }
  console.log(index)
  tabControlRef.value?.setCurrentIndex(index);
});
</script>

<style lang="less" scoped>
.tabs {
  position: fixed;
  left: 0;
  top: 0;
  right: 0;
  z-index: 999;
}
.footer {
  display: flex;
  flex-direction: column;
  align-items: center;
  justify-content: center;
  height: 120px;

  img {
    width: 123px;
  }

  .text {
    margin-top: 12px;
    font-size: 12px;
    color: #7688a7;
  }
}
</style>