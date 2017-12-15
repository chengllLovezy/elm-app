<template>
    <div class="cartBox">
      <div class="cart-box">
        <div class="cart-wrap">
          <div class="cart-wrap-show">
            <div class="cart-dispatch">
              <div class="noBuy" v-if="!totalCartGoodsNum">未选购商品</div>
              <div class="isBuyShow" v-if="totalCartGoodsNum">
                <div class="money">17.8</div>
                <div class="dispatch">另需配送费5元</div>
              </div>
            </div>
            <div class="cart-money">20起送</div>
          </div>
        </div>
        <div class="cart-icon-box">
          <div class="cart-icon cart-icon-default" v-show="cartIconShowDefault"></div>
          <div class="cart-icon cart-icon-open" v-show="cartIconShowOpen"></div>
          <transition name="cart-icon">
            <div class="cart-icon cart-icon-active" v-show="cartIconShowActive"></div>
          </transition>
          <div class="cart-goods-num" v-if="totalCartGoodsNum">{{totalCartGoodsNum}}</div>
        </div>
      </div>
    </div>
</template>
<script>
  import { mapState, mapMutations} from 'vuex'
    export default {
      name:'cartBox',
      data(){
        return {
          cartIconShowDefault:true,
          cartIconShowOpen:false,
          cartIconShowActive:false
        }
      },
      computed:{
        ...mapState(['totalCartGoodsNum','totalPrice'])
      },
      methods(){

      }
    }
</script>
<style lang="scss">
  @import "../../style/base";
.cartBox{
  /*底部购物车数量显示*/
  .cart-box{
    width: 100%;
    height: 2.3rem;
    position: fixed;
    bottom: 0;
    left: 0;
    background: rgba(61,66,63,0.9);
    .cart-wrap{
      position: fixed;
      bottom: 0;
      left: 0;
      z-index: 3;
      width: 100%;
      height: 2.3rem;
      .cart-wrap-show{
        width: 100%;
        height: 2.3rem;
        display: flex;
        flex-direction: row;
        justify-content: space-between;
        align-items: stretch;

        .cart-dispatch{
          margin-left: 3.5rem;
          flex:1;
          padding-left: 0.2rem;
          font-size: $font-size-0-4;
          color: $color-999;

          .noBuy{
            font-size: $font-size-0-6;
            font-weight: bold;
            line-height: 2.3rem;
          }
          .isBuyShow{
            color: $color-fff;
            padding: 0.3rem 0;
            .money{
              font-size: $font-size-0-8;
              font-weight: bold;
            }
          }
        }
        .cart-money{
          padding: 0 0.5rem;
          background: $background-money;
          font-size: $font-size-0-7;
          font-weight: bold;
          line-height: 2.3rem;
          color: $color-money;
        }
      }
    }
    /*购物车图标 盒子*/
    .cart-icon-box{
      position: absolute;
      top: 0;
      left: 0;
      width: 3.3rem;
      height: 2.3rem;
      .cart-icon{
        position: absolute;
        top: 0;
        left: 0;
        z-index: 4;
        width: 2.7rem;
        height: 2.7rem;
        margin-top: -0.7rem;
        margin-left: 0.5rem;
      }
      .cart-icon-default{
        background: url("../../images/cart-icon.png") no-repeat;
        background-size: contain;
      }
      .cart-icon-open{
        background: url("../../images/cart-icon-open.png") no-repeat;
        background-size: contain;
      }
      .cart-icon-active{
        z-index: 3000;
        background: url("../../images/cart-icon-active.png") no-repeat;
        background-size: contain;
      }

      .cart-goods-num{
        position: absolute;
        top: -0.5rem;
        right: 0.1rem;
        z-index: 4000;
        width: 0.7rem;
        height: 0.7rem;
        line-height: 0.8rem;
        border-radius: 50%;
        text-align: center;
        background: linear-gradient(left bottom,#ff7316,#ff4215);
        color: $color-fff;
        font-size: $font-size-0-5;
        font-weight: bold;
      }
    }
  }
}
</style>
