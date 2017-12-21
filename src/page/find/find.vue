<template>
  <div class="" >
    <h2>find</h2>
    <button @click="getPosition">点击获取位置</button>
    <p>{{test}}</p>
  </div>
</template>
<script>
  export default {
    name:'',
    data(){
      return {
        test:''
      }
    },
    components:{

    },
    methods:{
      getPosition(){
        let options = {
          enableHighAccuracy: true,
          maximumAge: 3600000
        };
        if (navigator.geolocation){
          navigator.geolocation.getCurrentPosition(this.success, this.error, options);
        }else{
          this.test="Geolocation is not supported by this browser.";
        }
      },
      success(position){
        console.log(position)
      },
      error(error){
        switch(error.code)
        {
          case error.PERMISSION_DENIED:
            this.test="用户拒绝对获取地理位置的请求。"
            break;
          case error.POSITION_UNAVAILABLE:
            this.test="位置信息是不可用的。"
            break;
          case error.TIMEOUT:
            this.test="请求用户地理位置超时。"
            break;
          case error.UNKNOWN_ERROR:
            this.test="未知错误。"
            break;
        }
      }
    },
    mounted(){

    }
  }
</script>
<style lang="scss">
  @import "../../style/base";

</style>
