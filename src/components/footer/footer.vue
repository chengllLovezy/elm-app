<template>
    <div class="footer">
      <div class="tab">
        <div class="tab-list">
          <div class="tab-item" @click="selectedTab('home')">
            <div class="tab-icon">
              <img v-if="!homeActive" src="../../images/home-default.png" alt="">
              <img v-if="homeActive" src="../../images/home-active.png" alt="">
            </div>
            <div class="text" :class="{active:homeActive}">外卖</div>
          </div>
          <div class="tab-item" @click="selectedTab('find')">
            <div class="tab-icon">
              <img v-if="!findActive" src="../../images/find-default.png" alt="">
              <img v-if="findActive" src="../../images/find-active.png" alt="">
            </div>
            <div class="text" :class="{active:findActive}">发现</div>
          </div>
          <div class="tab-item" @click="selectedTab('order')">
            <div class="tab-icon">
              <img v-if="!orderActive" src="../../images/order-default.png" alt="">
              <img v-if="orderActive" src="../../images/order-active.png" alt="">
            </div>
            <div class="text" :class="{active:orderActive}">订单</div>
          </div>
          <div class="tab-item" @click="selectedTab('profile')">
            <div class="tab-icon">
              <img v-if="!personActive" src="../../images/person-default.png" alt="">
              <img v-if="personActive" src="../../images/person-active.png" alt="">
            </div>
            <div class="text" :class="{active:personActive}">我的</div>
          </div>
        </div>
      </div>
    </div>
</template>
<script>
    export default {
      name:'footerTab',
      components:{

      },
      data(){
        return {
          homeActive:true,
          findActive:false,
          orderActive:false,
          personActive:false
        }
      },
      methods:{
        init(){
          // this.tabActive = 0
        },
        selectedTab(el){

          switch (el){
            case 'home':
              this.homeActive = true;
              this.findActive = false;
              this.orderActive = false;
              this.personActive = false;
              break;
            case 'find':
              this.homeActive = false;
              this.findActive = true;
              this.orderActive = false;
              this.personActive = false;
              break;
            case 'order':
              this.homeActive = false;
              this.findActive = false;
              this.orderActive = true;
              this.personActive = false;
              break;
            case 'profile':
              this.homeActive = false;
              this.findActive = false;
              this.orderActive = false;
              this.personActive = true;
              break;
          }

          this.$router.push(el)
        },
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
  .footer{
    position: fixed;
    bottom: 0;
    left: 0;
    z-index: 6000;
    width: 100%;
    height: 2.3rem;
    background: #f7f7f7;
    box-shadow: 0 3px 5px #000;
    .tab{
      height: 100%;
      .tab-list{
        height: 100%;
        display: flex;
        flex-direction: row;
        .tab-item{
          width: 25%;
          display: flex;
          flex-direction: column;
          text-align: center;
          overflow: hidden;
          padding: 0.3rem 0 0 0;
          .tab-icon{
            width: 1.1rem;
            height: 1.1rem;
            margin: 0 auto;
            overflow: hidden;
            position: relative;
            img{
              position: absolute;
              left: -13px;
              bottom: -2px;
              width: 2.2rem;
              height: 2.2rem;
            }
          }
          .text{
            margin-top: 2px;
            font-size: 0.4rem;
            color: #666666;
          }
          .active{
            color: #3190e8;
          }
        }
      }
    }
  }
</style>
