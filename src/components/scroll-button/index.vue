<template>
  <label class="switch">
    <!-- <input type="checkbox" v-model="switchState"  @change="switchChange()"/> -->
    <input type="checkbox" :checked="value" @change="$emit('input', $event.target.checked)" />
    <div class="switchColor"></div>
  </label>
</template>

<script>
export default {
  props: ['value'],
}
</script>

<style>
.switch {
  width: 36px;
  height: 22px;
  top: 0;
  right: 0;
  border-radius: 15px;
  position: relative;
  cursor: pointer;
  display: block;
  position: absolute;
}

.switchColor {
  background-color: grey;
  width: 100%;
  height: 100%;
  border-radius: 15px;
  position: absolute;
  top: 0;
  left: 0;
  transition: all 0.3s ease-in-out;
  z-index: 1;
}

.switch input {
  height: 16px;
  width: 16px;
  border: none;
  background-color: white;
  border-radius: 160px;
  -webkit-appearance: none;
  outline: none;
  transition: all 0.3s ease-in-out;
  position: absolute;
  top: 3px;
  left: 3px;
  z-index: 2;
  cursor: pointer;
}

.switch input:checked {
  left: 17px;
}
input:checked + .switchColor {
  background-color: #70c000;
}
</style>