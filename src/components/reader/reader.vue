<template>
  <div class="reader">
    <div class="reader-header" v-show="barShow">
      <a class="back" @click="goBack"></a>
      <a class="more" @click.prevent="togglePopupShow"></a>
      <div class="popup" v-show="popupShow">
        <div class="book" @click="goBack">
          <img class="cover" :src="book.cover" :alt="book.title" />
          <h1 class="title" v-text="book.title"></h1>
          <p class="author" v-text="book.authors"></p>
        </div>
        <div class="auto-pay" :class="{'on': isAutoBuy}" @click="toggleAutoBuy"></div>
      </div>
    </div>

    <div class="reader-body" :style="bgStyleObj" @click="toggleBar" @scroll="bodyScroll" v-el:reader-body>
      <ul class="chapters" v-show="contentShow" :style="{fontSize: fontSize + 'px'}">
        <li class="chapter" v-for="chapter in chapters" track-by="$index">
          <h1 class="title" v-text="chapter.t"></h1>
          <p class="paragraph" v-for="paragraph in chapter.p" track-by="$index" v-text="paragraph"></p>
        </li>
      </ul>
    </div>

    <div class="reader-footer" v-show="barShow">
      <div class="footer-bar">
        <div class="top">
          <a class="item prev-chapter" @click.prevent="getPrevChapter"></a>
          <a class="item current-chapter" v-text="(chapterId + 1) + '/' + book.chapter_count"></a>
          <a class="item next-chapter" @click.prevent="getNextChapter"></a>
        </div>
        <div class="bottom">
          <a class="item toc"></a>
          <a class="item font" :class="{'on': fontBarShow}" @click.prevent="toggleFontBar"></a>
          <a class="item" :class="nightMode ? 'day' : 'night'" @click.prevent="switchNightMode"></a>
          <a class="item download"></a>
        </div>
      </div>
      <div class="font-bar" v-show="fontBarShow">
        <div class="font-size">
          <a class="font-large" @click.prevent="largeFontSize"></a>
          <a class="font-small" @click.prevent="smallFontSize"></a>
        </div>
        <div class="font-bg">
          <a class="bg-option" v-for="obj in bgStyleObjs" :class="{'on': bgType === $index}" :style="obj" @click.prevent="changeBgType($index)"></a>
        </div>
      </div>
    </div>
  </div>
</template>

