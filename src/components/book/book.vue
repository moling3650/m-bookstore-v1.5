<template>
  <div class="book">
    <top :title="book.title"></top>
    <main class="container">
      <book-table :books="author_books"></book-table>
      <book-table :books="related"></book-table>
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
</style>