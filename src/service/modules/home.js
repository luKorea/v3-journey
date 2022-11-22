import httpRequest from '../request'

export function getHomeHotSuggests() {
  return httpRequest.get({ 
    url: "/home/hotSuggests" 
  })
}

export function getHomeCategories() {
  return httpRequest.get({
    url: "/home/categories"
  })
}

export function getHomeHouseList(currentPage) {
  return httpRequest.get({
    url: "/home/houselist",
    params: {
      page: currentPage
    }
  })
}