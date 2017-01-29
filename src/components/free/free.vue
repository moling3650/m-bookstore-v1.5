<template>
  <div class="free">
    <top title="免费专区"></top>
    <main class="container">
      <section class="main-card" v-for="item in items" track-by="$index">
        <group-header :title="item.ad_name" :desc="item.ad_copy"></group-header>
        <book-table v-if="!($index==2||$index==4)" :books="item.books"></book-table>
        <book-list v-if="($index==2||$index==4)" :books="item.books"></book-list>
      </section>
    </main>
  </div>
</template>

<script type="text/ecmascript-6">
  import { getApiData, parseHiddenInfo } from 'common/js/utils.js'
  import Top from 'components/common/top/top'
  import BookTable from 'components/common/book-table/book-table'
  import BookList from 'components/common/book-list/book-list'
  import GroupHeader from 'components/common/group-header/group-header'

  export default {
    components: {
      Top,
      GroupHeader,
      BookTable,
      BookList
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
            books: [],
            info: parseHiddenInfo(item.hidden_info)
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
  .book-table
    padding 13px 14px 5px
    font-size 0
</style>