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
