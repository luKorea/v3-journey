import {
  useCityStore
} from "@/stores/modules";
import {
  storeToRefs
} from "pinia";


export function useGetData() {
  // 获取数据
  const cityStore = useCityStore();
  cityStore.getCityAction();
  const {
    allCities
  } = storeToRefs(cityStore);
  return {
    cityStore,
    allCities
  }
}