<template>
  <header class="group-header">
    <h2 class="title" v-text="title"></h2>
    <p class="desc" v-text="desc"></p>
  </header>
</template>

<script type="text/ecmascript-6">
  export default {
    props: {
      title: String,
      desc: String
    }
  }
</script>

<style lang="stylus" scoped>
  .group-header
    padding 10px 14px
    border-bottom 1px solid #f0f0f0
    border-left 6px solid #ffab18
  .title
    font-size 16px
    color #333
  .desc
    margin-top 4px
    margin-bottom -2px
    font-size 12px
    line-height 1.4
    color #a3a3a3
</style>