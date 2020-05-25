/* eslint-disable no-new */
import { commonParams, options } from 'api/config'
import jsonp from 'common/js/jsonp'
import axios from 'axios'

export function getRecommend() {
  const url = 'https://c.y.qq.com/musichall/fcgi-bin/fcg_yqqhomepagerecommend.fcg'
  const data = Object.assign({}, commonParams, {
    platform: 'h5',
    uin: 0,
    needNewCode: 1
  })

  return jsonp(url, data, options)
}

export function getDisList() {
  const url = '/api/getDiscList'
  const data = Object.assign({}, commonParams, {
    platform: 'yqq',
    needNewCode: 0,
    picmid: 1,
    loginUin: 0,
    hostUin: 0,
    sortId: 5,
    sin: 0,
    ein: 25,
    categoryId: 10000000,
    rnd: Math.random(),
    format: 'json'
  })
  return axios.get(url, {
    params: data
  }).then((res) => {
    console.log(res)
    return Promise.resolve(res.data)
  })
}




