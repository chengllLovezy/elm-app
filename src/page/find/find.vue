<template>
  <div class="" >
    <h2>find</h2>
    <button @click="asd">点击</button>
    <mt-popup v-model="off" position="bottom">
      <ul>
        <li>111</li>
        <li>111</li>
        <li>111</li>
        <li>111</li>
        <li>111</li>
      </ul>
    </mt-popup>

  </div>
</template>
<script>
  export default {
    name:'',
    data(){
      return {
        off:false
      }
    },
    components:{

    },
    methods:{
      asd(){
        this.off = true;
      }
    },
    mounted(){

    }
  }
</script>
<style lang="scss">
  @import "../../style/base";

</style>
