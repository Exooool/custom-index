<template>
  <div class="popupBox popupUnMagnify" ref="popup" style="" @click="magnify()">
    <span class="title">操作提示</span>
    <div class="content">可以通过点击鼠标右键切换搜索框和应用列表</div>
    <i class="iconfont icon-delete" @click="close()"></i>
  </div>
</template>

<script>
export default {
  data () {
    return {
      popup: false
    }
  },
  methods: {
    magnify(){
      if(this.popup){
        this.$refs.popup.className="popupBox popupUnMagnify";
        this.popup=false;
      }else{  
        this.$refs.popup.className="popupBox popupMagnify";
        this.popup=true;
      }
    },
    close(){
      this.$refs.popup.style="display:none";
    }
  },
  mounted () {
    if (localStorage.getItem("generalSet") == null) {
      this.$refs.popup.style="display:block";
    }
  }
}
</script>

<style scoped>
@import url('../../styles/icon.css');

.popupBox{
  display: none;
  position: fixed;
  height: 150px;
  width: 200px;
  background-color: white;
  border-radius: 10px;
  right: 20px;
  bottom: 10px;
  padding: 10px;
  box-sizing: border-box;
  cursor: pointer;
  transition: all 1s ease-in-out;
}

.popupUnMagnify:hover{
  transition: all .2s ease-in-out;
  transform: scale(1.05);
}

.popupMagnify{
  height:300px;
  width:400px;
  transform: translateX( calc(-50vw + 200px)) translateY( calc(-50vh + 150px));
}

.popupBox .title{
  font-size: 20px;
}

.popupBox .content{
  font-size: 16px;
  padding: 10px 0px;
}

.icon-delete{
  position: absolute;
  right: 5px;
  top: 5px;
  z-index: 100;
  font-size: 20px;
}
</style>