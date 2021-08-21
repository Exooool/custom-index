<template>
  <div class="selectBox" >
    <div class="selectWrapper" @click.stop="groupSwitch()">
      <input class="selectInput"  placeholder="请选择" v-model="selectValue" readonly />
      <i class="iconfont icon-arrowdown" ref="icon"></i>
    </div>
    
    <div ref="group" :class="'selectValueGroup ' + (isShowGroup ? 'groupShow':'')" >
      <div class="valueGroupItem" v-for="(key,i) in valueGroup" :key="i" @click="setValue(key)">
        {{key}}
      </div>
    </div>
  </div>
</template>

<script>
export default {
  props: ['valueGroup','value'],
  data () {
    return {
      selectValue: '',
      isShowGroup: false,
    }
  },
  methods: {
    setValue(value){
      this.selectValue = value
      this.$emit('input', value)
    },
    groupSwitch(){
      if(this.isShowGroup){
        this.isShowGroup=false;
        this.$refs.icon.style="transform: rotateZ(0deg)";
      }else{
        this.isShowGroup=true;
        this.$refs.icon.style="transform: rotateZ(180deg)";
      }
    }
  },
  mounted () {
    // 监听点击事件 在需要阻止事件冒泡的click上添加stop
    document.addEventListener("click", ()=>{
      if(this.$refs.icon){
        this.isShowGroup = false;
        this.$refs.icon.style="transform: rotateZ(0deg)";
      }
    });
  }
}
</script>

<style lang="scss" scoped>
.selectBox{
  width: 240px;
  position: relative;
}

.selectBox .selectWrapper{
  position: relative;
}

.selectWrapper .icon-arrowdown{
  position: absolute;
  box-sizing: border-box;
  height: 40px;
  top: 0;
  display: flex;
  align-items: center;
  padding: 0px 5px;
  right: 5px;
  font-size: 14px;
  cursor: pointer;
  transition: all .2s ease-in-out;
  transform: rotateZ(0deg);
}

.selectBox .selectInput{
  position: relative;
  height: 40px;
  line-height: 40px;
  width: 100%;
  font-size: inherit;
  transition: all .2s ease-in-out;
  border: 1px solid #dcdfe6;
  border-radius: 4px;
  background: none;
  padding: 0px 15px;
  padding-right: 30px;
  box-sizing: border-box;
  background-color: white;
  cursor: pointer;
}

.selectBox .selectInput:hover{
  border-color: rgb(158, 158, 158);
}

.selectBox .selectValueGroup{
  position: absolute;
  top: 45px;
  width: 100%;
  padding: 10px 0px;
  border-radius: 10px;
  background-color: white;
  box-shadow: rgba(0,0,0,.2) 0 0 10px;
  transition: all .2s ease-in-out;
  transform: translateY(-10px);
  opacity: 0;
  visibility: hidden;
  z-index: 100;
}

.selectValueGroup .valueGroupItem{
  padding: 10px 5px;
  text-align: center;
  cursor: pointer;
}

.valueGroupItem:hover{
  background-color: rgb(235, 232, 232);
}
.groupShow{
  opacity: 1 !important;
  visibility: visible !important;
  transform: translateY(0px) !important;
}
</style>