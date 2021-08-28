<template>
  <!-- @click.right监听右键点击事件并切换appList和custom-input -->
  <div
    class="custom-box"
    @click="mouseclick($event)"
    @click.right="collectListSwitch($event)"
  >
    <video
      ref="dynamicWallPaper"
      class="dynamicWallPaper"
      autoplay="autoplay"
      loop="loop"
      muted="muted"
    ></video>

    <!-- <button class="testbutton" @click="showGlobldata()">testButtonClick</button> -->
    <!-- 背景图片 -->
    <!-- <img class="bgImg" id="staticWallPaper" :src="require('@/' + bgUrl)" /> -->
    <img class="bgImg" ref="staticWallPaper" />
    <div :class="'main-mask ' + (collectBox ? 'main-mask-visible' : '')"></div>

    <div class="custom-main">
      <!-- 时钟 -->
      <timeClock />

      <!-- 自定义输入框 -->
      <customInput :isvisible="collectBox ? false : true" />

      <!-- app列表 -->
      <appList :isvisible="collectBox ? true : false" />
    </div>

    <div :class="'custom-btnbox ' + (collectBox ? 'box-visible' : '')">
      <!-- 用户按钮 -->
      <!-- <i
        class="iconfont icon-user userbtn"
        @click="customMenuSwitch($event)"
        id="customUserBtn"
      ></i>-->
      <!-- 设置按钮 -->
      <i
        class="iconfont icon-Setting settingbtn"
        @click="customMenuSwitch($event)"
        id="customSettingBtn"
      ></i>
    </div>

    <!-- 自定义弹窗 -->
    <!-- 通过设置 -->
    <General :themeColor="themeColor" />
    <!-- 搜索引擎设置 -->
    <Search />
    <!-- 壁纸设置 -->
    <BG :current="perferenceBg" @changUrl="alterBgUrl($event)" />
    <!-- 反馈 -->
    <FeedBack />

    <weather :isweather="isWeather" />

    <!-- 自定义菜单 -->
    <div
      :class="'customUserMenu ' + (customUserMenu == 0 ? '' : 'box-visible')"
      id="customUserMenu"
    >
      <ul class="userMenuList">
        <li class="userMenuItem-userInfo">
          <img class="userImg" />
          <span class="userName">{{ loginUser }}</span>
        </li>

        <router-link class="userMenuItem" :to="{ name: 'login' }"
          >账号管理</router-link
        >

        <li class="userMenuItem" @click="logout">退出登录</li>
      </ul>
    </div>

    <div
      :class="
        'customSettingMenu ' + (customSettingMenu == 0 ? '' : 'box-visible')
      "
      id="customSettingMenu"
    >
      <ul class="settingMenuList">
        <li
          class="settingMenuItem"
          :data-dialog="'setMenuGeneral'"
          @click="menuJump($event)"
        >
          通用设置
        </li>
        <li
          class="settingMenuItem"
          :data-dialog="'setMenuSearchEng'"
          @click="menuJump($event)"
        >
          搜索引擎设置
        </li>
        <li
          class="settingMenuItem"
          :data-dialog="'setMenuBg'"
          @click="menuJump($event)"
        >
          背景图片设置
        </li>
        <li
          class="settingMenuItem"
          :data-dialog="'setMenuFeedback'"
          @click="menuJump($event)"
        >
          反馈
        </li>
      </ul>
    </div>

    <!-- 弹出层 -->
    <popups />

    <!-- todoList -->
    <!-- <todoList /> -->

    <footer class="indexFooter">
      <a
        class="links"
        target="_blank"
        href="https://www.beian.gov.cn/portal/registerSystemInfo?recordcode=44049102496715"
      >
        <img src="../../assets/beian.png" style="float: left" />
        <p>粤公网安备 44049102496715号</p>
      </a>
      <a class="links" target="_blank" href="https://beian.miit.gov.cn/"
        >渝ICP备2021002745号</a
      >
    </footer>
  </div>
</template>

