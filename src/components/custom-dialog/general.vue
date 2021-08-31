<template>
  <div class="custom-cover" id="setMenuGeneral" data-dialog="customCover">
    <div class="custom-dialog">
      <i
        class="iconfont icon-delete dialog-delete"
        @click="closeDialog($event)"
        :data-dialog="'setMenuGeneral'"
      ></i>
      <span class="title">基础设置</span>
      <div class="main">
        <!-- 搜索栏与导航相关设置 -->

        <div class="subTitle">搜索和导航</div>
        <ul class="setGroup">
          <li class="setGroupItem">
            <span class="setCaption">自动清空搜索栏</span>
            <ScrollSwitch
              :value="generalSet.autoEmptyInput"
              @change="changeSetting($event, 'autoEmptyInput')"
            />
          </li>
          <li class="setGroupItem">
            <span class="setCaption">搜索记录</span>
            <ScrollSwitch
              :value="generalSet.searchHistory"
              @change="changeSetting($event, 'searchHistory')"
            />
          </li>
        </ul>

        <!-- 时钟相关设置 -->
        <div class="subTitle">时钟</div>
        <ul class="setGroup">
          <li class="setGroupItem">
            <span class="setCaption">时间显示闪烁</span>
            <ScrollSwitch
              :value="generalSet.timeDisplayFlicker"
              @change="changeSetting($event, 'timeDisplayFlicker')"
            />
          </li>
          <li class="setGroupItem">
            <span class="setCaption">时间显示日期</span>
            <ScrollSwitch
              :value="generalSet.timeShowDate"
              @change="changeSetting($event, 'timeShowDate')"
            />
          </li>
        </ul>

        <div class="subTitle">初始化</div>
        <ul class="setGroup">
          <li class="setGroupItem">
            <span class="setCaption">初始化加载时自动聚焦到搜索栏</span>
            <ScrollSwitch
              :value="generalSet.initFocusInput"
              @change="changeSetting($event, 'initFocusInput')"
            />
          </li>
          <li class="setGroupItem">
            <span class="setCaption">登陆有显示问候</span>
            <ScrollSwitch
              :value="generalSet.loginGreet"
              @change="changeSetting($event, 'loginGreet')"
            />
          </li>
        </ul>

        <div class="subTitle">性能</div>
        <ul class="setGroup">
          <li class="setGroupItem">
            <span class="setCaption">流畅模式</span>
            <ScrollSwitch
              :value="generalSet.flowPattern"
              @change="changeSetting($event, 'flowPattern')"
            />
          </li>
          <li class="setGroupItem">
            <span class="setCaption">减弱动态效果</span>
            <ScrollSwitch
              :value="generalSet.weakDynamic"
              @change="changeSetting($event, 'weakDynamic')"
            />
          </li>
          <li class="setGroupItem">
            <span class="setCaption">为遮罩层应用毛玻璃效果</span>
            <ScrollSwitch
              :value="generalSet.applyFrostedGlass"
              @change="changeSetting($event, 'applyFrostedGlass')"
            />
          </li>
        </ul>

        <div class="subTitle">颜色</div>
        <ul class="setGroup">
          <li class="setGroupItem">
            <span class="setCaption">主题颜色</span>
            <div class="colorBox">
              <span
                :class="
                  'colorBoxItem ' +
                    (generalSet.themeColor === item
                      ? 'colorBoxItemChecked'
                      : '')
                "
                v-for="(item, i) in colorList"
                :key="i"
                :id="item"
                @click="changeThemeColor(item)"
              ></span>
            </div>
          </li>
          <li class="setGroupItem">
            <span class="setCaption">深色主题</span>
            <ScrollSwitch
              :value="generalSet.darkTheme"
              @change="changeSetting($event, 'darkTheme')"
            />
          </li>
        </ul>

        <!-- <div class="subTitle">样式</div>
        <ul class="setGroup">
          <li class="setGroupItem">
            <span class="setCaption">启用自定义样式</span>
            <ScrollSwitch :value="generalSet.isCustomStyle" @change="changeSetting"/>
          </li>
          <li class="setGroupItem">
            <span class="setCaption">窗口透明度</span>
            <div class="regulation">
              <span>{{slidervalue}}</span>
              <Slider :value="slidervalue" />
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
            <ScrollSwitch
              :value="generalSet.synchronization"
              @change="changeSetting($event, 'synchronization')"
            />
          </li>
          <li class="setGroupItem">
            <span class="setCaption">名言推荐</span>
            <ScrollSwitch
              :value="generalSet.wisdom"
              @change="changeSetting($event, 'wisdom')"
            />
          </li>
          <li class="setGroupItem">
            <span class="setCaption">天气</span>
            <span class="setComment"
              >开启后，若没有反应，请刷新始页方可生效。</span
            >
            <ScrollSwitch
              :value="generalSet.weather"
              @change="changeSetting($event, 'weather')"
            />
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
import { mapState } from "vuex";
import ScrollSwitch from "@/components/scroll-button";
import Slider from "@/components/slider";
import Select from "@/components/select";

export default {
  props: ["setGroup"],
  data() {
    return {
      slidervalue: 0,
      colorList: ["green", "cyanblue", "purple", "orange", "yellow"]
    };
  },
  components: {
    ScrollSwitch,
    Slider,
    Select
  },
  computed: {
    ...mapState(["generalSet"])
  },
  methods: {
    closeDialog(e) {
      let dialog = e.target.dataset.dialog;
      document.getElementById(dialog).style = "opacity: 0;visibility: hidden;";
    },
    // 改变主题颜色
    changeThemeColor(value) {
      const param = {
        indexName: "themeColor",
        indexValue: value
      };
      this.$store.commit("alterGeneralSet", param);
    },
    // 将改变的值传回到最外层父级中
    changeSetting(value, name) {
      // this.$emit("changeSet", this.setGroup)
      //
      const param = {
        indexName: name,
        indexValue: value
      };
      this.$store.commit("alterGeneralSet", param);
    },
    resetSetting() {
      let defaultGeneralSet = {
        // 主题颜色
        themeColor: "green",
        // 自动清空搜索框
        autoEmptyInput: true,
        // 搜索记录
        searchHistory: true,
        // 时间显示闪烁
        timeDisplayFlicker: false,
        // 时间显示日期
        timeShowDate: true,
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
        dialogShowAni: "default",
        // 窗口消失动画
        dialogGoAni: "default",
        // 字体大小
        fontSize: "default",
        // 字体样式
        fontStyle: "default",
        // 背景图片偏好
        perferenceBg: "static1",
        // 开始提示框
        startPopups: false,
        // 自定义搜索引擎设置
        customEngUrl: ""
      };
      let isconfirm = confirm("你确定要清除本地缓存并将设置项还原");
      // console.log(isconfirm);
      if (isconfirm) {
        // 重置
        this.$store.commit("restoreGeneralSet", defaultGeneralSet);
      }
    }
  }
};
</script>

<style lang="scss" scoped>
@import "../../styles/components-styles/custom-dialog.scss";

.regulation {
  width: 100%;
}
</style>