<script type="text/ecmascript-6">
  import { getApiData, getChapterContent, storageGetter, storageSetter } from 'common/js/utils.js'

  export default {
    computed: {
      bgStyleObj () {
        let nightModeStyle = this.bgStyleObjs[5]
        let dayModeStyle = this.bgStyleObjs[this.bgType]
        return this.nightMode ? nightModeStyle : dayModeStyle
      }
    },
    methods: {
      toggleBar () {
        this.barShow = !this.barShow
        this.barShow === false && this.hideBar()
      },
      hideBar () {
        this.fontBarShow = false
        this.popupShow = false
        this.barShow = false
      },
      togglePopupShow () {
        this.popupShow = !this.popupShow
      },
      toggleAutoBuy () {
        this.isAutoBuy = !this.isAutoBuy
        storageSetter('auto_buy', this.isAutoBuy)
      },
      goBack () {
        window.history.go(-1)
      },
      toggleFontBar () {
        this.fontBarShow = !this.fontBarShow
      },
      switchNightMode () {
        this.nightMode = !this.nightMode
        storageSetter('night-mode', this.nightMode)
      },
      changeBgType (type) {
        this.bgType = type
        storageSetter('background-type', this.bgType)
      },
      largeFontSize () {
        if (this.fontSize < 22) {
          storageSetter('font-size', ++this.fontSize)
        }
      },
      smallFontSize () {
        if (this.fontSize > 12) {
          storageSetter('font-size', --this.fontSize)
        }
      },
      getPrevChapter () {
        if (this.chapterId > 0) {
          this.refresh_reader_body(this.chapterId - 1)
        }
      },
      getNextChapter () {
        if (this.chapterId < this.book.chapter_count) {
          this.refresh_reader_body(this.chapterId + 1)
        }
      },
      refresh_reader_body (chapterId) {
        this.contentShow = false
        this.$nextTick(() => {
          getChapterContent(`/api/link?fiction_id=${this.fictionId}&chapter_id=${chapterId}`, chapter => {
            this.chapters.splice(0, this.chapters.length, chapter)
            this.$els.readerBody.scrollTop = 0
            this.contentShow = true
            this.chapterId = chapterId
            storageSetter(`${this.fictionId}-chapter_id`, chapterId)
          })
        })
      },
      bodyScroll () {
        if (this.timer === null) {
          this.timer = setTimeout(() => {
            clearTimeout(this.timer)
            this.timer = null
            this.hideBar()
            let rb = this.$els.readerBody
            let isBottom = (rb.scrollHeight - rb.scrollTop - rb.clientHeight) < (rb.clientHeight * 0.5)
            if (isBottom) {
              getChapterContent(`/api/link?fiction_id=${this.fictionId}&chapter_id=${this.chapterId + 1}`, chapter => {
                this.chapters.push(chapter)
                storageSetter(`${this.fictionId}-chapter_id`, ++this.chapterId)
              })
            }
          }, 1000)
        }
      },
      init () {
        this.hideBar()
        this.contentShow = false
        this.fictionId = this.$route.query.fiction_id
        this.chapterId = parseInt(storageGetter(`${this.fictionId}-chapter_id`)) || 0
        this.fontSize = parseInt(storageGetter('font-size')) || 14
        this.nightMode = storageGetter('night-mode') === 'true'
        this.bgType = parseInt(storageGetter('background-type')) || 0
        this.isAutoBuy = storageGetter('auto_buy') === 'true'

        getChapterContent(`/api/link?fiction_id=${this.fictionId}&chapter_id=${this.chapterId}`, chapter => {
          this.chapters.splice(0, this.chapters.length, chapter)
          this.contentShow = true
        })
        getApiData(`/api/detail/${this.fictionId}`, data => { this.book = data.item })
      }
    },
    route: {
      data () {
        this.init()
      }
    },
    data () {
      return {
        fictionId: 0,
        chapterId: 0,
        book: {},
        barShow: false,
        popupShow: false,
        isAutoBuy: false,
        contentShow: false,
        nightMode: false,
        fontBarShow: false,
        timer: null,
        chapters: [],
        fontSize: 14,
        bgStyleObjs: [
          {background: '#f7eee5'},
          {background: '#e9dfc7'},
          {background: '#a4a4a4'},
          {background: '#cdefce'},
          {background: '#283548', color: '#7685a2'},
          {background: '#0f1410', color: '#4e534f'}
        ],
        bgType: 0
      }
    },
    ready () {
      this.init()
    }
  }
</script>

