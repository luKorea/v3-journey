import httpRequest from '../request'

export function getDetailInfos(houseId) {
  return httpRequest.get({
    url: "/detail/infos",
    params: {
      houseId
    }
  })
}
