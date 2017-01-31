<template>
  <div class="book">
    <top :title="book.title"></top>
    <main class="container">
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
        return this.book.tags.slice(0, 3)
      }
    },
    route: {
      canReuse () {
        return this.book.fiction_id === this.$route.params.fiction_id
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
      let id = this.$route.params.fiction_id || '348392'
      getApiData(`/api/book/${id}`, data => {
        this.book = data.item
        this.author_books = data.author_books
        this.related = data.related
      })
    }
  }
</script>

<style lang="stylus" scoped>
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