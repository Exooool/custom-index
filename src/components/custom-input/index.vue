<template>
  <div :class="'custom-input-box ' + (isvisible ? 'box-visible':'')">
    <input
      placeholder="Search"
      class="custom-input"
      type="text"
      id="customInput"
      @keydown.enter="searchEng()"
      v-model="inputValue"
      ref="input"
      @focus="changeTipsBox('show')"
      @blur="changeTipsBox('close')"
    />

    <a @click="searchEng" class="iconfont icon-search"></a>

    <div
      class="inputTipsBox" ref="tipsBox" style="display:none;opacity: 0;" 
    >
      <span
        class="tipsItem"
        v-for="(key, m) in (aiTipsList.length==0 ? searchHistory:aiTipsList)"
        :key="m"
        @click="rectTo(key)"
        
        >{{ key }}</span
      >
      <span :class="'clearHistory'" v-if="aiTipsList.length==0&&searchHistory.length>0" @click="clearHistory()">清空搜索记录</span>
    </div>
  </div>
</template>

<script>
import { mapGetters } from 'vuex'
export default {
  props: ['isvisible'],
  data () {
    return {
       // 输入框值
      inputValue: '',
      // 智能提示返回值
      aiTipsList: [],
      searchHistory: [],
    }
  },
  watch: {
    inputValue: {
      handler: function (value) {
        this.inputAITips()
      }
    }
  },
  computed: {
    ...mapGetters(['isfocus','engine','autoEmptyInput','issearchHistory'])
  },
  methods: {
    // 搜索引擎
    searchEng () {
      let value = this.inputValue
      let engine = this.engine
      window.open(engine + value)
      if(value!=""){
        if(localStorage.getItem("searchHistory")==null){
          let array = []
          array.push(value)
          localStorage.setItem("searchHistory",JSON.stringify(array))
          console.log(array)
        }else{
          let array = JSON.parse(localStorage.getItem("searchHistory"))
          array.push(value)
          localStorage.setItem("searchHistory",JSON.stringify(array))
          console.log(array)
        }
      }
      
      if (this.autoEmptyInput == true) {
        this.inputValue = ""
      }

      // 重新获取搜索历史数据
      this.accessHistory();

    },
    // 输入框智能提示
    inputAITips () {
      let _this = this
      var content = _this.inputValue;
      if (content != "") {
        var sugurl = "https://suggestion.baidu.com/su?wd=#content#&cb=window.baidu.sug";

        sugurl = sugurl.replace("#content#", content);

        //定义回调函数
        window.baidu = {
          sug: function (json) {
            console.log(json.s)
            _this.aiTipsList = json.s
          }
        }

        //动态添加JS脚本
        var script = document.createElement("script");
        script.src = sugurl;
        document.getElementsByTagName("head")[0].appendChild(script);
      }else{
        _this.aiTipsList = []
      }


    },
    //智能搜索跳转
    rectTo (word) {
      let engine = this.engine;
      window.open(engine + word);
    },
    changeTipsBox(value){
      let _this = this;
      if(_this.issearchHistory){
        if(value=='show'){
          _this.$refs.tipsBox.style="display:flex;opacity: 0;"
          setTimeout(function(){
            _this.$refs.tipsBox.style="display:flex;opacity: 1;"
          },50)
        
        }else{
          this.$refs.tipsBox.style="display:flex;opacity: 0;"
          setTimeout(function(){
            _this.$refs.tipsBox.style="display:none;opacity: 0;"
          },500)
        }
      }
    },
    clearHistory(){
      localStorage.setItem("searchHistory",JSON.stringify([]))
      this.accessHistory();
    },
    accessHistory(){
      this.searchHistory = JSON.parse(localStorage.getItem("searchHistory"));
    }
  },
  mounted () {
    let _this = this;
    if(this.issearchHistory){
      if(localStorage.getItem("searchHistory")!=null){
        this.accessHistory();
      }
    }
    // 右键禁止弹出菜单
    if (_this.isfocus == true) {
      _this.$refs.input.focus();
    }
    
  }
}
</script>

<style lang="scss" scoped>
.custom-input-box {
  position: absolute;
  top: 100px;
  display: inline-block;
  width: 100%;
  transition: all 0.3s ease-in-out;
  transform: scale(0);
  opacity: 0;
}

.custom-input-box a{
  position: absolute;
  top: 14px;
  left: 50%;
  opacity: 0;
  transition: all .15s ease-in-out;
  transform: translate(0px);
  cursor: pointer;
}

.custom-input {
  position: absolute;
  background-color: $bg-w-pure;
  color: $bg-b-pure;
  border-radius: 5px;
  font-size: 14px;
  width: 220px;
  max-width: 75%;
  height: 45px;
  left: 50%;
  transform: translateX(-50%);
  transition: all 0.15s ease-in-out;
  box-shadow: rgba(0, 0, 0, .2) 0 0 10px;
  text-align: center;
  box-sizing: border-box;
  padding: 0 45px;
}

/* 输入智能提示 */

.inputTipsBox{
  position: absolute;
  background-color: rgba(255, 255, 255, 0.25);
  backdrop-filter:  blur(15px);
  top: 60px;
  left: 50%;
  max-height: 40vh;
  overflow-y: scroll;
  transform: translateX(-50%);
  border-radius: 5px;
  flex-direction: column;
  transition: all 0.3s ease-in-out;
  opacity: 0;
  height: auto;
  display: none;
}

/* 设置inputTipsBox的滚动条样式 */
.inputTipsBox::-webkit-scrollbar{
  width: 5px;
}

.inputTipsBox::-webkit-scrollbar-thumb{
  background-color: rgba(204, 204, 204, 0.6);
}


.inputTipsBox span{
  max-width: 80vw;
  width: 490px;
  padding: 8px 20px;
  font-size: 14px;
  box-sizing: border-box;
}

.inputTipsBox .searchHistory{
  display: flex;
  flex-direction: column;
}

.inputTipsBox span:hover{
  background-color: rgba(128, 128, 128, 0.2);
  cursor: pointer;
}


/* input placeholder的样式及动效改变 */
.custom-input::-webkit-input-placeholder{
  color: grey;
  transition: all 0.3s ease-in-out;
  opacity: 1;
}

.custom-input-box:hover .custom-input::-webkit-input-placeholder{
  opacity: 0;
}

.custom-input:hover::-webkit-input-placeholder,
.custom-input:focus::-webkit-input-placeholder{
  opacity: 0;
}

.custom-input-box:hover .custom-input,
.custom-input:focus {
  background-color: $bg-w-pure;
  backdrop-filter:  blur(0px);
  /* box-shadow: 0 4px 8px 0 rgb(255, 255, 255, 0.5); */
  width: 480px;
}

.custom-input-box:hover a,.custom-input:focus + a{
  visibility: visible;
  opacity: 1;
  transform: translate(200px);
}
/* 盒子显示通用样式 */
.box-visible {
  opacity: 1;
  transform: scale(1);
  visibility: visible;
}

@media screen and (max-width: 600px){
  /* 输入框的左右内边距随屏幕宽度而减小 */
  .custom-input{
    padding: 0 35px;
  }
  .inputTipsBox span{
    width: 400px;
  }
  .custom-input-box:hover a,.custom-input:focus + a{
    transform: translate(30vw);
  }
}

@media screen and (max-width: 500px){
  .custom-input{
    padding: 0 25px;
  }
}

@media screen and (max-width: 450px){

}

@media screen and (max-width: 350px){

}
</style>