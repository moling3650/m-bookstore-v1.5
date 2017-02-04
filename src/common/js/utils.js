'use strict'
const Vue = require('vue')
const Base64 = require('js-base64').Base64
const OK = 0
const PREFIX = 'm-reader'

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

function getContent (jsonpUrl, timeout) {
  return new Promise((resolve, reject) => {
    if (Object.prototype.toString.call(jsonpUrl) !== '[object String]') {
      throw new Error('Type of param "jsonpUrl" is not string.')
    }

    const HEAD_NODE = document.querySelector('head')
    const CALLBACK = 'duokan_fiction_chapter'
    let timer
    let paddingScript = document.createElement('script')
    paddingScript.src = jsonpUrl

    if (typeof timeout === 'number') {
      timer = setTimeout(() => {
        clearTimeout(timer)
        HEAD_NODE.removeChild(paddingScript)
        delete window[CALLBACK]
        reject({ statusText: 'Request Timeout', status: 408 })
      }, timeout)
    }

    window[CALLBACK] = (data) => {
      clearTimeout(timer)
      HEAD_NODE.removeChild(paddingScript)
      delete window[CALLBACK]
      resolve(JSON.parse(Base64.decode(data)))
    }

    HEAD_NODE.appendChild(paddingScript)
  })
}

exports.getChapterContent = (url, callback, errCallback = null, timeout = 3000) => {
  if (typeof errCallback === 'number') {
    [errCallback, timeout] = [null, errCallback]
  }
  Vue.http.get(url).then(res => {
    if (res.body.result === OK) {
      getContent(res.body.url, timeout)
        .then(data => callback && callback(data))
        .catch(err => errCallback && errCallback(err))
    }
  }).catch(err => errCallback && errCallback(err))
}

exports.storageGetter = key => window.localStorage.getItem(PREFIX + key)

exports.storageSetter = (key, value) => window.localStorage.setItem(PREFIX + key, value)
