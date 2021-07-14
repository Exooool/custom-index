<template>
  <div id="app">
    <router-view />
  </div>
</template>

<script>
export default {
  name: 'App',
  created () {
    document.onselectstart = function () { return false; }
    document.body.oncontextmenu = function () {
      return false;
    }
  }
}
</script>

<style>
* {
  padding: 0;
  margin: 0;
  
}
a:visited {
  color: #121212;
  text-decoration: none;
}

a:link {
  color: #121212;
  text-decoration: none;
}
html {
  height: 100%;
  width: 100%;
}
body {
  height: 100%;
  width: 100%;
  font-size: 14px;
  font-family:  "Arial","Microsoft YaHei","黑体","宋体",sans-serif;
}
button {
  background: none;
  outline: none;
  border: none;
}
ul,
ol {
  list-style: none;
}

input,
textarea {
  outline: none;
  border: none;
}
textarea {
  resize: none;
  overflow: auto;
}
#app {
  height: 100%;
}

/* 页面禁止滑动 */
.no-scroll {
  position: fixed;
  top: 0;
  left: 0;
  overflow: hidden;
}
</style>
