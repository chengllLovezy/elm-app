<template>
  <div id="app">
    <router-view/>
  </div>
</template>

<script>
export default {
  name: 'app'
}
</script>

<style lang="scss">
@import "./style/common.scss";
@import "./style/base.scss";
  body{
    background: #f5f5f5;
  }
  #app{
    width: 100%;
    height: 100%;
  }
</style>
