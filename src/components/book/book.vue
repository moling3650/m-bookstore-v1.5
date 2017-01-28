<template>
  <div class="book">
    <top :title="book.title"></top>
  </div>
</template>

<script type="text/ecmascript-6">
  import { getApiData } from 'common/js/utils.js'
  import Top from 'components/common/top/top'

  export default {
    components: {
      Top
    },
    data () {
      return {
        book: {},
        author_books: [],
        related: []
      }
    },
    ready () {
      let id = '348392'
      getApiData(`/api/book/${id}`, data => {
        this.book = data.item
        this.author_books = data.author_books
        this.related = data.related
      })
    }
  }
</script>

<style lang="stylus" scoped>
</style>