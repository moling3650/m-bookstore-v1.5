<template>
  <div class="main">
    <div class="container">
      <section class="main-card" v-if="items[1]">
        <group-header :title="items[1].ad_name"></group-header>
        <book-table :books="items[1].data"></book-table>
      </section>
      <section class="main-card" v-if="items[5]">
        <group-header :title="items[5].ad_name"></group-header>
        <book-table :books="items[5].data"></book-table>
      </section>
    </div>
  </div>
</template>

<script type="text/ecmascript-6">
  import { getApiData } from 'common/js/utils.js'
  import BookTable from 'components/common/book-table/book-table'
  import GroupHeader from 'components/common/group-header/group-header'

  export default {
    components: {
      BookTable,
      GroupHeader
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
            hidden_info: item.hidden_info,
            data: []
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
</style>