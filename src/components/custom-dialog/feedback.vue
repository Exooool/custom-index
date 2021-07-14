<template>
  <div class="custom-cover" id="setMenuFeedback" data-dialog="customCover">
    <div class="custom-dialog">
      <i
        class="iconfont icon-delete dialog-delete"
        @click="closeDialog($event)"
        :data-dialog="'setMenuFeedback'"
      ></i>
      <span class="title">反馈</span>
      
    </div>
  </div>
</template>

<script>
import ScrollSwitch from '@/components/scroll-button'
export default {
  components: {
    ScrollSwitch
  },
  methods: {
    closeDialog (e) {
      let dialog = e.target.dataset.dialog
      document.getElementById(dialog).style = "opacity: 0;visibility: hidden;"
    },
  }
}
</script>

<style>
@import url('../../styles/components-styles/custom-dialog.css');
</style>