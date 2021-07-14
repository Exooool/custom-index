<template>
  <div class="articleBox">
    <Header :color="'dark'" />
    <div class="wrapper">
      <div class="articlePreview" id="articlePreview" >
        <img v-for="(item,i) in articleList" :key="i" class="img" id="articleImg" ref="articleImg" :src="require('@/'+item.img)">
      </div>
      <div class="articleListWrapper">
          <div class="fillBox"></div>
          <div class="articleAllList">
            <div class="articleItem" v-for="(item,i) in articleList" :key="i"  @mouseover="altImg(i)" @click="jumpArticle()">
              <span class="title">{{item.title}}</span>
              <span class="new"></span>
              <span class="info">{{item.info}}</span>
              <i class="iconfont icon-arrow-right-s-line"></i>
            </div>
          </div>
      </div>
    </div>
    <div class="mobList">
      <a href="" class="item">
        <img class="image" src="" alt="">
        <div class="right"></div>
      </a>
    </div>
  </div>
</template>

<script>
import {Header} from '@/components/blog'
export default {
  components: {
    Header
  },
  data () {
    return {
      articleList:[
        {title:'Article1',info:'A platform to improve decision making in the Agro sector',img:'assets/custom-img/background0.jpg'},
        {title:'Article2',info:'Creating the Club that rewards content creation',img:'assets/custom-img/background1.jpg'},
        {title:'Article3',info:'Thinking the best process to find your new home',img:'assets/custom-img/background2.jpg'},
        {title:'Article4',info:'A platform to improve decision making in the Agro sector',img:'assets/custom-img/background0.jpg'},
        {title:'Article5',info:'Creating the Club that rewards content creation',img:'assets/custom-img/background1.jpg'},
        {title:'Article6',info:'Thinking the best process to find your new home',img:'assets/custom-img/background2.jpg'},
        {title:'Article7',info:'A platform to improve decision making in the Agro sector',img:'assets/custom-img/background0.jpg'},
        {title:'Article8',info:'Creating the Club that rewards content creation',img:'assets/custom-img/background1.jpg'},
        {title:'Article9',info:'Thinking the best process to find your new home',img:'assets/custom-img/background2.jpg'},
        {title:'Article10',info:'A platform to improve decision making in the Agro sector',img:'assets/custom-img/background0.jpg'},
        {title:'Article11',info:'Creating the Club that rewards content creation',img:'assets/custom-img/background1.jpg'},
        {title:'Article12',info:'Thinking the best process to find your new home',img:'assets/custom-img/background2.jpg'}
      ]
    }
  },
  methods: {
    altImg(data){
      // console.log(data);
      // 获取id为articlePreview元素下的子元素集
      let array = document.getElementById("articlePreview").children;
      // 将HtmlCollection转化为真正的数组
      Array.from(array).forEach(function(element){
        element.classList="coverImg";
      })
      let element = document.getElementById("articlePreview").children[data];
      element.classList="coverImg show";
    },
    jumpArticle(){
      this.$router.push({ path: '/blog/article/articleDetail'})
    }
  }
}
</script>

<style scoped>
@import url('../../styles/article.css');
</style>