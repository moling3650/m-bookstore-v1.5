<template>
  <header class="top">
    <a class="back"></a>
    <span class="title" v-text="title"></span>
    <a v-link="{path: '/'}" class="home"></a>
  </header>
</template>

<script type="text/ecmascript-6">
  export default {
    props: {
      title: String
    }
  }
</script>

<style lang="stylus" scoped>
  @import '../../../common/stylus/mixin.styl'

  .top
    position fixed
    right 0
    left 0
    height 44px
    border-bottom 1px solid #ddd
    font-size 15px
    line-height 44px
    color rgba(0, 0, 0, .7)
    background-color #efeff0
  .back, .home
    position absolute
    width 44px
    height 44px
    cursor pointer
    &:before
      content ''
      display inline-block
      margin-top 14px
  .back
    left 0
  .home
    right 0
  .back:before
    margin-left 17px
    bg-img('back.png', 10px, 16px)
  .home:before
    margin-left 14px
    bg-img('home.png', 16px, 16px)

  .title
    margin-left 44px
</style>