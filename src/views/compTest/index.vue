<template>
  <div class="testBox">
    <div class="compBox">
      <div class="">
        <span class="compTitle">滑块</span>
        <span class="">滑块值：{{sliderValue}}</span>
      </div>
      <Slider v-model="sliderValue"/>
    </div>
    <div class="compBox">
      <div class="">
        <span class="compTitle">滑动开关</span>
        <span class="">开关值：{{switchValue}}</span>
      </div>
      <ScrollSwitch v-model="switchValue"/>
    </div>
    <div class="compBox">
      <div class="">
        <span class="compTitle">选择框</span>
        <span class="">选择值：{{selectValue}}</span>
      </div>
      <Select :valueGroup="selectGroup" v-model="selectValue"/>
    </div>
  </div>
</template>

<script>
import ScrollSwitch from '@/components/scroll-button'
import Slider from '@/components/slider'
import Select from '@/components/select'
export default {
  data () {
    return {
      switchValue: true,
      sliderValue: 0,
      selectGroup: ['QQ','微信','微博','推特'],
      selectValue: '',
    }
  },
  components: {
      Slider,
      ScrollSwitch,
      Select
  },
}
</script>

<style scoped>
.testBox{
  display: inline-block;
  width: 100%;
  height: 100%;
  padding: 50px;
  box-sizing: border-box;
}
.compBox{
  height: 100px;
  width: 400px;
  display: inline-block;
  padding-left: 100px;
}
.compTitle{
  font-size: 24px;
  font-weight: bold;
  margin: 10px;
}
</style>