<script>
// import axios from 'axios'
import { mapGetters, mapState } from "vuex";
import { BG, FeedBack, General, Search } from "@/components/custom-dialog";
import appList from "@/components/appList";
import timeClock from "@/components/time-clock";
import customInput from "@/components/custom-input";
import weather from "@/components/weather";
import popups from "@/components/popups";
import todoList from "@/components/todoList";

export default {
  data() {
    return {
      themeColor: {
        bg: "white",
        ft: "black",
        sbg: "rgb(233, 233, 233)"
      },
      collectBox: false,
      isClick: true,
      // bgUrl: 'assets/custom-img/pexelsImg/pexels3.jpg',
      collectswitch: 0,
      customUserMenu: 0,
      customSettingMenu: 0,
      collectListHeight: "150px",
      // 登录名
      loginUser: null
    };
  },
  components: {
    BG,
    FeedBack,
    General,
    Search,
    appList,
    customInput,
    weather,
    timeClock,
    popups,
    todoList
  },
  computed: {
    ...mapGetters(["perferenceBg", "isWeather"]),
    ...mapState(["defaultImgList", "dynamicImgList"])
  },
  // watch: {
  //   generalSet: {
  //     deep: true,
  //     handler: function(val) {
  //       // console.log('generalSet的值发生改变')
  //       // console.log(val)
  //       localStorage.setItem('generalSet', JSON.stringify(this.generalSet))
  //       // 数值改变执行同步函数
  //       // this.syncSetting()
  //     }
  //   }
  // },
  methods: {
    // 测试
    // mt(e) {
    //   console.log(e);
    // },

    // 登出
    logout() {
      console.log("退出登录");
      window.sessionStorage.removeItem("loginUser");
    },

    // 子组件传递父组件值
    alterBgUrl(value) {
      let staticimg = this.$refs.staticWallPaper;
      let dynamicvideo = this.$refs.dynamicWallPaper;
      // 判断传入的数据是静态壁纸、动态壁纸还是自定义壁纸
      if (value.indexOf("static") != -1) {
        let order = value.substr(value.length - 1);
        staticimg.src = require("@/" + this.defaultImgList[order].imgsrc);
        staticimg.onload = function() {
          dynamicvideo.style = "display:none";
          staticimg.style = "display:block";
        };
      } else if (value.indexOf("cus") != -1) {
        staticimg.src = localStorage.getItem("cusBg");
        staticimg.onload = function() {
          dynamicvideo.style = "display:none";
          staticimg.style = "display:block";
        };
      } else {
        let order = value.substr(value.length - 1);
        dynamicvideo.src = require("@/" +
          this.dynamicImgList[order] +
          "/video.mp4");
        // 设置监听 当视频加载完成就播放
        dynamicvideo.addEventListener("canplay", function() {
          dynamicvideo.style = "display:block";
          staticimg.style = "display:none";
        });
      }
      // 通过vuex的mutations方法设置背景图片
      const param = {
        indexName: "perferenceBg",
        indexValue: value
      };
      this.$store.commit("alterGeneralSet", param);
    },
    engUrlCompValue(value) {
      this.engUrl = value;
    },

    appendZero(obj) {
      if (obj < 10) {
        return "0" + obj;
      } else {
        return obj;
      }
    },
    customMenuSwitch(e) {
      let id = e.target.id;
      // console.log(id)
      if (id == "customSettingBtn") {
        if (this.customSettingMenu == 0) {
          this.customSettingMenu = 1;
          this.customUserMenu = 0;
        } else {
          this.customSettingMenu = 0;
        }
      } else {
        if (this.customUserMenu == 0) {
          this.customUserMenu = 1;
          this.customSettingMenu = 0;
        } else {
          this.customUserMenu = 0;
        }
      }
    },
    menuJump(e) {
      // 防止过快点击
      if (this.isClick) {
        this.isClick = false;
        // console.log(e.target.dataset.dialog);
        let dialog = e.target.dataset.dialog;
        document.getElementById(dialog).style =
          "opacity: 1;visibility: visible;";
        let _this = this;
        setTimeout(function() {
          _this.isClick = true;
        }, 500);
      }
    },
    mouseclick(e) {
      let thisId = e.target.id;
      if (
        thisId != "customUserMenu" &&
        thisId != "customSettingMenu" &&
        thisId != "customSettingBtn" &&
        thisId != "customUserBtn"
      ) {
        this.customUserMenu = 0;
        this.customSettingMenu = 0;
      }
    },
    collectListSwitch(e) {
      // console.log(e.target.className)
      let temp = e.target.className;
      // console.log('点击右键')
      if (
        this.collectBox == false &&
        (temp == "custom-box" ||
          temp == "collect-list" ||
          temp == "custom-main" ||
          temp == "collect-box")
      ) {
        this.collectBox = true;
        this.customSettingMenu = 0;
        this.customUserMenu = 0;
      } else if (
        this.collectBox == true &&
        (temp == "custom-box" ||
          temp == "collect-list" ||
          temp == "custom-main" ||
          temp == "collect-box")
      ) {
        this.collectBox = false;
        this.customSettingMenu = 0;
        this.customUserMenu = 0;
      }
    }
    // 通过token用户设置
    // getPreferenceSet() {
    //   let _this = this
    //   let setUrl = 'http://127.0.0.1:88/setting'
    //   this.loginUser = window.sessionStorage.loginUser
    //   let token = window.sessionStorage.token
    //   console.log(window.sessionStorage.token)
    //   this.$axios
    //     .get(setUrl, {
    //       headers: {
    //         'Content-Type': 'application/json', //设置请求头请求格式为JSON
    //         token: token //设置token
    //       }
    //     })
    //     .then(function(res) {
    //       console.log(res)
    //       if (res.data.code == 1) {
    //         // 显示获取的系统设置
    //         console.log('engineSet:' + res.data.data.engineSet)
    //         console.log('backgroundSet:' + res.data.data.backgroundSet)
    //         console.log('数据库获取数据：')
    //         console.log(JSON.parse(res.data.data.generalSet))
    //         _this.generalSet = JSON.parse(res.data.data.generalSet)
    //       } else {
    //         console.log(res.data.msg)
    //         window.sessionStorage.token = null
    //         _this.$router.push('login')
    //       }
    //     })
    // },
    // 同步设置
    // syncSetting() {
    //   let _this = this
    //   let setUrl = 'http://127.0.0.1:88/syncSetting'
    //   this.loginUser = window.sessionStorage.loginUser
    //   let token = window.sessionStorage.token
    //   console.log(window.sessionStorage.token)
    //   this.$axios.get(setUrl, {
    //     headers: {
    //       'Content-Type': 'application/json', //设置请求头请求格式为JSON
    //       token: token //设置token
    //     },
    //     params: {
    //       generalSet: _this.generalSet
    //     }
    //   })
    // .then(function(res){
    //   console.log("engineSet:"+res.data.engineSet)
    //   console.log("backgroundSet:"+res.data.backgroundSet)
    //   console.log('数据库获取数据：')
    //   console.log(JSON.parse(res.data.generalSet))

    //  _this.generalSet = JSON.parse(res.data.generalSet)
    // })
    // },
  },
  created() {
    // 通过token获取用户设置
    // if(window.sessionStorage.loginUser){
    //   this.getPreferenceSet();
    // }
  },
  mounted() {
    // 第一次加载页面，如果没有缓存就设置缓存，若不是第一次启动则调用localStorage的数据
    if (localStorage.getItem("generalSet") === null) {
      console.log("初始化localStorage设置");
      this.$store.commit("initLocalSet");
    } else {
      console.log("检测到本地localStorage设置，使用localStorage设置");
      this.$store.commit("startLocalSet");

      // console.log(data)
    }
    this.alterBgUrl(this.perferenceBg);
  }
};
</script>

<style lang="scss" scoped>
@import "../../styles/icon.css";
@import "../../styles/custom-index.scss";
</style>
