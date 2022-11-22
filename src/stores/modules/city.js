import {
  defineStore
} from "pinia";
import {
  getAllCity
} from "@/service";


export const useCityStore = defineStore('city', {
  state: () => ({
    allCities: {},
    currentCity: {
      cityName: '广州'
    }
  }),
  actions: {
    async getCityAction() {
      try {
        const res = await getAllCity()
        this.allCities = res.data;
      } catch (err) {
        console.log(err);
      }
    }
  }
})