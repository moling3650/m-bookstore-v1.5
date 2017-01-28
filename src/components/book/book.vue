<template>
  <div class="book">book page</div>
</template>

<script type="text/ecmascript-6">
  import { getApiData } from 'common/js/utils.js'

  export default {
    ready () {
      let id = '42078'
      getApiData(`/api/book/${id}`, data => console.log(data))
    }
  }
</script>

<style lang="stylus" scoped>
</style>