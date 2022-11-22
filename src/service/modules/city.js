import httpRequest from '../request'


export const getAllCity = () => {
  return httpRequest.get({
    url: '/city/all'
  })
}