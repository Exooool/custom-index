<template>
  <div :class="'dialog-cover '+ (isvisible ? 'dialog-cover-show':'')">
    <div class="addDialog">
      <i
        class="iconfont icon-delete dialog-delete"
        @click="close()"
      ></i>

    </div>
  </div>
</template>

<script>
export default {
  props: ['isvisible'],
  data () {
    return {
      
    }
  },
  methods: {
    close(){
      this.$emit("close")
    }
  }
}
</script>

<style scoped>
.dialog-cover{
  top: 0;
  left: 0;
  position: fixed;
  display: flex;
  justify-content: center;
  background-color: rgba(0, 0, 0, 0.4);
  align-items: center;
  height: 100%;
  width: 100%;
  transition: all .2s ease-in-out;
  opacity: 0;
  z-index: 1;
  visibility: hidden;
}
.addDialog{
  height: 420px;
  width: 460px;
  border-radius: 15px;
  background-color: white;
  position: absolute;
  padding: 40px 70px;
}

.dialog-cover-show{
  opacity: 1;
  visibility: visible;
}
.dialog-delete{
  position: absolute;
  font-size: 28px;
  cursor: pointer;
  left: 20px;
  top: 20px;
}
</style>