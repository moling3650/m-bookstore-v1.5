<template>
  <div class="free">free page</div>
</template>

<script type="text/ecmascript-6">
  import { getApiData } from 'common/js/utils.js'

  export default {
    ready () {
      getApiData('/api/channel/371', data => console.log(data))
    }
  }
</script>

<style lang="stylus" scoped>
</style>