<style lang="stylus" scoped>
  @import '../../common/stylus/mixin'

  .reader-header
    position fixed
    top 0
    right 0
    left 0
    z-index 2
    height 50px
    font-size 14px
    line-height 50px
    color #d5d5d6
    background rgba(0, 0, 0, .9)

  .back
    display inline-block
    padding 25px 50px
    cursor pointer
    &:before
      content ''
      position absolute
      top 13px
      left 13px
      bg-img('back.png', 24px, 24px)
    &:after
      content '返回'
      position absolute
      top 0px
      left 50px

  .more
    position absolute
    right 0
    padding 25px 50px
    cursor pointer
    &:before
      content ''
      position absolute
      right 38px
      margin-top -3px
      bg-img('more.png', 24px, 6px)

  .popup
    position absolute
    right 25px
    display block
    width 182px
    border-radius 6px
    background rgba(0, 0, 0, .85)
    &:before
      content ''
      position relative
      top -8px
      left 150px
      display block
      width 0
      height 0
      border 8px solid transparent
      border-top 0
      border-bottom-color rgba(0, 0, 0, .85)
    .book
      min-height 74px
      padding 12px 10px
      overflow hidden
      cursor pointer
      .cover
        position absolute
        width 54px
        height 72px
      .title
        margin-top 14px
        margin-left 64px
        font-size 15px
        font-weight bold
        line-height 1
        color #ddd
      .author
        margin-left 62px
        font-size 12px
        line-height 28px
        color #9d9d9c
    .auto-pay
      border-top 1px solid #5e5e5e
      cursor pointer
      &:before
        content ''
        position absolute
        margin 16px 10px
        bg-img('check.png', 18px, 18px)
      &.on:before
        bg-img('check_on.png', 18px, 18px)
      &:after
        content '自动购买下一章'
        margin-left 34px
        font-size 14px

  .reader-body
    position absolute
    top 0
    right 0
    bottom 0
    left 0
    z-index 1
    max-width 900px
    padding 15px 0
    margin 0 auto
    overflow auto
    color #333
  .chapters
    margin 0 15px
  .chapter
    padding-bottom 50px
    .title
      border-bottom 1px solid
      margin-bottom 20px
      font-size 20px
      font-weight bold
      line-height 31px
      color #736357
      letter-spacing 2px
    .paragraph
      overflow hidden
      margin .5em 0
      line-height 24px
      letter-spacing 0
      text-align justify
      text-indent 2em

  .reader-footer
    position fixed
    right 0
    bottom 0
    left 0
    z-index 2
    background rgba(0, 0, 0, .9)

  .footer-bar
    font-size 0
    color #fff
    .item
      display inline-block
      width 25%
      font-size 10px
      text-align center
      cursor pointer
    .top
      height 48px
      border-bottom 1px solid #333
      line-height 48px
      .prev-chapter:after
        content '上一章'
      .next-chapter:after
        content '下一章'
      .current-chapter
        width 50%
    .bottom
      .item
        position relative
        height 70px
        &:before
          content ''
          position absolute
          bottom 33px
        &:after
          display inline-block
          margin-top 45px
      .toc
        &:before
          margin-left 1px
          bg-img('toc.png', 18px, 14px)
        &:after
          content '目录'
      .font
        &:before
          bg-img('font.png', 20px, 13px)
        &:after
          content '字体'
        &.on:before
          margin-bottom -1px
          margin-left -1px
          bg-img('font_on.png', 22px, 15px)
      .day
        &:before
          margin-left 1px
          bg-img('day.png', 18px, 18px)
        &:after
          content '白天'
      .night
        &:before
          margin-left 2px
          bg-img('night.png', 16px, 16px)
        &:after
          content '夜间'
      .download
        &:before
          bg-img('download.png', 22px, 16px)
        &:after
          content '下载'

  .font-bar
    position fixed
    right 0
    bottom 70px
    left 0
    z-index 2
    height 135px
    color #fff
    background rgba(0, 0, 0, .9)

  .font-size, .font-bg
    margin-top 15px
    padding 5px 10px
    &:before
      margin-right 20px
      margin-left 10px
      font-size 14px
      line-height 21px
  .font-size:before
    content '字号'
  .font-bg:before
    content '背景'

  .font-large, .font-small
    display inline-block
    padding 5px 40px
    border 1px solid #8c8c8c
    border-radius 16px
    margin 0 5px
    font-size 13px
    line-height 16px
    cursor pointer
  .font-large:before
    content '大'
  .font-small:before
    content '小'

  .bg-option
    position relative
    display inline-block
    width 30px
    height 30px
    border-radius 50%
    margin-right 10px
    vertical-align middle
    &.on:after
      content ''
      position absolute
      top -2px
      left -2px
      border 1px solid #ff7800
      border-radius 50%
      width 32px
      height 32px
</style>
