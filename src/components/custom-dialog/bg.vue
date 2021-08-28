<template>
  <div class="custom-cover" id="setMenuBg" data-dialog="customCover">
    <div class="custom-dialog">
      <i
        class="iconfont icon-delete dialog-delete"
        @click="closeDialog($event)"
        :data-dialog="'setMenuBg'"
      ></i>
      <span class="title">背景图片偏好</span>
      <div class="main">
        <span class="subTitle">自定义图片</span>
        <div class="customImageBox">
          <div class="uploadBox" ref="uploadBox" @click="cusBgUrlChange(cusBgUrl)">
            <i class="iconfont icon-image" v-if="this.cusBgUrl == ''"></i>
            <div
              :class="[
                'cus' == current ? 'selectMask icon-true' : 'imgMask',
                'iconfont'
              ]"
            ></div>
          </div>
          <div class="imgaeInfo">
            <span>将你专属的图片设置为背景壁纸</span>
            <div class="subtitle">建议图像尺寸1980x1080或更高</div>
            <button class="selectIconBtn" @click="getImg()">浏览</button>
            <input
              id="imgInput"
              style="display: none"
              @change="saveImg($event)"
              type="file"
              accept="image/*"
            />
          </div>
        </div>
        <span class="subTitle">默认壁纸</span>
        <div class="selectPitcureBox">
          <div
            class="selectPitcureItem"
            v-for="(item, i) in defaultImgList"
            :key="i"
            @click="bgUrlChange($event)"
            :data-imgSrc="item.imgsrc"
            :data-imgType="'static'+i"
            :title="item.title"
          >
            <div
              :class="[
                'static' + i == current ? 'selectMask icon-true' : 'imgMask',
                'iconfont'
              ]"
            ></div>
            <img :src="require('@/' + item.imgsrc)" />
          </div>
        </div>
        <span class="subTitle">动态图片</span>
        <div class="selectPitcureBox">
          <div
            class="selectPitcureItem"
            v-for="(item, i) in dynamicImgList"
            :key="i"
            @click="bgUrlChange($event)"
            :data-imgSrc="item + '/video.mp4'"
            :data-imgType="'dynamic'+i"
          >
            <div
              :class="[
                'dynamic' + i == current
                  ? 'selectMask icon-true'
                  : 'imgMask',
                'iconfont'
              ]"
            ></div>
            <img :src="require('@/' + item + '/preview.jpg')" />
          </div>
        </div>
      </div>
    </div>
  </div>
</template>

<script>
import { mapState } from 'vuex'
import ScrollSwitch from '@/components/scroll-button'
export default {
  props: ['staticImg', 'current', 'dynamicImg'],
  data () {
    return {
      cusBgUrl: ''
    }
  },
  computed: {
    ...mapState(['defaultImgList', 'dynamicImgList'])
  },
  components: {
    ScrollSwitch
  },
  methods: {
    closeDialog (e) {
      let dialog = e.target.dataset.dialog
      document.getElementById(dialog).style = "opacity: 0;visibility: hidden;"
    },
    bgUrlChange (e) {
      let imginfo = e.target.parentNode.dataset.imgtype;
      this.$emit("changUrl", imginfo);
    },
    cusBgUrlChange (baseUrl){ 
      if(baseUrl!=""){
        let imginfo ='cus'
        this.$emit("changUrl", imginfo)
      }
    },
    getImg () {
      document.getElementById("imgInput").click();
    },
    saveImg (e) {
      let _this = this;
      var reader = new FileReader();

      //文件存储在file表单元素的files属性中，它是一个数组
      //没有返回值，但是读取完毕后，将读取结果存储在对象的result中
      var file = document.getElementById("imgInput").files[0];
      let filesize = file.size/ 1024 / 1024;
      if(filesize<4){
        reader.readAsDataURL(file);
        //当读取成功后触发
        reader.onload = function () {
          _this.cusBgUrl = reader.result;
          _this.$refs.uploadBox.style="background-image:url("+reader.result+")"
          localStorage.setItem('cusBg',reader.result)
        };
      }else{
        alert("由于浏览器限制，上传的图片不应大于4M");
      }
      

      

      // let bannerImage = document.getElementById('imgInput');
      // let imgData = this.getBase64Image(bannerImage);
      // localStorage.setItem("imgData", imgData);
    },
    fetchimage () {
      let dataImage = localStorage.getItem('cusBg');
      if(dataImage!=null){
        this.cusBgUrl = dataImage;
        this.$refs.uploadBox.style="background-image:url("+dataImage+")";
      }
      
    },
    
  },
  mounted () {
    if (localStorage.getItem('cusBg') != null) {
      let dataImage = localStorage.getItem("cusBg");
      this.cusBgUrl = dataImage;
      this.$refs.uploadBox.style="background-image:url("+dataImage+")";
    } 
  }
}
</script>

<style lang="scss" scoped>
@import "../../styles/components-styles/custom-dialog.scss";
</style>