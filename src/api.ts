import * as axios from 'axios'

const api = axios.default
api.defaults.baseURL = 'http://jds.flycran.xyz'
api.defaults.headers.authorization = 'Bearer eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJpZCI6MSwicG93ZXIiOltdLCJkYXRlIjoxNjY4NTAxNzQyMTY5LCJpYXQiOjE2Njg1MDE3NDIsImV4cCI6MTY2OTEwNjU0Mn0.wmT1VMQefLROJ5bmMlKsxPGHrdVeKy8GNmrK7aXzmuY'

export const search = (data: {}) => api.request({
  url: '/api/commodity/search',
  params: data,
})
export const shoppingCart = (data: {}) => api.request({
  url: '/api/shopping-cart/list',
  params: data,
})
export const test = (data: {} = {}) => api.request({
  url: '/api/classify/list?id=&grade=&parent=1'
})