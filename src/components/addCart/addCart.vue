<template>
    <div class="addCart">
      <!--添加购物车-->
      <div class="add-or-reduce">
        <transition name="reduce-icon">
          <div class="reduce-icon" v-if="goodsItemNum" @click.stop="reduceCart"></div>
        </transition>
        <transition name="goods-num">
          <div class="goods-num" v-if="goodsItemNum">{{goodsItemNum}}</div>
        </transition>
        <div class="add-icon" @click.stop="addCart($event)"></div>
      </div>
    </div>
</template>
<script>
  import { mapState, mapMutations } from 'vuex'
    export default {
      name:'addCart',
      props:['storeId','foodsInfo'],
      data(){
        return {
          goodsNum:0,
          reduceIconShow:false,
          goodsNumShow:false
        }
      },
      computed:{
        ...mapState(['cartLists']),
        goodsItemNum(){
          let storeId = this.storeId;
          let foodId = this.foodsInfo.foods_id;
          if(this.cartLists&&this.cartLists[storeId]&&this.cartLists[storeId][foodId]){
            this.goodsNum=this.cartLists[storeId][foodId].num;
            return this.goodsNum;
          }else{
            return 0;
          }
        },
      },
      methods:{
        ...mapMutations(['ADD_CART','REDUCE_CART']),
        addCart(ev){
          this.goodsNum++;
          this.reduceIconShow = true;
          this.goodsNumShow = true;
          let foodsItem = this.foodsChange();
          this.ADD_CART(foodsItem);
          this.$emit('addCartListen',ev.target);
        },
        reduceCart(ev){
          this.goodsNum--;
          if(this.goodsNum<=0){
            this.goodsNum = 0;
            this.reduceIconShow = false;
            this.goodsNumShow = false;
          }
          let foodsItem = this.foodsChange();
          this.REDUCE_CART(foodsItem);
          this.$emit('reduceCartListen');
        },
        foodsChange(){
          let info = {
            num:this.goodsNum,
            foods:this.foodsInfo
          };
          let cartLists = this.cartLists;
          let storeId =  cartLists[this.storeId] = (cartLists[this.storeId] || {});
          storeId[this.foodsInfo.foods_id] = (info || {});
          return cartLists;
        }
      },
      mounted(){

      }
    }
</script>
<style lang="scss">
  @import "../../style/base";
  .addCart{

    .add-or-reduce{
      display: flex;
      flex-direction: row;
      align-items: center;
      justify-content: flex-end;
      .reduce-icon{
        width: 1rem;
        height: 1rem;
        background: url("../../images/reduce-cart-icon.png") no-repeat;
        background-size: contain;
      }
      .goods-num{
        margin: 0 0.3rem;
        text-align: center;
        color: $color-333;
        font-size: $font-size-0-7;
      }
      .add-icon {
        position: relative;
        top: 0;
        left: 0;
        z-index: 2;
        width: 1rem;
        height: 1rem;
        background: url("../../images/add-goods.png") no-repeat;
        background-size: contain;
      }
    }
    /*定义添加商品和删除商品的动画*/
    .reduce-icon-enter-active,.goods-num-enter-active{
      transition: all 0.5s;
    }
    .reduce-icon-enter,.goods-num-enter{
      transform: translateX(2rem) rotate(-360deg);
    }
    .reduce-icon-leave-active,.goods-num-leave-active{
      transition: all 0.5s;
    }
    .reduce-icon-leave-to,.goods-num-leave-to{
      transform: translateX(2rem) rotate(360deg);
    }
  }

</style>
