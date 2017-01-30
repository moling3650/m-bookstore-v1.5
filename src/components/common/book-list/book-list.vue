<template>
  <ul class="book-list">
    <li v-for="book in books" track-by="$index">
      <a class="book" v-link="{ name: 'book', params: { fiction_id: book.fiction_id}}">
        <img class="cover" :src="book.cover" :alt="book.title" />
        <div class="info">
          <h1 class="title" v-text="book.title"></h1>
          <p class="summary" v-text="book.summary"></p>
          <p class="author" v-text="book.authors"></p>
          <ul class="tags">
            <li class="tag" v-for="tag in book.tags | limitBy 2" track-by="$index" v-text="tag"></li>
          </ul>
        </div>
      </a>
    </li>
  </ul>
</template>

<script type="text/ecmascript-6">
  export default {
    props: {
      books: Array
    }
  }
</script>

<style lang="stylus" scoped>
  @import '../../../common/stylus/mixin'

  .book
    position relative
    display block
    padding 13px 14px
    cursor pointer
    overflow hidden
    border-bottom 1px solid #f0f0f0
    &:last-child
      border-bottom none
    .cover
      width 104px
      height 136px
      vertical-align top
      cover-shadow()
    .info
      position absolute
      top 14px
      right 14px
      left 127px
    .title
      margin 14px 0
      font-size 16px
      color #000
    .summary
      display -webkit-box
      height 3.2em
      font-size 13px
      line-height 1.6em
      color #666
      overflow hidden
      text-overflow ellipsis
      -webkit-line-clamp 2
      -webkit-box-orient vertical
    .author
      display inline-block
      margin-top 6px
      font-size 12px
      color #666
    .tags
      margin-top -16px
      text-align right
      .tag
        display inline-block
        max-width 6em
        padding 2px
        border 1px solid #ddd
        border-radius 3px
        margin-left -3px
        font-size 12px
        color #8d8d8d
        transform scale(.8)
        single-line()
</style>