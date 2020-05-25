import axios from 'axios'


export function getSingerList() {
  const url = '/api/getSingerList'

  return new Promise((resolve, reject) => {
    axios.get(url, {
      param: {}
    }).then((res) => {
    
       resolve(res)
    }).catch((err) => {
       reject(err)
    })
  })
}