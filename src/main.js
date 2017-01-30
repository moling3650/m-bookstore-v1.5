import Vue from 'vue'
import VueRouter from 'vue-router'
import VueResource from 'vue-resource'
import App from './App'
import Main from 'components/main/main'
import Free from 'components/free/free'
import Boy from 'components/boy/boy'
import Girl from 'components/girl/girl'
import Category from 'components/category/category'
import Book from 'components/book/book'

import 'common/stylus/base.styl'

Vue.use(VueRouter)
Vue.use(VueResource)

let app = Vue.extend(App)

let router = new VueRouter({
  linkActiveClass: 'active'
})

router.map({
  '/': { component: Main },
  '/free': { component: Free },
  '/boy': { component: Boy },
  '/girl': { component: Girl },
  '/category': { component: Category },
  '/book/:fiction_id': {
    name: 'book',
    component: Book
  }
})

router.start(app, '#app')
