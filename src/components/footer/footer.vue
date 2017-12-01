<template>
    <div class="">
      <mt-tabbar v-model="selected">
        <mt-tab-item id="home" :click="tabItem()">
          <icon slot="icon" name="home" :class="this.selected === 'home'?'activeTab':''"></icon>
          外卖
        </mt-tab-item>
        <mt-tab-item id="find" :click="tabItem()">
          <icon slot="icon" name="find" :class="this.selected === 'find'?'activeTab':''"></icon>
          发现
        </mt-tab-item>
        <mt-tab-item id="order" :click="tabItem()">
          <icon slot="icon" name="order" :class="this.selected === 'order'?'activeTab':''"></icon>
          订单
        </mt-tab-item>
        <mt-tab-item id="profile" :click="tabItem()">
          <icon slot="icon" name="profile" :class="this.selected === 'profile'?'activeTab':''"></icon>
          我的
        </mt-tab-item>
      </mt-tabbar>
    </div>
</template>
<script>
    export default {
      name:'footerTab',
      components:{

      },
      data(){
        return {
          selected:'home'
        }
      },
      methods:{
        tabItem(){
          let selected = this.selected;
            this.$router.push(selected)
        }
      },
      mounted(){

      }
    }
</script>
<style lang="scss">
  .activeTab{
    fill:#2295FF!important;
  }
</style>
