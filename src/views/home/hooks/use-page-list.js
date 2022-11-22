import { useHomeStore } from "@/stores/modules";

export const homeStore = useHomeStore();

export function useGetData() {
  homeStore.fetchHotSuggestData();
  homeStore.fetchCategoriesData();
  homeStore.fetchHouseListData();
}