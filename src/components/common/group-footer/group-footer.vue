<template>
  <a href="#" class="group-footer" v-if="text != undefined" v-text="text ? text : '查看更多'"></a>
</template>

<script type="text/ecmascript-6">
  export default {
    props: {
      text: String
    }
  }
</script>

<style lang="stylus" scoped>
  .group-footer
    display block
    padding 10px 0
    border-top 1px solid #f0f0f0
    color #333
    text-align center
    text-decoration none
    cursor pointer
    outline none
</style>