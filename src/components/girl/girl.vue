<template>
  <div class="girl">
    <top title="女生频道"></top>
    <div class="container">
      <section class="main-card" v-for="item in items">
        <group-header :title="item.ad_name"></group-header>
      </section>
    </div>
  </div>
</template>

<script type="text/ecmascript-6">
  import { getApiData } from 'common/js/utils.js'
  import Top from 'components/common/top/top'
  import GroupHeader from 'components/common/group-header/group-header'

  export default {
    components: {
      Top,
      GroupHeader
    },
    data () {
      return {
        items: []
      }
    },
    ready () {
      getApiData('/api/channel/370', data => {
        data.items.map(item => {
          let _item = {
            ad_name: item.ad_name,
            hidden_info: item.hidden_info,
            data: item.data.data
          }
          this.items.push(_item)
        })
      })
    }
  }
</script>

<style lang="stylus" scoped>
</style>