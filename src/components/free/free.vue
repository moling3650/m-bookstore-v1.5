<template>
  <div class="free">
    <top title="免费专区"></top>
    <main class="container">
      <section class="main-card" v-if="items[0]">
        <group-header :title="items[0].ad_name"></group-header>
        <book-table :books="items[0].books"></book-table>
      </section>
      <section class="main-card" v-if="items[1]">
        <group-header :title="items[1].ad_name" :desc="items[1].ad_copy"></group-header>
        <book-table :books="items[1].books"></book-table>
      </section>
      <section class="main-card" v-if="items[3]">
        <group-header :title="items[3].ad_name" :desc="items[3].ad_copy"></group-header>
        <book-table :books="items[3].books"></book-table>
      </section>
    </main>
  </div>
</template>

<script type="text/ecmascript-6">
  import { getApiData } from 'common/js/utils.js'
  import Top from 'components/common/top/top'
  import BookTable from 'components/common/book-table/book-table'
  import GroupHeader from 'components/common/group-header/group-header'

  export default {
    components: {
      Top,
      BookTable,
      GroupHeader
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
  .book-table
    padding 13px 14px 5px
    font-size 0
</style>