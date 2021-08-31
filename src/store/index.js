import Vue from 'vue';
import Vuex from 'vuex';

Vue.use(Vuex);

export default new Vuex.Store({
  state: {
    // 搜索历史
    searchHistory: [],
    // 搜索引擎地址
    engUrl: 'https://www.baidu.com/s?ie=utf-8&word=',
    generalSet: {
      // 主题颜色
      themeColor: 'green',
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
      dialogShowAni: 'default',
      // 窗口消失动画
      dialogGoAni: 'default',
      // 字体大小
      fontSize: 'default',
      // 字体样式
      fontStyle: 'default',
      // 背景图片偏好
      perferenceBg: 'static1',
      // 开始提示框
      startPopups: false,
      // 自定义搜索引擎设置
      customEngUrl: ''
    },
    // app列表
    appList: [
      {
        appName: 'BiliBili',
        appIcon: 'bilibili',
        bgColor: 'white',
        iconColor: '#fb7299',
        href: 'https://www.bilibili.com'
      },
      {
        appName: '微博',
        appIcon: 'weibo',
        bgColor: 'white',
        iconColor: '',
        href: 'https://www.weibo.com'
      },
      {
        appName: '知乎',
        appIcon: 'zhihu',
        bgColor: 'white',
        iconColor: '#0066ff',
        href: 'https://www.zhihu.com/'
      },
      {
        appName: '百度网盘',
        appIcon: 'wangpan',
        bgColor: 'white',
        iconColor: '',
        href: 'https://pan.baidu.com/'
      },
      {
        appName: '网易云音乐',
        appIcon: 'netease',
        bgColor: 'white',
        href: 'https://music.163.com/'
      }
    ],
    // 默认图片列表
    defaultImgList: [
      {
        title: '( pexels: Artem Beliaikin )海岸鸟瞰图附近的大灰色岩石',
        imgsrc: 'assets/custom-img/pexelsImg/pexels1.jpg'
      },
      // { title: '( pexels: Pixabay ) 冬季壮观的天空风景', imgsrc: 'assets/custom-img/pexelsImg/pexels2.jpg' },
      // { title: '( pexels: Francesco Ungaro ) 布莱斯湖上的山的倒影', imgsrc: 'assets/custom-img/pexelsImg/pexels3.jpg' },
      // { title: '( pexels: Simon Berger ) 多云天空下的山脉摄影', imgsrc: 'assets/custom-img/pexelsImg/pexels4.jpg' },
      {
        title: '( unsplash: Zongnan Bao )',
        imgsrc: 'assets/custom-img/unsplash/unsplash1.jpg'
      },
      {
        title: '( unsplash: Luca Bravo )',
        imgsrc: 'assets/custom-img/unsplash/unsplash2.jpg'
      },
      {
        title: '( unsplash: Cristian Grecu )',
        imgsrc: 'assets/custom-img/unsplash/unsplash3.jpg'
      }
    ],
    // 动态图片列表
    dynamicImgList: [
      'assets/videoPaper/pond',
      'assets/videoPaper/your-Name-Night'
    ]
  },
  getters:{
    // custom-input的getter数据
    isfocus: state => state.generalSet.initFocusInput,
    engine: state => state.engUrl,
    autoEmptyInput: state => state.generalSet.autoEmptyInput,
    issearchHistory: state => state.generalSet.searchHistory,
    // time-clock的getter数据
    isFlicker: state => state.generalSet.timeDisplayFlicker,
    isDate: state => state.generalSet.timeShowDate,
    // Bg的getter数据
    perferenceBg: state => state.generalSet.perferenceBg,
    // 天气数据
    isWeather: state => state.generalSet.weather,
    // 深色主题
    darkTheme: state => state.generalSet.darkTheme,
    // 主题颜色输出css变量来改变scss变量的值
    themeColor: state => {
      const color = state.generalSet.themeColor;
      if(color === 'green')  return '#70c000';
      else if(color === 'cyanblue') return '#274a78';
      else if(color === 'purple') return '#b8b5ff';
      else if(color === 'orange') return '#f27121';
      else if(color === 'yellow') return '#ffd900';
    },
  },
  mutations: {
    // 初始化localStorage通用设置
    initLocalSet(state){
      // 设置基础设置JSON格式的缓存
      localStorage.setItem('generalSet', JSON.stringify(state.generalSet));
      localStorage.setItem('appList', JSON.stringify(state.appList));
    },
    // 启用本地缓存
    startLocalSet(state){
      state.generalSet = JSON.parse(localStorage.getItem('generalSet'));
      state.appList = JSON.parse(localStorage.getItem('appList'));
    },
    // 向appList添加Item
    addAppItem(state, param){
      // 通过push方法添加数组元素
      state.appList.push(param);
      // 保存最新appList至localstorage
      localStorage.setItem("appList", JSON.stringify(state.appList));
    },
    // 删除appList指定元素
    removeAppItem(state, index){
      // 删除指定元素
      state.appList.splice(index,1);
      // 保存最新appList至localstorage
      localStorage.setItem("appList", JSON.stringify(state.appList));
    },
    // 修改generalSet中的指定项
    alterGeneralSet(state, param){
      state.generalSet[param.indexName] = param.indexValue;
      localStorage.setItem("generalSet", JSON.stringify(state.generalSet));
    },
    // 还原generalSet设置
    restoreGeneralSet(state, defaultGeneralSet){
      // 更改vuex变量generalSet为默认
      state.generalSet = defaultGeneralSet;
      // 将本地缓存设为默认
      localStorage.setItem("generalSet", JSON.stringify(defaultGeneralSet));
    },
    // 修改engUrl
    alterEngUrl(state, url){
      state.engUrl = url;
    },
  },
  actions: {
      
  }
})