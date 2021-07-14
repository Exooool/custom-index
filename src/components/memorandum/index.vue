<template>
  <div class="memorandumBox">
    <span class="dateSelector">今日计划</span>
    <div class="missionList">
      <div class="missionBox" v-for="(item, i) in 8" :key="i">
        <span>完成任务</span>
        <input type="checkbox" name="" id="" />
      </div>
      <div class="addMission">
        <button><i class="iconfont icon-add"></i></button>
      </div>
    </div>
  </div>
</template>

<script>
export default {
  data () {
    return {

    }
  },
  methods: {

  }
}
</script>

<style lang="scss" scoped>
.memorandumBox {
  position: fixed;
  height: 200px;
  width: 280px;
  background-color: white;
  border-radius: 10px;
  left: 20px;
  top: 10px;
  padding: 10px;
  box-sizing: border-box;
}

.memorandumBox .dateSelector {
  font-size: 18px;
  font-weight: bold;
  display: block;
  margin: 5px 0px;
}

.missionList {
  height: 120px;
  overflow-y: scroll;
}

.missionBox {
  position: relative;
  padding: 5px 10px;
  transition: all 0.2s ease-in-out;
  height: 20px;
  line-height: 20px;
  cursor: pointer;
}

.missionList::-webkit-scrollbar{
  width: 0px;
}

.missionBox span {
  display: inline-block;
  white-space: nowrap;
  overflow: hidden;
  text-overflow: ellipsis;
  max-width: 90%;
}

.missionBox input {
  position: absolute;
  right: 5px;
  top: 50%;
  transform: translateY(-50%);
}

.missionBox:hover {
  box-shadow: -5px 2px 10px 1px rgba(128, 128, 128, 0.363);
}

.addMission{
  position: absolute;
  height: 30px;
  bottom: 5px;
  left: 0;
  width: 100%;
  margin: 0 auto;
}

.addMission button{
  
}
</style>