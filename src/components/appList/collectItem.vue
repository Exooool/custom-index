<template>
  <label
    class="collect-item"
    :style="'background-color:' + bgColor"
    @click="toWebsite"
  >
    <a :class="'iconfont collect-icon icon-' + appIcon" :style="'color:' + iconColor"></a>
    <span class="collect-title">{{ appName }}</span>
  </label>
</template>

<script>
export default {
  props: ['appName', 'bgColor', 'appIcon', 'href','iconColor'],
  data () {
    return {
    }
  },
  methods: {
    toWebsite () {
      console.log('collect-item click: + href='+this.href)
      if(this.href != null){window.open(this.href)}
    }
  }

}
</script>

<style>
.collect-item{
  position: relative;
  width: 90px;
  height: 90px;
  background-color: #dae2f8;
  color: #dae2f8;
  border-radius: 15px;
  display: inline-block;
  margin: 0 25px;
  margin-top: 10px;
  margin-bottom: 40px;
  cursor: pointer;
  transition: all .05s ease-in-out;
}

.collect-item:hover{
  background-color: rgb(206, 206, 206) !important;
}

.collect-icon {
  width: 26px;
  height: 26px;
  font-size: 26px !important; 
  color: chocolate;
  position: absolute;
  top: 50%;
  left: 50%;
  margin-top: -13px;
  margin-left: -13px;
}

.collect-title {
  width: 100%;
  position: absolute;
  font-size: 14px;
  bottom: -25px;
  text-align: center;
  white-space: nowrap;
  overflow:hidden;
  text-overflow: ellipsis;
}

@media screen and (min-width: 600px) and (max-width: 700px){
  .collect-item {
    margin: 0 20px;
    margin-top: 10px;
    margin-bottom: 40px;
    width: 80px;
    height: 80px;
  }
}

@media screen and (max-width: 600px) {
  .collect-item {
    margin: 0 20px;
    margin-top: 10px;
    margin-bottom: 40px;
    width: 70px;
    height: 70px;
  }
}

@media screen and (max-width: 500px) {
  .collect-item {
    margin: 0 15px;
    margin-top: 10px;
    margin-bottom: 30px;
    width: 70px;
    height: 70px;
  }
}

@media screen and (max-width: 450px) {
  .collect-item {
    margin: 0 10px;
    margin-top: 10px;
    margin-bottom: 20px;
    width: 60px;
    height: 60px;
  }
  .collect-title {
    font-size: 12px;
  }
}

@media screen and (max-width: 350px) {
  .collect-item {
    margin: 0 15px;
    margin-top: 10px;
    margin-bottom: 20px;
    width: 50px;
    height: 50px;
    border-radius: 7px;
  }
  .collect-title {
    font-size: 12px;
  }
}
</style>