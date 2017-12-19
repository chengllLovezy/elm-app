<template>
    <div class="">
      <router-view></router-view>
      <footer-tab></footer-tab>
    </div>
</template>
<script>
  import footerTab from '../../components/footer/footer'

    export default {
      name:'index',
      components:{
        footerTab
      },
      mounted(){
        this.$router.push('home')
      }
    }
</script>
<style lang="scss">

</style>
