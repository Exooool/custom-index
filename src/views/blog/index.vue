<template>
  <div class="blogBox" id="blogBox" @scroll="handleScroll">

    <!-- <div class="topBtn" @click="scrollElemt()">top</div> -->
    <Header />

    <div class="welcomeTab">
      <div class="welcomeTabWrapper">
        <div class="animated leftIn">
          <h1 class="newfont para">如果你掉进了黑暗里，你能做的，不过是静心等待，直到你的双眼适应黑暗。</h1>
        </div>

        <div class="animated leftIn">
          <h1 class="para" style="font-size: 25px;margin:0;width:400px">TeaBox 个人博客网站主要是记录了我对于生活以及学习方面进行记录得博客网站，可供大家参考以及评价</h1>
        </div>
        
        <div class="arrowBox topIn">
          <i class="iconfont icon-arrow-down-line downArrow"></i>
        </div>
      </div>

      <div class="bgOverlay"></div>
      <img class="welcomeBg" src="../../assets/blog/img7.jpg" alt="">
    </div>

    <div class="introduceTab">
      <div class="blogIntroduce">
        <h2 class="title">Looks like magic, works like science.</h2>
        <p class="description">There’s no secret sauce, no wizard behind the curtain. What makes Aerolab tick is an interdisciplinary team with a framework that fosters candid collaboration.</p>
      </div>
    </div>

    

    <div class="articleTab">

      <!-- 过渡图片栏 -->
      <div class="transistionTab">
        <div class="bgOverlay"></div>
        <img class="detailBg" src="../../assets/blog/img6.jpg" alt="">
      </div>
      
      <!-- 文章列表 -->
      <div class="articleList" id="articleList">
        
        <!-- articleBox cover控制整体box的大小 -->
        <div class="articleBox wholeColumn cover">
          <div class="imgBox">
            <img class="img" src="../../assets/blog/img2.jpg" alt="">
          </div>
          
          <!-- card控制卡片的大小 -->
          <div class="articleInfo card">
            <span class="classification">Acamica</span>
            <span class="title">Rethinking the experience of online education.</span>
            <span class="next">Read the case study</span>
            <span class="underline"></span>
          </div>
        </div>

        <div class="articleBox cover">
          <div class="imgBox">
            <img class="img" src="../../assets/blog/img4.jpg" alt="">
          </div>
          <div class="articleInfo card">
            <span class="classification">Acamica</span>
            <span class="title">A marketplace for Forest Carbon Credits.</span>
            <span class="underline"></span>
          </div>
        </div>
        <div class="articleBox cover">
          <div class="imgBox ">
            <img class="img" src="../../assets/blog/img5.jpg" alt="">
          </div>
          <div class="articleInfo card">
            <span class="classification">Acamica</span>
            <span class="title">A fitness assistant like no other.</span>
            <span class="underline"></span>
          </div>
        </div>
      </div>
       
      <!-- 按钮box -->
      <div class="btnBox">
        <router-link class="jumpBtn" to="/blog/article">
          Read More Article
          <i class="iconfont icon-arrow-right-s-line"></i>
        </router-link>
      </div>
      
    </div>

    <!-- 页脚 -->
    <div class="footer">
      
      <div class="footerBottom">

        <img class="footerLogo" src="../../assets/TeaBox.png"/>
        
        <div class="beian">
          <a class="links" target="_blank" href="http://www.beian.gov.cn/portal/registerSystemInfo?recordcode=44049102496715" >
            <img src="../../assets/beian.png" style="float:left;"/>
            <span>粤公网安备 44049102496715号</span>
          </a>
          <a class="links" target="_blank" href="http://beian.miit.gov.cn/">渝ICP备2021002745号</a>
        </div>

        <!-- <span class="">
          本博客由teabox网站持有者所运营
        </span> -->

        <div class="blogSupport">
          <span>本网站由Vue提供技术开发</span>
          <img class="footerLogo" style="height:50%" src="../../assets/logo.png"/>
        </div>

      </div>
      
    </div>

  </div>
</template>

<script>
import {Header} from '@/components/blog';
export default {
  data () {
    return {
      scrollPosition: 0,
    }
  },
  components: {
    Header
  },
  methods: {
    scrollElemt(){
      console.log("滚动"+document.getElementById('blogBox').scrollTop)
      console.log("滚动"+document.getElementById('blogBox').scrollHeight)
    },
    handleScroll(){
      let scrollTop = document.getElementById('blogBox').scrollTop;
      let scrollDistance = scrollTop - this.scrollPosition;
      this.scrollPosition = scrollTop;
      if(scrollTop==0){
        document.getElementById('blogHeader').classList="blogHeader blogHeader-unfixed";
      }else if(scrollTop>0){
        document.getElementById('blogHeader').classList="blogHeader blogHeader-fixed";
        if(scrollDistance<0){
          document.getElementById('blogHeader').classList="blogHeader blogHeader-fixed blogHeader-fixed-show ";
        }else{
          document.getElementById('blogHeader').classList="blogHeader blogHeader-fixed";
        }
      }
    }
  },

}
</script>

<style scoped>
@import url("../../styles/icon.css");
@import url("../../styles/blog.css");

</style>