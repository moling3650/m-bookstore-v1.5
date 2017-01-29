<template>
  <div class="main">
    <div class="container">
      <book-table v-if="items[1]" :books="items[1].data"></book-table>
      <book-table v-if="items[5]" :books="items[5].data"></book-table>
    </div>
  </div>
</template>

<script type="text/ecmascript-6">
  import { getApiData } from 'common/js/utils.js'
  import BookTable from 'components/common/book-table/book-table'

  export default {
    components: {
      BookTable
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
</style>