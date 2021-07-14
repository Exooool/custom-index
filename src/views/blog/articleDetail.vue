<template>
  <div class="articleDetailBox">
    <Header />
    <div class="detailImg">
      <img class="" src="" alt="">
    </div>

    <div class="contentWrapper">

      <div class="contentBox">
        <h2 class="title">NPM install -save 和 -save-dev 傻傻分不清</h2>

        <div class="timeBar">
          <span>2021-05-17</span>
          <span>学习</span>
          <span>暂无评论</span>
          <span>1 次阅读</span>
        </div>

        <div class="mainBody">
          <p>position:sticky是css定位新增属性；可以说是相对定位relative和固定定位fixed的结合；它主要用在对scroll事件的监听上；简单来说，在滑动过程中，某个元素距离其父元素的距离达到sticky粘性定位的要求时(比如top：100px)；position:sticky这时的效果相当于fixed定位，固定到适当位置。</p><p>代码：</p><h1><a class="cl-offset" name="cl-1"></a>sticky-nav {</h1><p>position : sticky ;<br>top : 100px ;<br>}</p><p>设置position:sticky同时给一个(top,bottom,right,left)之一即可<br>使用条件：<br>1、父元素不能overflow:hidden或者overflow:auto属性。<br>2、必须指定top、bottom、left、right4个值之一，否则只会处于相对定位<br>3、父元素的高度不能低于sticky元素的高度<br>4、sticky元素仅在其父元素内生效</p>
        </div>
      </div>
      <div class="sideInfoBar">
        <div class="rcArticleList" >
          <div class="rcArticleItem" v-for="(item,i) in 3" :key="i">
            <img src="../../assets/hotpicture.jpg" alt="">
            <div class="rc-info">
              <h3>Marketing Icons</h3>
              <span>20 Apr 2019</span>
            </div>
          </div>
        </div>
      </div>
    </div>

    <Footer />
  </div>
</template>

<script>
import {Header,Footer} from '@/components/blog'
export default {
  components: {
    Header,
    Footer
  }
}
</script>

<style scoped>
body{
  overflow-y: scroll;
}
@import url('../../styles/articleDetail.css');
</style>