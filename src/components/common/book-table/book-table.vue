<template>
  <ul class="book-table">
    <li class="item" v-for="book in books" track-by="$index">
      <a class="book" v-link="{ name: 'book', params: { fiction_id: book.fiction_id}}">
        <img class="cover" :src="book.cover" :alt="book.title" />
        <h1 class="title" v-text="book.title"></h1>
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
  @import '../../../common/stylus/mixin.styl'

  .item
    display inline-block
    width 33.33%
    margin-bottom 8px
    line-height 1
    vertical-align top
    for dir, idx in left center right
      &:nth-child(3n+{idx+1})
        text-align dir
    .book
      display inline-block
      width 86px
    .cover
      width 100%
      height 113px
      cover-shadow()
    .title
      max-height 2.8em
      margin-top 8px
      overflow hidden
      font-size 13px
      line-height 1.4em
      color #8d8d8d
      text-align left
</style>