import dayjs from 'dayjs'

export function formatMonthDay(date, formatStr = "MM月DD日") {
  return dayjs(date).format(formatStr)
}

export function getDiffDays(startDate, endDate) {
  return dayjs(endDate).diff(startDate, "day")
}


export function formatText(day) {
  if (day.type === 'start') {
    day.bottomInfo = '入住';
  } else if (day.type === 'end') {
    day.bottomInfo = '离店';
  }
  return day;
}