<template>
  <div class="time-clock">
    <div class="time">{{ currentTime }}</div>
    <div class="date">{{ currentDate }}</div>
  </div>
</template>

<script>
export default {
  data () {
    return {
      timer: '',
      currentTime: '00:00',
      currentDate: '',
    }
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
    this.currentDate = new Date().getFullYear() + "/" + this.appendZero(new Date().getMonth() + 1) + "/" + this.appendZero(new Date().getDate())
    let _this = this;
    var point = 0;
    this.timer = setInterval(function () {
      var hours = new Date().getHours();
      var minutes = new Date().getMinutes();
      var seconds = new Date().getSeconds();
      var linkword = ":";
      // if(point==0){
      //   linkword = " ";
      //   point = 1;
      // }else{
      //   point = 0;
      // }
      _this.currentTime = _this.appendZero(hours) + linkword + _this.appendZero(minutes);

    }, 1000)
  }
}
</script>

<style>
.time-clock {
  position: absolute;
  left: calc(50% - 50px);
  width: 100px;
  font-size: 36px;
  color: var(--theme-color);
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