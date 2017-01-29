import Vue from 'vue'

const OK = 0

exports.getApiData = (url, succssdedCallback, failedCallback) => {
  Vue.http.get(url).then(res => {
    let data = res.body
    if (data.result === OK) {
      succssdedCallback && succssdedCallback(data)
    } else {
      failedCallback && failedCallback(data)
    }
  }).catch(err => failedCallback && failedCallback(err))
}

exports.parseHiddenInfo = (info) => {
  let obj = {}
  info.replace(/[\[\]\{\}]/g, '').split(';').map(str => {
    let [key, value] = str.split('|')
    obj[key] = value
  })
  return obj
}
