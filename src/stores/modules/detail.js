import { defineStore } from "pinia";
import { getDetailInfos } from "@/service";

export const useDetailStore = defineStore('detail', {
  state: () => ({
    detailInfos: {}
  }),
  actions: {
    async fetchDetailData(houseId) {
      const res = await getDetailInfos(houseId)
      this.detailInfos = res.data
    }
  }
})