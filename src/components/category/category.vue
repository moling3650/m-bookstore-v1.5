<template>
  <div class="category">category page</div>
</template>

<script type="text/ecmascript-6">
  import { getApiData } from 'common/js/utils.js'

  export default {
    ready () {
      getApiData('/api/category', data => console.log(data))
    }
  }
</script>

<style lang="stylus" scoped>
</style>