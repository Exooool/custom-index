<template>
  <div class="custom-cover" id="setMenuGeneral" data-dialog="customCover" >
    <div class="custom-dialog" :style="'background-color:'+themeColor.bg">
      <i
        class="iconfont icon-delete dialog-delete"
        @click="closeDialog($event)"
        :data-dialog="'setMenuGeneral'"
      ></i>
      <span class="title">基础设置</span>
      <div class="main">
        <div class="subTitle">搜索和导航</div>
        <ul class="setGroup">
          <li class="setGroupItem">
            <span class="setCaption">自动清空搜索栏</span>
            <ScrollSwitch v-model="setGroup.autoEmptyInput" @click="changeSetting" />
          </li>
          <li class="setGroupItem">
            <span class="setCaption">搜索记录</span>
            <ScrollSwitch v-model="setGroup.searchHistory" @click="changeSetting"/>
          </li>
          <li class="setGroupItem">
            <span class="setCaption">时间显示闪烁</span>
            <ScrollSwitch v-model="setGroup.timeDisplayFlicker" @click="changeSetting"/>
          </li>
        </ul>

        <div class="subTitle">初始化</div>
        <ul class="setGroup">
          <li class="setGroupItem">
            <span class="setCaption">初始化加载时自动聚焦到搜索栏</span>
            <ScrollSwitch v-model="setGroup.initFocusInput" @click="changeSetting"/>
          </li>
          <li class="setGroupItem">
            <span class="setCaption">登陆有显示问候</span> <ScrollSwitch v-model="setGroup.loginGreet" @click="changeSetting"/>
          </li>
        </ul>

        <div class="subTitle">性能</div>
        <ul class="setGroup">
          <li class="setGroupItem">
            <span class="setCaption">流畅模式</span>
            <ScrollSwitch v-model="setGroup.flowPattern" @click="changeSetting()"/>
          </li>
          <li class="setGroupItem">
            <span class="setCaption">减弱动态效果</span>
            <ScrollSwitch v-model="setGroup.weakDynamic" @click="changeSetting()"/>
          </li>
          <li class="setGroupItem">
            <span class="setCaption">为遮罩层应用毛玻璃效果</span>
            <ScrollSwitch v-model="setGroup.applyFrostedGlass" @click="changeSetting()"/>
          </li>
        </ul>

        <div class="subTitle">颜色</div>
        <ul class="setGroup">
          <li class="setGroupItem">
            <span class="setCaption">主题颜色</span>
            <div class="colorBox">
              <span class="colorBoxItem colorBoxItemChecked" v-for="(item,i) in colorList" :key="i" :style="'background-color:'+item+';box-shadow: '+ item +' 0 0 7px;'"></span>
            </div>
          </li>
          <li class="setGroupItem">
            <span class="setCaption">深色主题</span>
            <ScrollSwitch v-model="setGroup.darkTheme" @click="changeSetting()"/>
          </li>
        </ul>

        <!-- <div class="subTitle">样式</div>
        <ul class="setGroup">
          <li class="setGroupItem">
            <span class="setCaption">启用自定义样式</span>
            <ScrollSwitch v-model="setGroup.isCustomStyle" @click="changeSetting()"/>
          </li>
          <li class="setGroupItem">
            <span class="setCaption">窗口透明度</span>
            <div class="regulation">
              <span>{{slidervalue}}</span>
              <Slider v-model="slidervalue" />
            </div>
          </li>
          <li class="setGroupItem">
            <span class="setCaption">窗口毛玻璃效果</span>
          </li>
          <li class="setGroupItem">
            <span class="setCaption">窗口显示动画</span>
            <Select />
          </li>
          <li class="setGroupItem">
            <span class="setCaption">窗口消失动画</span>
            <Select />
          </li>
          <li class="setGroupItem">
            <span class="setCaption">字体大小调节</span>
            <Select />
          </li>
          <li class="setGroupItem">
            <span class="setCaption">字体样式</span>
            <Select />
          </li>
        </ul> -->

        <div class="subTitle">通用</div>
        <ul class="setGroup">
          <li class="setGroupItem">
            <span class="setCaption">同步设置</span>
            <ScrollSwitch v-model="setGroup.synchronization" @click="changeSetting()"/>
          </li>
          <li class="setGroupItem">
            <span class="setCaption">名言推荐</span>
            <ScrollSwitch v-model="setGroup.wisdom" @click="changeSetting()"/>
          </li>
          <li class="setGroupItem">
            <span class="setCaption">天气</span>
            <span class="setComment">开启后，若没有反应，请刷新始页方可生效。</span>
            <ScrollSwitch v-model="setGroup.weather" @click="changeSetting()"/>
          </li>
        </ul>

        <div class="resetBox">
          <span class="setCaption">重置设置</span>
          <span class="setComment">清除本地缓存并将设置项还原为默认</span>
          <button class="resetBtn" @click="resetSetting()">重置</button>
        </div>
      </div>
    </div>
  </div>
</template>

<script>
import ScrollSwitch from '@/components/scroll-button'
import Slider from '@/components/slider'
import Select from '@/components/select'

export default {
  props: ['setGroup','themeColor'],
  data () {
    return {
      slidervalue: 0,
      colorList: ['var(--theme-color-green)','var(--theme-color-cyanblue)','var(--theme-color-purple)','var(--theme-color-orange)','var(--theme-color-yellow)']
    }
  },
  components: {
    ScrollSwitch,
    Slider,
    Select
  },
  methods: {
    closeDialog (e) {
      let dialog = e.target.dataset.dialog
      document.getElementById(dialog).style = "opacity: 0;visibility: hidden;"
    },
    // 将改变的值传回到最外层父级中
    changeSetting(){
      this.$emit("changeSet", this.setGroup)
    },
    resetSetting(){
      let defaultGeneralSet = {
        // 自动清空搜索框
        autoEmptyInput: true,
        // 搜索记录
        searchHistory: true,
        // 时间显示闪烁
        timeDisplayFlicker: false,
        // 初始化聚焦输入框
        initFocusInput: true,
        // 登录问候
        loginGreet: false,
        // 流畅模式
        flowPattern: false,
        // 减弱动效
        weakDynamic: false,
        // 应用毛玻璃效果
        applyFrostedGlass: false,
        // 暗色主题
        darkTheme: false,
        // 同步设置
        synchronization: true,
        // 名言推荐
        wisdom: false,
        // 天气
        weather: true,
        // 自定义样式
        isCustomStyle: false,
        // 窗口透明度
        dialogOpacity: 0,
        // 窗口毛玻璃
        dialogBlur: false,
        // 窗口出现动画
        dialogShowAni: 'default',
        // 窗口消失动画
        dialogGoAni: 'default',
        // 字体大小
        fontSize: 'default',
        // 字体样式
        fontStyle: 'default'
      };
      let isconfirm = confirm("你确定要清除本地缓存并将设置项还原");
      console.log(isconfirm);
      if(isconfirm){
        // 将本地缓存设为默认
        localStorage.setItem("generalSet", JSON.stringify(defaultGeneralSet));
        // 更改页面变量为默认
        this.$emit("changeSet", defaultGeneralSet);
      }
      
    }
  }
}
</script>

<style>
@import url('../../styles/components-styles/custom-dialog.css');
.regulation{
  width: 100%;
}
</style>