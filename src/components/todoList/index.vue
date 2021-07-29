<template>
  <div class="todoListBox">
    <span class="dateSelector">今日计划</span>
    <i class="iconfont icon-menu"></i>
    <div class="missionList">
      <div class="missionBox" v-for="(item, i) in 8" :key="i">
        <span>完成任务</span>
        <input  type="checkbox" name="" id="" />
      </div>
      <div class="addMission">
        <button><i class="iconfont icon-add"></i></button>
      </div>
    </div>

    <Setting />
  </div>
</template>

<script>
import Setting from './Setting';
export default {
  data () {
    return {
      
    }
  },
  methods: {

  },
  components:{
    Setting
  }
}
</script>

<style lang="scss" scoped>
.todoListBox {
  position: fixed;
  height: 200px;
  width: 280px;
  background-color: white;
  border-radius: 10px;
  right: 20px;
  top: 10px;
  padding: 10px;
  box-sizing: border-box;

  .icon-menu{
    position: absolute;
    font-size: 20px;
    top: 16px;
    right: 20px;
    font-weight: bold;
    cursor: pointer;
  }
}

.todoListBox .dateSelector {
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
  transition: all .1s ease-in-out;
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
  background-color: rgb(235, 235, 235);
}

.addMission{
  position: absolute;
  height: 30px;
  bottom: 5px;
  left: 0;
  width: 100%;
  margin: 0 auto;

  button{
    position: absolute;
    left: calc(50% - 100px);
    height: 100%;
    width: 200px;
    border-radius: 5px;
    background-color: #0b8793;
    color: white;
    cursor: pointer;
    transition: .1s;
  }
}


.addMission button:hover{
  background-color: #109ca8;
}

.addMission button:active{
  background-color: #0b8793;
}
</style>