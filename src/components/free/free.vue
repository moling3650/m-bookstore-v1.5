<template>
  <div class="free">
    <top title="免费专区"></top>
    <main class="container">
      <book-table v-if="items[0]" :books="items[0].books"></book-table>
      <book-table v-if="items[1]" :books="items[1].books"></book-table>
      <book-table v-if="items[3]" :books="items[3].books"></book-table>
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
        items: []
      }
    },
    ready () {
      getApiData('/api/channel/371', data => {
        data.items.map(item => {
          let _item = {
            ad_name: item.ad_name,
            ad_copy: item.ad_copy,
            books: []
          }
          item.data.data.map(book => {
            _item.books.push(book.data ? book.data : book)
          })
          this.items.push(_item)
        })
      })
    }
  }
</script>

<style lang="stylus" scoped>
</style>