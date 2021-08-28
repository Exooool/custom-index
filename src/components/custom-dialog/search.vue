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
          <!-- urlItemMask样式表示当前引擎被选择时的li元素的样式 -->
          <li
            :class="'searchEngGroupItem ' + (item1.engUrl == engUrl ? 'urlItemMask':'')"
            v-for="(item1, i) in searchEngList[0]"
            :key="i"
            @click.stop="alterEngUrl(item1.engUrl)"
            :title="item1.engUrl"
          >
            <!-- 搜索引擎名字 -->
            <span class="engName">{{ item1.engName }}</span>
          </li>
        </ul>

        <span class="subTitle">次搜索引擎</span>
        <ul class="searchEngGroup">
          <li
            :class="'searchEngGroupItem ' + (item2.engUrl == engUrl ? 'urlItemMask':'')"
            v-for="(item2, j) in searchEngList[1]"
            :key="j"
            @click="alterEngUrl(item2.engUrl)"
            :title="item2.engUrl"
          >
            <!-- 搜索引擎名字 -->
            <span class="engName">{{ item2.engName }}</span>
          </li>
        </ul>

        <span class="subTitle">自定义搜索引擎</span>
        <ul class="searchEngGroup">
          <li class="searchEngGroupItem customSearch" @click.stop="unfoldInput()">
            <span class="engName">自定义</span>
            <div class="customEngUrlInput" ref="customEngUrlInput">
              <input placeholder="请在这里输入搜索引擎地址" @input="customUrlChange($event)"/>
            </div>
          </li>
        </ul>
      </div>
    </div>
  </div>
</template>

<script>
import { mapState, mapMutations } from 'vuex'
import ScrollSwitch from '@/components/scroll-button'
export default {
  data () {
    return {
      searchEngList: [
        [{ engName: 'baidu', engUrl: 'https://www.baidu.com/s?ie=utf-8&word=' },
        { engName: 'bing', engUrl: 'https://cn.bing.com/search?q=' },
        { engName: 'google', engUrl: 'https://www.google.cn/search?q=' }],
        [{ engName: '360', engUrl: 'https://www.so.com/s?q=' },
        { engName: 'sougou', engUrl: 'https://www.sogou.com/web?query=' }]
      ],
      
    }
  },
  computed: {
    ...mapState(['engUrl'])
  },
  components: {
    ScrollSwitch
  },
  methods: {
    ...mapMutations(['alterEngUrl']),
    closeDialog (e) {
      let dialog = e.target.dataset.dialog;
      document.getElementById(dialog).style = "opacity: 0;visibility: hidden;";
    },
    // 展开自定义搜索引擎输入框
    unfoldInput(){
      this.$refs.customEngUrlInput.classList.add("unfold");
    },
    // 自定义引擎输入框change函数
    customUrlChange(e){
      let engUrl = e.target.value;
      // console.log(engUrl);
      // 网址检验(正则表达式)
      var webRegex=/(http|ftp|https):\/\/[\w\-_]+(\.[\w\-_]+)+([\w\-\.,@?^=%&amp;:/~\+#]*[\w\-\@?^=%&amp;/~\+#])?/;
      // console.log(webRegex.test(engUrl));
      if(!webRegex.test(engUrl)){
        this.$refs.customEngUrlInput.style="background-color:#FF4B2B";
      }else{
        this.$refs.customEngUrlInput.style="background-color:#70c000";
        this.alterEngUrl(engUrl);
        
      }
    }
  }
}
</script>

<style lang="scss" scoped>
@import "../../styles/components-styles/custom-dialog.scss";
.searchTrueIcon {
  color: rgb(1, 170, 1);
  position: absolute;
  right: 20px;
}
</style>