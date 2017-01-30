<template>
  <div class="main">
    <div class="container">
      <section class="main-card" v-if="items[1]">
        <group-header :title="items[1].ad_name"></group-header>
        <book-table :books="items[1].data"></book-table>
        <group-footer :text="items[1].info.more_text"></group-footer>
      </section>
      <section class="main-card" v-if="items[3]">
        <header class="h5-header">
          <h2 class="title" v-text="items[3].ad_name"></h2>
        </header>
        <ul class="h5-book-list">
          <h5-book v-for="book in items[3].data | limitBy 5" :book="book"></h5-book>
        </ul>
      </section>
      <section class="main-card" v-if="items[4]">
        <header class="h5-header">
          <h2 class="title" v-text="items[4].ad_name"></h2>
        </header>
        <ul class="h5-book-list">
          <h5-book v-for="book in items[4].data | limitBy 5" :book="book"></h5-book>
        </ul>
      </section>
      <section class="main-card" v-if="items[5]">
        <group-header :title="items[5].ad_name"></group-header>
        <book-table :books="items[5].data"></book-table>
        <group-footer :text="items[5].info.more_text"></group-footer>
      </section>
    </div>
  </div>
</template>

<script type="text/ecmascript-6">
  import { getApiData, parseHiddenInfo } from 'common/js/utils.js'
  import GroupHeader from 'components/common/group-header/group-header'
  import BookTable from 'components/common/book-table/book-table'
  import GroupFooter from 'components/common/group-footer/group-footer'
  import H5Book from 'components/common/h5-book/h5-book'

  export default {
    components: {
      GroupHeader,
      BookTable,
      GroupFooter,
      H5Book
    },
    data () {
      return {
        items: []
      }
    },
    ready () {
      getApiData('/api/channel/418', data => {
        data.items.map(item => {
          let _item = {
            ad_name: item.ad_name,
            data: [],
            info: parseHiddenInfo(item.hidden_info)
          }
          item.data.data.map(data => {
            _item.data.push(data.data ? data.data : data)
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

  .h5-header
    padding 15px 13px 14px 13px
    border-bottom 1px solid #f0f0f0
    .title
      font-size 13px
      line-height 13px
      font-weight bold
      color rgba(0, 0, 0, .9)
  .h5-book-list
    padding 0 13px
  .h5-book
    padding 17px 0
    border-bottom 1px solid #f0f0f0
    &:last-child
      border-bottom none
</style>