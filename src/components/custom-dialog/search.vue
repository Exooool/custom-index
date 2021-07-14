<template>
  <div class="custom-cover" id="setMenuSearchEng" data-dialog="customCover">
    <div class="custom-dialog">
      <i
        class="iconfont icon-delete dialog-delete"
        @click="closeDialog($event)"
        :data-dialog="'setMenuSearchEng'"
      ></i>
      <span class="title">搜索引擎偏好</span>
      <div class="main">
        <span class="subTitle">主搜索引擎</span>
        <ul class="searchEngGroup">
          <li
            class="searchEngGroupItem"
            v-for="(item1, i) in searchEngList[0]"
            :key="i"
            @click="engUrlChange($event)"
            :data-url="item1.engUrl"
          >
            <span class="engName">{{ item1.engName }}</span>
            <span class="engUrl">{{ item1.engUrl }}</span>
            <i
              class="iconfont icon-true searchTrueIcon"
              :style="(item1.engUrl == selectEngUrl ? '':'display:none')"
            ></i>
          </li>
        </ul>

        <span class="subTitle">次搜索引擎</span>
        <ul class="searchEngGroup">
          <li
            class="searchEngGroupItem"
            v-for="(item2, j) in searchEngList[1]"
            :key="j"
            @click="engUrlChange($event)"
            :data-url="item2.engUrl"
          >
            <span class="engName">{{ item2.engName }}</span>
            <span class="engUrl">{{ item2.engUrl }}</span>
            <i
              class="iconfont icon-true searchTrueIcon"
              :style="(item2.engUrl == selectEngUrl ? '':'display:none')"
            ></i>
          </li>
        </ul>

        <span class="subTitle">自定义搜索引擎</span>
        <ul class="searchEngGroup">
          <li class="searchEngGroupItem">
            <span class="engName">自定义</span>
            <input class="customEngUrl" />
          </li>
        </ul>
      </div>
    </div>
  </div>
</template>

<script>
import ScrollSwitch from '@/components/scroll-button'
export default {
  props: ['selectEngUrl'],
  data () {
    return {
      searchEngList: [
        [{ engName: '百度', engUrl: 'https://www.baidu.com/s?ie=utf-8&word=' },
        { engName: '必应', engUrl: 'https://cn.bing.com/search?q=' },
        { engName: '谷歌', engUrl: 'https://www.google.cn/search?q=' }],
        [{ engName: '360搜索', engUrl: 'https://www.so.com/s?q=' },
        { engName: '搜狗搜索', engUrl: 'https://www.sogou.com/web?query=' }]
      ]
      
    }
  },
  components: {
    ScrollSwitch
  },
  methods: {
    closeDialog (e) {
      let dialog = e.target.dataset.dialog
      document.getElementById(dialog).style = "opacity: 0;visibility: hidden;"
    },
    engUrlChange(e){
      let tempUrl
      if(e.toElement.localName=="li"){
        console.log("改变的变量："+e.target.dataset.url)
        tempUrl = e.target.dataset.url
      }else{
        console.log("改变的变量："+e.target.parentNode.dataset.url)
         tempUrl = e.target.parentNode.dataset.url
      }
      this.$emit("changeEngUrl", tempUrl)

    }
  }
}
</script>

<style>
@import url('../../styles/components-styles/custom-dialog.css');
.searchTrueIcon {
  color: rgb(1, 170, 1);
  position: absolute;
  right: 20px;
}
</style>