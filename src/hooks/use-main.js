import {
  useMainStore
} from "@/stores/modules";
import {
  formatMonthDay,
  getDiffDays
} from "@/utils/format_date";
import {
  storeToRefs
} from "pinia";
import {
  computed
} from 'vue'


export default function useMain() {
  const mainStore = useMainStore();
  const {
    startDate,
    endDate
  } = storeToRefs(mainStore);
  const startDateStr = computed(() => formatMonthDay(startDate.value));
  const endDateStr = computed(() => formatMonthDay(endDate.value));
  const stayCount = computed(() => getDiffDays(startDate.value, endDate.value));
  return {
    startDate,
    endDate,
    mainStore,
    startDateStr,
    endDateStr,
    stayCount
  }
}