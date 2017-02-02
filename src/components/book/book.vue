<template>
  <div class="book">
    <top :title="book.title"></top>
    <main class="container">
      <div class="main-card">
        <div class="detail">
          <img :src="book.cover" :alt="book.title" class="cover" />
          <div class="info">
            <h3 class="title" v-text="book.title"></h3>
            <p class="author" v-text="book.authors"></p>
            <div class="grade" :class="scoreClass">{{ book.score_count > 0 ? book.score_count + '个评价' : '暂无评价'}}</div>
            <p class="price">价格：{{ book.price }}书币/千字</p>
            <p class="count">字数：{{ parseInt(book.word_count / 10000) }}万字 <span class="book-tag" :class="{'finish': book.finish}"></span></p>
          </div>
        </div>
        <ul class="btn-group">
          <li class="btn" v-link="{ path: `/reader?fiction_id=${book.fiction_id}` }"></li>
        </ul>
        <div class="content" v-text="book.content"></div>
        <div class="latest">最新：{{ book.latest }} 更新于 {{ book.updated | smartDate}}</div>
      </div>
      <div class="main-card">
        <h2 class="tag-header">类别标签</h2>
        <ul class="tags">
          <li class="tag" v-for="tag in tags" v-text="tag"></li>
        </ul>
      </div>
      <div class="main-card">
        <h1 class="title">作者其他图书</h1>
        <book-table :books="author_books"></book-table>
      </div>
      <div class="main-card">
        <h1 class="title">喜欢本书的人也喜欢</h1>
        <book-table :books="related"></book-table>
      </div>
      <div class="main-card">
        <h1 class="title">图书信息</h1>
        <p class="rights" v-text="book.rights"></p>
      </div>
    </main>
  </div>
</template>

<script type="text/ecmascript-6">
  import { getApiData } from 'common/js/utils.js'
  import Top from 'components/common/top/top'
  import BookTable from 'components/common/book-table/book-table'

  export default {
    components: {
      Top,
      BookTable
    },
    computed: {
      tags () {
        return this.book.tags ? this.book.tags.slice(0, 3) : []
      },
      scoreClass () {
        if (this.book.score) {
          return `score-${parseInt(this.book.score)}`
        }
        return 'score-0'
      }
    },
    filters: {
      smartDate (timestamp) {
        timestamp *= 1000

        if (!timestamp) {
          return ''
        }
        let today = new Date()
        let now = today.getTime()
        let result = '1分钟前'
        let t = now - timestamp
        if (t > 604800000) {
          let that = new Date(timestamp)
          let yyyy = that.getFullYear()
          let M = that.getMonth() + 1
          let d = that.getDate()
          let h = that.getHours()
          let m = that.getMinutes()
          result = yyyy === today.getFullYear() ? '' : yyyy + '年'
          result += `${M}月${d}日 ${h}:${m < 10 ? '0' : '' + m}`
        } else if (t >= 86400000) {
          result = Math.floor(t / 86400000) + '天前'
        } else if (t >= 3600000) {
          result = Math.floor(t / 3600000) + '小时前'
        } else if (t >= 60000) {
          result = Math.floor(t / 60000) + '分钟前'
        }
        return result
      }
    },
    methods: {
      init () {
        let fictionId = this.$route.params.fiction_id
        getApiData(`/api/book/${fictionId}`, data => {
          this.book = data.item
          this.author_books = data.author_books
          this.related = data.related
        })
      }
    },
    route: {
      data () {
        this.init()
      }
    },
    data () {
      return {
        book: {},
        author_books: [],
        related: []
      }
    },
    ready () {
      this.init()
    }
  }
</script>

<style lang="stylus" scoped>
  @import '../../common/stylus/mixin'
  .detail
    display table
    width 100%
    padding 30px 0
    .cover
      display table-cell
      width 93px
      height 124px
      margin-right 18px
      margin-left 16px
      cover-shadow()
    .info
      display table-cell
      vertical-align middle
      font-size 12px
      .title
        padding 0
        margin-bottom 13px
        font-size 16px
        font-weight normal
        color #000
        single-line()
      .author
        line-height 1.4
        color #4b99a7
      .grade
        margin-top 3px
        margin-bottom 6px
        &:before
          content ''
          display inline-block
          width 80px
          height 12px
          vertical-align middle
          background url('grade.png') no-repeat
          background-size 78px
        for $num in 0 .. 10
          &.score-{$num}:before
            background-position 0 -16px * $num
      .price
        line-height 21px
        color #727272
      .count
        line-height 21px
        color #6e6e6e
      .book-tag
        &:before
          content '连载中'
          display inline-block
          border 1px solid
          padding 0 2px
          border-radius 4px
          margin-left 3px
          line-height 16px
          color #63bd6e
          transform scale(.83)
        &.finish:before
          content '已完结'
          border-color #00a0e9
          color #55b4ec
  .btn-group
    font-size 0
    .btn
      display inline-block
      width 49%
      height 40px
      padding 0 10px
      border-radius 4px
      font-size 14px
      line-height 40px
      text-align center
      box-sizing border-box
      cursor pointer
      &:first-child
        &:before
          content '阅读全文'
        border 1px solid #e35109
        color #fff
        background-color #f35d02
      &:nth-child(2)
        &:before
          content '下载'
        border 1px solid #ddd
        margin-left 2%
        color #737373
      &:only-child
        width 100%
  .content
    position relative
    margin-top 27px
    margin-bottom 10px
    line-height 1.6
    color #585858
    -webkit-n-lines(5)
  .latest
    padding 10px 0
    border-top 1px solid #f0f0f0
    font-size 14px
    text-align center
  .tag-header
    padding 14px 0 8px
    font-size 16px
    line-height 21px
    font-weight bold
  .tags
    margin-bottom 10px
    font-size 0
    line-height 1.6
    color #766d5d
    .tag
      display inline-block
      width auto
      padding 0 15px
      border 1px solid #d3d3d3
      border-radius 4px
      margin-right 10px
      margin-bottom 5px
      font-size 14px
      text-align center
      for $color, $idx in #fbebe8 #fcedda #e8f9db
        &:nth-child(3n+{$idx + 1})
          background-color $color
  .main-card
    padding 0 14px 0 14px
    color #8d8d8d
    .title
      padding-top 15px
      padding-bottom 8px
      font-size 15px
    .rights
      font-size 14px
      line-height 1.6
      &:before
        content '版权：'
</style>
