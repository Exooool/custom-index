<template>
  <div class="collect-box" :style="(isvisible ? 'opacity: 1;visibility: visible;':'opacity: 0;visibility: hidden;')">
    <div class="listWrapper">
      <div class="collect-list" ref="collectlist">
        <CollectItem
          v-for="(item, i) in appList"
          :appName="item.appName"
          :appIcon="item.appIcon"
          :bgColor="item.bgColor"
          :iconColor="item.iconColor"
          :href="item.href"
          :key="i"
        />

        <label
          class="collect-item"
          style="background: rgba(255, 255, 255, 0.37)"
          @click="showAddDialog()"
        >
          <i
            class="iconfont icon-add collect-icon"
          ></i>
        </label>
      
      </div>
      
      <AddCollectItem :isvisible="addShow" @close="addShow=false"/>
    </div>
    
  </div>
</template>

<script>
import CollectItem from './collectItem'
import AddCollectItem from './addCollectItem'
export default {
  props: ['appList','isvisible'],
  data () {
    return {
       addShow: false
    }
  },
  components: {
    CollectItem,
    AddCollectItem
  },
  methods: {
   showAddDialog(){
     this.addShow=true
   } 
  }
}
</script>

<style scoped>
.collect-box {
  position: absolute;
  width: 100%;
  height: calc(100vh - 300px);
  top: 100px;
  transition: all 0.3s ease-in-out;
  transform: none;
  visibility: hidden;
  opacity: 0;
}

.listWrapper{
  position: absolute;
  height: 100%;
  width: 560px;
  left: calc(50% - 280px);
}

.collect-list {
  margin: 0 auto;
  height: 100%;
  position: relative;
  /* background-color: rgba(21, 21, 21, 0.3);
  box-shadow: 0 4px 8px 0 rgba(21, 21, 21, 0.2); */
  /* font-size为0改变行内元素之间的间距 */
  font-size: 0;
  border-radius: 10px;
  transition: all 0.35s ease-in-out;
  overflow-y: overlay;
}

.collect-list::-webkit-scrollbar {
  width: 6px;
}

.collect-list::-webkit-scrollbar-thumb {
  background-color: grey;
  border-radius: 3px;
}

.collect-list-switch {
  font-size: 20px;
  height: 20px;
  width: 50px;
  text-align: center;
  position: absolute;
  bottom: -20px;
  left: 50%;
  margin-left: -25px;
  padding: 5px;
  background-color: rgba(21, 21, 21, 0.8);
  border-radius: 60px;
  color: white;
  transition: all 0.35s ease-in-out;
  cursor: pointer;
}

/* 盒子显示通用样式 */
.box-visible {
  opacity: 1;
  visibility: visible;
}

@media screen and (min-width: 600px) and (max-width: 700px){
  .collect-list{
    max-width: 480px;
  }
}
@media screen and (max-width: 600px){
  .listWrapper{
    width: 100%;
    left: 0;
  }
  .collect-list{
    max-width: 440px;
  }
}
@media screen and (max-width: 500px){
  .collect-list{
    max-width: 400px;
  }
}
@media screen and (max-width: 450px){
  .collect-list{
    max-width: 320px;
  }
}
@media screen and (max-width: 350px){
  .collect-list{
    max-width: 240px;
  }
}
</style>