import originJSONP from 'jsonp'

export default function jsonp(url, data, option) {
  // ulr
  // data 参数
  // option 对应插件的optoin
  url += `${url.indexOf('?') === -1 ? '?' : '&'}${param(data)}`
  return new Promise((resolve, reject) => {
    originJSONP(url, option, (err, data) => {
      if (!err) {
        resolve(data)
      } else {
        reject(err)
      }
    })
  })
}

function param(data) {
  let url = ''
  for (var key in data) {
    let value = data[key] !== undefined ? data[key] : ''
    url += `&${key}=${encodeURIComponent(value)}`
  }
  return url ? url.substr(1) : url
}