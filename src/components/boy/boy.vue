<template>
  <div class="boy">
    <top title="男生频道"></top>
    <div class="container">
      <section class="main-card" v-for="item in items">
        <group-header :title="item.ad_name"></group-header>
        <book-list :books="item.books"></book-list>
        <group-footer :text="item.info.more_text"></group-footer>
      </section>
    </div>
  </div>
</template>

<script type="text/ecmascript-6">
  import { getApiData, parseHiddenInfo } from 'common/js/utils.js'
  import Top from 'components/common/top/top'
  import GroupHeader from 'components/common/group-header/group-header'
  import BookList from 'components/common/book-list/book-list'
  import GroupFooter from 'components/common/group-footer/group-footer'

  export default {
    components: {
      Top,
      GroupHeader,
      BookList,
      GroupFooter
    },
    data () {
      return {
        items: []
      }
    },
    ready () {
      getApiData('/api/channel/369', data => {
        data.items.map(item => {
          let _item = {
            ad_name: item.ad_name,
            books: item.data.data,
            info: parseHiddenInfo(item.hidden_info)
          }
          this.items.push(_item)
        })
      })
    }
  }
</script>

<style lang="stylus" scoped>
</style>