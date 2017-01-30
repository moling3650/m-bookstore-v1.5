<template>
  <div class="main">
    <div class="container">
      <section class="main-card" v-if="hot">
        <group-header :title="hot.title"></group-header>
        <book-table :books="hot.data"></book-table>
        <group-footer :text="hot.info.more_text"></group-footer>
      </section><!-- 本周最火 -->
      <section class="main-card" v-if="recommend">
        <header class="h5-header">
          <h2 class="title" v-text="recommend.title"></h2>
        </header>
        <ul class="h5-book-list">
          <h5-book :book="recommend.boy.data[0]"></h5-book>
          <li class="h5-book" v-for="book in recommend.boy.data | limitBy 4 1">
            <p>
              <span class="index" v-text="'0' + ($index+2)"></span>
              <span class="title" v-text="book.title"></span>
              <span class="author" v-text="book.authors"></span>
            </p>
          </li>
        </ul>
        <footer class="h5-footer">
          <a class="next">换一换</a>
          <a class="more">查看全部</a>
        </footer>
      </section><!-- 重磅推荐 -->
      <section class="main-card" v-if="girl">
        <header class="h5-header">
          <h2 class="title" v-text="girl.title"></h2>
        </header>
        <ul class="h5-book-list">
          <h5-book v-for="book in girl.data | limitBy 5" :book="book"></h5-book>
        </ul>
        <footer class="h5-footer">
          <a class="next">换一换</a>
          <a class="more" v-text="girl.info.more_text"></a>
        </footer>
      </section><!-- 女生最爱 -->
      <section class="main-card" v-if="boy">
        <header class="h5-header">
          <h2 class="title" v-text="boy.title"></h2>
        </header>
        <ul class="h5-book-list">
          <h5-book v-for="book in boy.data | limitBy 5" :book="book"></h5-book>
        </ul>
        <footer class="h5-footer">
          <a class="next">换一换</a>
          <a class="more" v-text="boy.info.more_text"></a>
        </footer>
      </section><!-- 男生最爱 -->
      <section class="main-card" v-if="free">
        <group-header :title="free.title"></group-header>
        <book-table :books="free.data"></book-table>
        <group-footer :text="free.info.more_text"></group-footer>
      </section><!-- 限时免费 -->
      <section class="main-card" v-if="topic">
        <header class="h5-header">
          <h2 class="title" v-text="topic.title"></h2>
        </header>
        <footer class="h5-footer">
          <a class="next">换一换</a>
          <a class="more" v-text="topic.info.more_text"></a>
        </footer>
      </section><!-- 精选专题 -->
    </div>
  </div>
</template>

<script type="text/ecmascript-6">
  import { getApiData, parseHiddenInfo } from 'common/js/utils.js'
  import GroupHeader from 'components/common/group-header/group-header'
  import BookTable from 'components/common/book-table/book-table'
  import GroupFooter from 'components/common/group-footer/group-footer'
  import H5Book from 'components/common/h5-book/h5-book'

  export default {
    components: {
      GroupHeader,
      BookTable,
      GroupFooter,
      H5Book
    },
    data () {
      return {
        items: null,
        top: null,
        hot: null,
        recommend: null,
        girl: null,
        boy: null,
        free: null,
        topic: null
      }
    },
    ready () {
      getApiData('/api/channel/418', data => {
        this.items = data
        ;['top', 'hot', 'recommend', 'girl', 'boy', 'free', 'topic'].map((attr, idx) => {
          this[attr] = {
            title: data.items[idx].ad_name,
            info: parseHiddenInfo(data.items[idx].hidden_info),
            data: data.items[idx].data.data
          }
          if (attr === 'boy' || attr === 'girl') {
            this[attr].start = 0
          } else if (attr === 'recommend') {
            this[attr].boy = {
              start: 0,
              data: data.items[idx].data.data.slice(0, 15)
            }
            this[attr].girl = {
              start: 0,
              data: data.items[idx].data.data.slice(15)
            }
            delete this[attr].data
          } else if (attr === 'free') {
            this[attr].data = data.items[idx].data.data.map(item => item.data)
          }
        })
      })
    }
  }
</script>

<style lang="stylus" scoped>
  .book-table
    padding 13px 14px 5px

  .h5-header
    padding 15px 13px 14px 13px
    border-bottom 1px solid #f0f0f0
    .title
      font-size 13px
      line-height 13px
      font-weight bold
      color rgba(0, 0, 0, .9)
  .h5-book-list
    padding 0 13px
  .h5-book
    padding 17px 0
    border-bottom 1px solid #f0f0f0
    &:last-child
      border-bottom none
    .index
      font-size 13px
      line-height 13px
      color rgba(237, 83, 15, .9)
    .title
      font-size 15px
      line-height 15px
      color rgba(0, 0, 0, .9)
    .author
      margin-left 13px
      font-size 12px
      line-height 12px
      color rgba(0, 0, 0, .4)
  .h5-footer
    border-top 1px solid #f0f0f0
    display flex
    .next
    .more
      flex 1
      padding 14px
      font-size 13px
      line-height 1.3em
      color rgba(0, 0, 0, .9)
      text-align center
    .more
      border-left 1px solid #f0f0f0
</style>