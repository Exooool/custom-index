<template>
  <div class="time-clock">
    <div class="time">{{ currentTime }}</div>
    <div v-if="isDate" class="date">{{ currentDate }}</div>
  </div>
</template>

<script> 
import { mapGetters } from 'vuex'
export default {
  data () {
    return {
      timer: '',
      currentTime: '00:00',
      currentDate: '',
    }
  },
  computed: {
    ...mapGetters(['isFlicker','isDate'])
  },
  methods: {
    appendZero (obj) {
      if (obj < 10) {
        return "0" + obj;
      } else {
        return obj;
      }
    }
  },
  created () {
    // 设置日期
    this.currentDate = new Date().getFullYear() + "/" + this.appendZero(new Date().getMonth() + 1) + "/" + this.appendZero(new Date().getDate())
    
    
    
    let _this = this;
    var point = 0;
    // 创建时钟函数
    this.timer = setInterval(function () {
      var hours = new Date().getHours();
      var minutes = new Date().getMinutes();
      // var seconds = new Date().getSeconds();
      var linkword = ":";
      // 每一秒间隔进行重新赋值point，然后通过if来判断是否赋值linkword
      if(_this.isFlicker){
        if(point==0){
          linkword = " ";
          point = 1;
        }else{
          point = 0;
        }
      }
      _this.currentTime = _this.appendZero(hours) + linkword + _this.appendZero(minutes);

    }, 1000)
  }
}
</script>

<style lang="scss" scoped>
.time-clock {
  position: absolute;
  left: calc(50% - 50px);
  width: 100px;
  font-size: 36px;
  color: white;
  cursor: pointer;
  transition: all 0.3s ease-in-out;
  text-align: center;
  margin-bottom: 35px;
}

.time-clock .date {
  font-size: 18px;
  margin-top: 5px;
}

.custom-main .time-clock:hover {
  transform: scale(1.2);
}
</style>