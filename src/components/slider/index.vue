<template>
  <div class="sliderBox" ref="slider">
    <div class="sliderRunWay" @click="sliderClick($event)">
      <div class="sliderBar"></div>
      <div class="sliderBtnWrapper" ref="sliderBtn" @mousedown="sliderMove($event)" >
        <div class="sliderBtn"></div>
        <div class="sliderTip">{{sliderData}}%</div>
      </div>
    </div>
  </div>
</template>

<script>
export default {
  props: ['value'],
  data () {
    return {
      sliderData: 0,
    }
  },
  methods: {
    sliderMove(e){
      console.log("鼠标按下")
      
      let slider = this.$refs.slider;
      let sliderbar = slider.children[0].children[0]
      let button = slider.children[0].children[1]
      var totalLong = slider.children[0].clientWidth //滑块可滑行总长度
      // console.log("滑块滑行总长度="+slider.children[0].clientWidth)
      // console.log("按钮离父级左边的距离="+button.offsetLeft)
      // console.log("按钮clientX="+slider.offsetLeft)


      document.onmousemove = (e)=>{
        let x = e.clientX;
        let lineStartX = this.elPageLeft(slider);
        let nowX = x-lineStartX;
        let nowPos = parseInt((nowX/totalLong)*100);
        if(nowPos>100){
          nowPos = 100;
        }else if(nowPos<0){
          nowPos = 0;
        }
        button.style.left= nowPos +"%";
        sliderbar.style.width = nowPos +"%";
        this.$emit('input', nowPos);
        this.sliderData = nowPos;
      }


      
      document.onmouseup = ()=>{
        console.log("退出按钮")
        document.onmousemove=null;
        document.onmouseup=null;
      }
    },
    sliderClick(e){
      let x = e.clientX;
      let slider = this.$refs.slider;
      let sliderbar = slider.children[0].children[0]
      let button = slider.children[0].children[1]
      let totalLong = slider.children[0].clientWidth
      let lineStartX = this.elPageLeft(slider);
      let nowX = x-lineStartX;
      let nowPos = parseInt((nowX/totalLong)*100);
      button.style.left= nowPos +"%";
      sliderbar.style.width = nowPos +"%";
      this.$emit('input', nowPos);
      this.sliderData = nowPos;
    },
    // 计算元素记录页面左边的距离
    elPageLeft(e){
      var offset = e.offsetLeft;
      if(e.offsetParent != null) offset += this.elPageLeft(e.offsetParent);
      return offset;
    }
  },
  mounted () {
      
  }
}
</script>

<style scoped>
.sliderBox{
  width: 70%;
}
.sliderBox .sliderRunWay{
  width: 100%;
  height: 6px;
  margin: 16px 0;
  background-color: #e4e7ed;
  border-radius: 3px;
  position: relative;
  cursor: pointer;
  vertical-align: middle;
}
.sliderRunWay .sliderBar{
  height: 6px;
  background-color: #70c000;
  border-top-left-radius: 3px;
  border-bottom-left-radius: 3px;
  position: absolute;
  left: 0;
  width: 0%;
  
}
.sliderRunWay .sliderBtnWrapper{
  position: absolute;
  padding: 13px 10px;
  box-sizing: border-box;
  left: 0%;
  top: -20px;
  transform: translateX(-50%);
  cursor: pointer;
  transition: transform .25s ease-in-out;
}

.sliderRunWay .sliderBtnWrapper:hover{
  transform:  translateX(-50%) scale(1.2);
}

.sliderBtnWrapper .sliderBtn{
  height: 16px;
  width: 22px;
  display: inline-block;
  vertical-align: middle;
  background-color: white;
  border-radius: 160px;
  border: solid 2px #70c000;
}

.sliderBtnWrapper .sliderTip{
  position: absolute;
  bottom: -10px;
}
</style>