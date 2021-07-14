<template>
  <div class="headerWrapper">
    <div class="blogHeader blogHeader-unfixed" id="blogHeader">
      
      <img class="logo" src="../../assets/TB.png" alt="" @click="toHome()">
     

      <div class="mobMenu" >
        <i class="iconfont icon-menu"  @click="showMobMenu()"></i>
      </div>

      <div class="functionBar">
        <router-link to="/blog" class="functionItem functionItem-dark" ><span class="itemInner">首页</span></router-link>
        <router-link to="/blog/article" class="functionItem functionItem-dark" style="animation: slowdown 1.5s;" ><span class="itemInner">文章</span></router-link>
        <router-link to="/blog/about" class="functionItem functionItem-dark" style="animation: slowdown 2s;" ><span class="itemInner">关于</span></router-link>
      </div>
    </div>
    <div class="mobNavBox" ref="mobMenu" :data-switch="'close'">
      <img class="logo" src="../../assets/TB.png" alt="" @click="toHome()">
      <button class="closeBtn"  @click="showMobMenu()">close</button>

      <ul class="mobNav">
        <li class="mobNavItem"><router-link to="/blog" class="itemInner">首页<span class="underline"></span></router-link></li>
        <li class="mobNavItem"><router-link to="/blog/article" class="itemInner">全部文章<span class="underline"></span></router-link></li>
        <li class="mobNavItem"><router-link to="/blog/about"  class="itemInner">关于<span class="underline"></span></router-link></li>
      </ul>
    </div>
  </div>
</template>

<script>
export default {
  props: ['color'],
  data () {
    return {
      
    }
  },
  methods: {
    toHome(){
      console.log(this.$route.path)
      if(this.$route.path=="/blog"){
        document.getElementById('blogBox').scroll({
				  top: 0, 
				  behavior: 'smooth' 
				});
      }else{
        // 不向history栈添加记录
        this.$router.replace({ path: '/blog'})
      }
      
    },
    showMobMenu(){
      console.log(this.$refs.mobMenu.dataset.switch)
      if(this.$refs.mobMenu.dataset.switch=="close"){
        this.$refs.mobMenu.style.display="block"
        this.$refs.mobMenu.dataset.switch="open"
      }else{
        this.$refs.mobMenu.style.display="none"
        this.$refs.mobMenu.dataset.switch="close"
      }
      
    }
  }
}
</script>

<style>
@import url("../../styles/icon.css");
@import url('../../styles/components-styles/blog-header.css');


</style>