<template>
  <li class="h5-book">
    <a class="h5-book-wrap" v-link="{ name: 'book', params: { fiction_id: book.fiction_id}}">
      <div class="cover-wrap">
        <img class="cover" :src="book.cover" :alt="book.title" />
        <p class="finish" v-text="book.finish ? '完结' : '连载'"></p>
      </div>
      <div class="info">
        <p class="title" v-text="book.title"></p>
        <p class="author" v-text="book.authors"></p>
        <p class="summary" v-text="book.summary"></p>
        <p class="tags">
          <span class="tag" v-for="tag in tags" v-text="tag"></span>
        </p>
      </div>
    </a>
  </li>
</template>

<script type="text/ecmascript-6">
  export default {
    props: {
      book: Object
    },
    computed: {
      tags () {
        let _tags = this.book.tags.slice(0, 2)
        _tags.push(parseInt(this.book.word_count / 10000) + '万字')
        return _tags
      }
    }
  }
</script>

<style lang="stylus" scoped>
  @import '../../../common/stylus/mixin'

  .h5-book-wrap
    display flex
    overflow hidden
  .cover-wrap
    position relative
    flex 0 0 85px
    height 113px
    .cover
      width 100%
      height 100%
    .finish
      position absolute
      right 0
      bottom 0
      left 0
      padding 25px 7px 6px 7px
      font-size 10px
      line-height 10px
      color #fff
      background linear-gradient(top, rgba(0, 0, 0, 0), rgba(0, 0, 0, .5))
  .info
    flex 1
    margin-left 15px
  .title
    margin-top 6px
    font-size 16px
    line-height 17px
    color rgba(0, 0, 0, .9)
    single-line()
  .author
    margin-top 8px
    font-size 12px
    line-height 12px
    color rgba(0, 0, 0, .7)
    single-line()
  .summary
    margin-top 8px
    height 2.8em
    font-size 12px
    line-height 1.4em
    color rgba(0, 0, 0, .6)
    display -webkit-box
    overflow hidden
    text-overflow ellipsis
    -webkit-line-clamp 2
    -webkit-box-orient vertical
  .tag
    display inline-block
    max-width 6em
    padding 3px 6px 1px
    border 1px solid
    border-radius 3px
    margin-right 6px
    font-size 10px
    line-height 11px
    color #54ac7c
    single-line()
</style>