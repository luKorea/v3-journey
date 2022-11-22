import {
  defineStore
} from "pinia";
import {
  getHomeHotSuggests,
  getHomeCategories,
  getHomeHouseList
} from "@/service";

export const useHomeStore = defineStore('home', {
  state: () => ({
    hotSuggests: [], // 热门建议
    categories: [],
    currentPage: 1,
    houseList: []
  }),
  actions: {
    async fetchHotSuggestData() {
      const res = await getHomeHotSuggests()
      this.hotSuggests = res.data
    },
    async fetchCategoriesData() {
      const res = await getHomeCategories()
      this.categories = res.data
    },
    async fetchHouseListData() {
      const res = await getHomeHouseList(this.currentPage)
      this.houseList.push(...res.data)
      this.currentPage++
    }
  }
})