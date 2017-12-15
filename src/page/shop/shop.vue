<template>
  <div class="shop">
    <div class="header-bg-box">
      <div class="header-bg" :style="{backgroundImage:`url(${baseImgUrl}${bgUrl})`}">
        <div class="header-bg-blur" :style="{backgroundImage:`url(${baseImgUrl}${bgUrl})`}"></div>
        <div class="header-bg-cover"></div>
      </div>

      <div class="back-box">
        <!--顶部返回按钮部分-->
        <div class="back-wrap">
          <span class="back-icon" @click="goBack"></span>
          <div>
            <span class="spelling-icon"></span>
            <span class="cart-icon"></span>
            <span class="more-icon"></span>
          </div>
        </div>
      </div>

      <div class="header">

        <!--商家头像及信息部分-->
        <div class="seller">
          <div class="seller-avater">
            <img class="avater" :src="baseImgUrl+storeInfo.head_img" alt="">
          </div>
          <div class="seller-info">
            <h2 class="title">
              <span class="text ellipsis">{{storeInfo.store_name}}</span>
              <span class="right-icon"></span>
            </h2>
            <p class="description ellipsis">{{storeInfo.description}}</p>
            <p class="brand">
              <span class="pinpai-icon"></span>
              <span class="take-time">蜂鸟专送·约34分钟</span>
            </p>
          </div>
        </div>
      </div>
    </div>


    <!--商家活动-->
    <div class="activity-box">
      <div class="activity" @click="activityShow = true;">
        <div class="active-lists">
          <!--活动列表-->
          <div class="item ellipsis">
            <!--减  首  特  的样式-->
            <span class="item-icon" v-for="active_icon in activityStyle" v-if="active_icon.active_id === activeFir.active_id"
                  :style="{background:active_icon.bgcolor}">{{active_icon.text}}</span>
            <span class="text">{{activeFir.contentText}}</span>
          </div>
        </div>
        <!--活动数量-->
        <div class="active-num">
          <span>{{activityLen}}个活动</span>
          <span class="active-down"></span>
        </div>
      </div>
    </div>

    <!--商品 评价导航-->
    <div class="nav-box">
      <div class="nav border-bottom">
        <span class="goods" :class="{isActive:isActive,underline:isActive}" @click="">商品</span>
        <span class="commit" :class="{isActive:!isActive,underline:!isActive}" @click="">评价{{storeInfo.score}}分</span>
      </div>
    </div>

    <div ref="ball">
      <div v-for="ball in balls">
        <transition @before-enter="beforeDrop" @enter="dropping" @after-enter="afterDrop">
          <div class="ball" v-show="ball.show">
            <div class="inner inner-hook">1</div>
          </div>
        </transition>
      </div>
    </div>

    <!--导航  商品  --列表-->
    <div class="foodsList">

      <!--商品 评价 滑动列表-->
      <div class="shop-swiper-box">
        <!--左侧商品导航-->
        <div class="navSwiper" ref="menuList">
          <div class="lists">
            <div v-for="(item,index) in menusLists" :key="index" class="item border-bottom"
                 :class="{activity_menu:index == menuIndex}" @click="selectMenu(index,$event)">{{item.menus_name}}
              <div class="menus-item-badge" v-if="menuFoodNum[index]">{{menuFoodNum[index]}}</div>
            </div>
          </div>
        </div>
        <!--食品列表-->
        <div class="foodSwiper" ref="foodList">
          <div class="lists">
            <div class="item-box" v-for="menuitem in menusLists">
              <div class="item">
                <div class="menu border-bottom">
                  <span class="title">{{menuitem.menus_name}}</span>
                  <span>{{menuitem.menus_description}}</span>
                </div>
                <div class="food-list" v-for="fooditem in menuitem.foods">
                  <div class="food-item" @click="foodsDetail">
                    <div class="food-item-img">
                      <img src="https://fuss10.elemecdn.com/e/51/5386c593a0fe441cfb52215cdd431jpeg.jpeg" alt="">
                    </div>
                    <div class="food-item-info">
                      <h2 class="ellipsis">{{fooditem.name}}</h2>
                      <div class="des ellipsis">
                        {{fooditem.description}}
                      </div>
                      <div class="mouth-sale ellipsis">
                        <span>月售{{fooditem.salenum}}份</span>
                        <span>好评率{{fooditem.favorableRate}}%</span>
                      </div>
                      <div class="price">
                        <span class="price-sale">{{fooditem.price}}
                        </span>
                        <add-cart :storeId="storeInfo._id" :foodsInfo="fooditem" v-on:addCartListen="addCartHandler" v-on:reduceCartListen="reduceCartHandler"></add-cart>
                      </div>
                    </div>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>

    <!--底部购买商品结算列表-->
    <div class="cart-box">
        <mt-popup v-model="cartListShow" position="bottom">
          <div class="cartList">
              <div class="header">
                <h1>已选商品</h1>
                <div class="clear">
                  <span class="clear-icon"></span>
                  <span class="clear-text">清空</span>
                </div>
              </div>
              <div class="select-goods-lists">
                <div class="lists">
                  <div v-for="cartFoodItem in cartDataLists">
                    <div class="item" v-if="cartFoodItem.num">
                      <span class="item-name ellipsis">{{cartFoodItem.foods.name}}</span>
                      <span class="item-price">{{cartFoodItem.foods.price | currencyFilter}}</span>
                      <add-cart :storeId="storeInfo._id" :foodsInfo="cartFoodItem.foods" v-on:addCartListen="addCartHandler" v-on:reduceCartListen="reduceCartHandler"></add-cart>
                    </div>
                  </div>
                </div>
              </div>
              <div class="many-go">
                <span>商品如需分开打包，请使用多人订餐</span>
                <span class="right-icon"></span>
              </div>
            </div>
        </mt-popup>
        <div class="cart-wrap">
          <div class="cart-wrap-show">
            <div class="cart-dispatch" @click="openCartLists">
              <div class="noBuy" v-if="!totalFoodNum">未选购商品</div>
              <div class="isBuyShow" v-if="totalFoodNum">
                <div class="money">{{totalPrice}}</div>
                <div class="dispatch">另需配送费{{storeInfo.money_dispatch | currencyFilter}}元</div>
              </div>
            </div>
            <div class="cart-money" v-if="storeInfo.money_limit-totalPrice>0">
              <span v-if="!totalFoodNum">{{storeInfo.money_limit | currencyFilter}}</span>
              <span v-if="totalFoodNum">还差 {{storeInfo.money_limit-totalPrice | currencyFilter}}</span>
              起送
            </div>
            <div class="set-account" v-if="storeInfo.money_limit-totalPrice<=0" @click="">去结算</div>
          </div>
        </div>
        <div class="cart-icon-box" @click="openCartLists">
          <div class="cart-icon cart-icon-default" v-show="cartIconShowDefault"></div>
          <div class="cart-icon cart-icon-open" v-show="cartIconShowOpen"></div>
          <transition name="cart-icon">
            <div class="cart-icon cart-icon-active" v-show="cartIconShowActive"></div>
          </transition>
          <div class="cart-goods-num" v-if="totalFoodNum">{{totalFoodNum}}</div>
        </div>
      </div>

    <!--活动列表-->
    <div class="activity-hide-box">
      <mt-popup v-model="activityShow" position="bottom">
          <div class="activity">
            <div class="header">
              <h1>优惠活动</h1>
              <span class="close-icon" @click="activityShow = false"></span>
            </div>
            <div class="active-lists">
              <!--活动列表-->
              <div class="item ellipsis" v-for="item in storeInfo.activity">
                <!--减  首  特  的样式-->
                <span class="item-icon" v-for="active_icon in activityStyle" v-if="active_icon.active_id === item.active_id"
                      :style="{background:active_icon.bgcolor}">{{active_icon.text}}</span>
                <span class="text">{{item.contentText}}</span>
              </div>
            </div>
          </div>

      </mt-popup>
    </div>

    <!--食品详情-->
   <!-- <div class="detail_wrap">
      <div class="foods_detail">
      </div>
      <mt-popup popup-transtion="popup-fade">
        <div ref="detailBox" class="detail_box" @touchstart="detailStart($event)" @touchmove="detailMoveUp($event)">

          <div class="detail_img">
            <img src="https://fuss10.elemecdn.com/e/51/5386c593a0fe441cfb52215cdd431jpeg.jpeg" alt="">
            <div class="cover_box">
              <div class="share_box">
                <div class="share_icon"></div>
              </div>
              <div class="description">大颗肉粒搭配浓郁酱汁、加入意大利进口特级初榨橄榄油</div>
            </div>
          </div>
          <div class="detail_content">
            <h2 class="title ellipsis">经典意式肉酱面</h2>
            <div class="mouth_sale_box">
              <span class="mouth_sale">月售97份</span>
              <span class="favorate_rate">好评率95%</span>
            </div>
            <div class="price_box">
              <span class="price">34</span>
              <span class="add_cart_btn">加入购物车</span>
            </div>
          </div>
        </div>
      </mt-popup>
    </div>-->


    <div class="foods_detail" ref="detailBox">
      <mt-popup v-model="foodsDetailShow" popup-transition="popup-fade">
        <div class="detail_box" @touchstart="detailStart($event)" @touchmove="detailMoveUp($event)">

          <div class="detail_img">
            <img src="https://fuss10.elemecdn.com/e/51/5386c593a0fe441cfb52215cdd431jpeg.jpeg" alt="">
            <div class="cover_box">
              <div class="share_box">
                <div class="share_icon"></div>
              </div>
              <div class="description">大颗肉粒搭配浓郁酱汁、加入意大利进口特级初榨橄榄油</div>
            </div>
          </div>
          <div class="detail_content">
            <h2 class="title ellipsis">经典意式肉酱面</h2>
            <div class="mouth_sale_box">
              <span class="mouth_sale">月售97份</span>
              <span class="favorate_rate">好评率95%</span>
            </div>
            <div class="price_box">
              <span class="price">34</span>
              <span class="add_cart_btn">加入购物车</span>
            </div>
          </div>
        </div>
      </mt-popup>
    </div>
  </div>
</template>
<script>
  import {opacity} from '../../animate/animate'
  import BetterScroll from 'better-scroll'
  import axios from 'axios'
  import { mapState, mapMutations } from 'vuex'
  import addCart from '../../components/addCart/addCart.vue'
  export default {
    name: "shop",
    data() {
      return {
        balls:[
          {show:false}
        ],
        dropBalls:[],
        detailTouchY:0,
        foodsDetailShow:false,//食品详情显示切换
        cartListShow:false,//底部购物车列表显示隐藏
        activityShow:false,//页面下部----活动列表的显示隐藏
        menuFoodNum:[],//导航左上角加入购物车的商品数量
        cartIconShowDefault:true,//购物车默认的灰色状态
        cartIconShowOpen:false,//小球下落过程中购物车图标的状态
        cartIconShowActive:false,//小球落入购物车时购物车的状态
        menuFoodToggle: true,//导航点击切换的时候关闭商品滚动改变导航的效果
        menuIndex: 0,//当前被选中menu的下标
        foodsLists: [],//商品列表
        menusLists: [],//导航列表
        activeFir: '',//活动数组中的第一个（展示在header下面）
        activityLen: 0,//活动数组的长度
        scrollY: 0,
        foodListHeight: [],//商品列表中每个item-box的高度
        foodscroll: null,//商品列表的betterscroll
        menuscroll: null,//menu导航的betterscroll
        isActive: true,//导航被选中的状态
        bgUrl: '',//header部分背景地址
        storeInfo: {},//商家信息
        activityStyle: [],//商家活动
        baseImgUrl: 'https://fuss10.elemecdn.com',//导航食品分类图片域名地址
      }
    },
    components: {
      addCart
    },
    computed: {
      ...mapState(['cartLists']),
      storeId(){
        return this.$route.query.store_id;
      },
      //购物车数据初始化
      cartDataLists(){
        return this.cartLists[this.storeId]
      },
      //购物车中的商品总数量
      totalFoodNum(){
        let num = 0;
        if(this.cartDataLists){
          Object.keys(this.cartDataLists).forEach((item)=>{
            if(this.cartDataLists[item]){
              num+=this.cartDataLists[item].num;
            }
          })
        }
        return num;
      },
      //购物车商品总价
      totalPrice(){
        let price = 0;
        if(this.cartDataLists){
          Object.keys(this.cartDataLists).forEach((item)=>{
            if(this.cartDataLists[item]){
              let num = this.cartDataLists[item].num;
              let priceItem = this.cartDataLists[item].foods.price;
              price += parseInt(num)*parseFloat(priceItem);
            }
          })
        }
        return price;
      },
      //导航中显示的选中的商品数量
    },
    methods: {
      ...mapMutations(['ADD_CART','REDUCE_CART','INIT_CART']),
      init() {
        let store_id = this.$route.query.store_id;
        //初始化商家列表的数据
        axios.get('/api/shop', {
          params: {
            store_id: store_id
          }
        }).then((response) => {
          let res = response.data;
          let resdata = res.data;
          if (!res.status) {
            let appdata = resdata.appdata;//管理者数据
            let store = resdata.store;//商家所有信息
            this.menusLists = this.initMenuFoods(store);//商品和导航列表
            this.storeInfo = store;//商家所有信息
            this.initMenuFoodNum();
            //this.menusLists = store.foods_lists;//导航列表（包含食品列表）
//            console.log(this.menusLists)
            this.activeFir = store.activity[0];//商家活动列表中的第一个（用于页面展示）
            this.bgUrl = store.head_img;//商家頭像（用于头部背景）
            this.activityStyle = appdata.activity_style;//管理者--活动样式数据
            this.activityLen = store.activity.length;//商家活动数量
          }
        });
      },
//      处理商品和导航数据
      initMenuFoods(store){
        let menus_lists = store.menus_lists;
        let foods_lists = store.foods_lists;
        let arr = [];
        menus_lists.forEach((menu_item,menu_index)=>{
          foods_lists.forEach((food_item,food_index)=>{
            food_item.menus_id.forEach((item,index)=>{
              if(item === menu_item.menus_id){
                arr.push(food_item);
              }
            })
          });
          menu_item.foods = arr;
          arr = [];
        });
        return menus_lists;
      },
//      获取商品列表每一项的高度
      getFoodListHeight() {
        let foodListChild = this.$refs.foodList.children[0].children;
        Array.prototype.slice.call(foodListChild).forEach((item, index) => {
          this.foodListHeight[index] = item.offsetTop
        });
        this.listenScroll(this.$refs.foodList);
      },
//      监听导航和商品列表的滚动
      listenScroll(scrollObj) {
        this.foodscroll = new BetterScroll(scrollObj, {
          probeType: 3,
          deceleration: 0.001,
          bounce: false,
          swipeTime: 2000,
          click: true,
          preventDefault: true
        });
//          商品列表滚动监听
        this.foodscroll.on('scroll', (position) => {
          this.scrollY = Math.abs(Math.round(position.y));
          if (this.menuFoodToggle) {
            this.foodListHeight.forEach((item, index) => {
              if (this.scrollY >= item) {
                this.menuIndex = index;
                this.menuFoodToggle = true;
                const el = this.$refs.menuList.getElementsByClassName('activity_menu')[0];
                this.menuscroll.scrollToElement(el, 800)
              }
            });
          }
        });

        this.foodscroll.on('scrollEnd', () => {
          this.menuFoodToggle = true;
        });

        this.menuscroll = new BetterScroll(this.$refs.menuList, {
          click: true
        });
        this.menuscroll.on('scroll', (position) => {
//            this.scrollY = Math.abs(Math.round(position.y));
        })
      },
//        导航选择
      selectMenu(index, ev) {
        if (!ev._constructed) {
          return;
        }
        this.menuFoodToggle = false;//点击导航时商品滚动不能
        this.menuIndex = index;
        this.foodscroll.scrollTo(0, -this.foodListHeight[index], 400);
      },
//      导航左上角显示的购物车中的商品数量
      initMenuFoodNum(){
        let arr = [];
        this.menusLists.forEach((item,index)=>{
          if(this.cartDataLists){
            let num = 0;
            Object.keys(this.cartDataLists).forEach((key)=>{
              if(this.cartDataLists[key].foods){
                this.cartDataLists[key].foods.menus_id.forEach((menuId)=>{
                  if(item.menus_id === menuId){
                    num+=this.cartDataLists[key].num
                  }
                })
              }
            })
            arr[index] = num
          }else{
            arr[index] = 0
          }
        })
        this.menuFoodNum = arr;
      },

//      食品详情
      foodsDetail(){
        this.foodsDetailShow = true;
      },

      detailStart(ev){
        console.log(ev)
        this.detailTouchY = ev.changedTouches[0].clientY;
      },
      detailMoveUp(ev){


        ev.preventDefault();
        let y = ev.changedTouches[0].clientY;
        let dis = this.detailTouchY - y;
        let moveElement = this.$refs.detailBox;
        if(dis>0){
          let w = dis/5+80;
          dis = -dis+120;
          console.log(w)
          moveElement.style.transform = `translate3d(0,${dis}px,0)`;
          moveElement.style.width = w+'%';
        }
      },

//      监听子组件(addCart)添加购物车的动作
      addCartHandler(target){
        this.INIT_CART();
        this.initMenuFoodNum();
        this.drop(target);
        this.cartIconShowDefault = false;
        this.cartIconShowActive = false;
        this.cartIconShowOpen = true;
      },
//      监听删除购物车的动作
      reduceCartHandler(){
        this.INIT_CART();
        this.initMenuFoodNum();
        if(!this.totalFoodNum){
          this.cartListShow = false;
          this.cartIconShowDefault = true;
          this.cartIconShowActive = false;
          this.cartIconShowOpen = false;
        }
      },

//      打开购物车列表
      openCartLists(){
        if(!this.totalFoodNum){
          this.cartListShow = false;
          return;
        }
        this.cartListShow = !this.cartListShow;
      },

      drop(el) {
        //触发一次事件就会将所有小球进行遍历
        for (let i = 0; i < this.balls.length; i++) {
          let ball = this.balls[i];
          if (!ball.show) { //将false的小球放到dropBalls
            ball.show = true;
            ball.el = el; //设置小球的el属性为一个dom对象
            this.dropBalls.push(ball);
            return;
          }
        }
      },

      beforeDrop(el){ //这个方法的执行是因为这是一个vue的监听事件
        let count = this.balls.length;
        while (count--) {
          let ball = this.balls[count];
          if (ball.show) {
            let rect = ball.el.getBoundingClientRect(); //获取小球的相对于视口的位移(小球高度)
            let x = rect.left - 28;
            let y = -(window.innerHeight - rect.top - 50); //负数,因为是从左上角往下的的方向
            el.style.display = ''; //清空display
            el.style.webkitTransform = `translate3d(0,${y}px,0)`;
            el.style.transform = `translate3d(0,${y}px,0)`;
            //处理内层动画
            let inner = this.$refs.ball.getElementsByClassName('inner-hook')[0]; //使用inner-hook类来单纯被js操作
            inner.style.webkitTransform = `translate3d(${x}px,0,0)`;
            inner.style.transform = `translate3d(${x}px,0,0)`;
          }
        }
      },

      dropping(el, done) { //这个方法的执行是因为这是一个vue的监听事件
        /* eslint-disable no-unused-vars */
        let rf = el.offsetHeight; //触发重绘html
        this.$nextTick(() => { //让动画效果异步执行,提高性能
          el.style.webkitTransform = 'translate3d(0,0,0)';
          el.style.transform = 'translate3d(0,0,0)';
          //处理内层动画
          let inner = this.$refs.ball.getElementsByClassName('inner-hook')[0]; //使用inner-hook类来单纯被js操作
          inner.style.webkitTransform = 'translate3d(0,0,0)';
          inner.style.transform = 'translate3d(0,0,0)';
          el.addEventListener('transitionend', done); //Vue为了知道过渡的完成，必须设置相应的事件监听器。
        });
      },

      afterDrop(el) { //这个方法的执行是因为这是一个vue的监听事件
        let ball = this.dropBalls.shift(); //完成一次动画就删除一个dropBalls的小球
        if (ball) {
          ball.show = false;
          el.style.display = 'none'; //隐藏小球
          this.cartIconShowActive = true;
          this.cartIconShowOpen = false;
        }
      },
//        返回按钮
      goBack() {
        this.$router.go(-1)
      }
    },
    created(){
      this.INIT_CART();
//      初始化加载页面的时候判断是否有选中的商品，有的话购物车图标显示Active的
      if(this.totalFoodNum){
        this.cartIconShowDefault = false;
        this.cartIconShowActive = true;
      }
    },
    mounted() {
      this.init();
      console.log(this.cartDataLists)
      this.$nextTick(() => {
        setTimeout(() => {
          this.getFoodListHeight()
        }, 100)
      })
    },
    watch:{

    }
  }
</script>
<style lang="scss">
  @import "../../style/base";

  .shop {
    display: flex;
    flex-direction: column;
    width: 100%;
    height: 100%;

    /*顶部内容盒子*/
    .header-bg-box {
      background: $background-fff;
      /*顶部背景---模糊处理*/
      .header-bg {
        position: relative;
        width: 100%;
        height: 5rem;
        background-image: url("https://fuss10.elemecdn.com/1/89/56d597e004abf8d30365009c4492bjpeg.jpeg");
        background-repeat: no-repeat;
        background-size: cover;

        .header-bg-cover {
          position: absolute;
          top: 0;
          left: 0;
          z-index: 1;
          width: 100%;
          height: 100%;
          background-image: url("../../images/oj.9.png");
          background-repeat: no-repeat;
          background-size: cover;
          filter: blur(5px);
        }

        .header-bg-blur {
          width: 100%;
          height: 100%;
          overflow: hidden;
          background-image: url("https://fuss10.elemecdn.com/1/89/56d597e004abf8d30365009c4492bjpeg.jpeg");
          background-repeat: no-repeat;
          background-size: cover;
          filter: blur(5px);
        }
      }
      /*返回按钮的盒子*/
      .back-box {
        position: fixed;
        top: 0;
        left: 0;
        z-index: 3;
        padding: 0.5rem 0.8rem;
        width: 100%;
        background: transparent;
        .back-wrap {
          display: flex;
          flex-direction: row;
          justify-content: space-between;
          .back-icon {
            width: 1rem;
            height: 1rem;
            background: url("../../images/back-icon.png") no-repeat;
            background-size: contain;
          }
          div {
            display: flex;
            flex-direction: row;
            .spelling-icon {
              width: 1rem;
              height: 1rem;
              background: url("../../images/spelling-icon.png") no-repeat;
              background-size: contain;
            }
            .cart-icon {
              width: 1rem;
              height: 1rem;
              margin: 0 1rem;
              background: url("../../images/cart-top-icon.png") no-repeat;
              background-size: contain;
            }
            .more-icon {
              width: 1rem;
              height: 1rem;
              background: url("../../images/more-icon.png") no-repeat;
              background-size: contain;
            }
          }
        }
      }
      /*顶部内容*/
      .header {
        position: absolute;
        top: 0;
        left: 0;
        z-index: 2;
        width: 100%;
        /*background: rgba(189,189,189,0.5);*/
        padding: 0 0.7rem;
        padding-top: 1.8rem;

        /*商家信息部分*/
        .seller {
          display: flex;
          flex-direction: row;
          .seller-avater {
            width: 3.8rem;
            height: 3.8rem;
            overflow: hidden;
            border-radius: 5px;
            box-shadow: 0 0 3px #666;
            .avater {
              width: 3.8rem;
              height: 3.8rem;
            }
          }

          .seller-info {
            margin-left: 0.4rem;
            font-size: $font-size-0-5;
            color: $color-fff;
            .title {
              display: flex;
              flex-direction: row;
              justify-content: space-between;
              align-items: center;
              font-size: $font-size-0-9;
              font-weight: bold;

              .text {
                width: 90%;
              }

              .right-icon {
                width: 0.5rem;
                height: 0.8rem;
                background: url("../../images/right-icon.png") no-repeat;
                background-size: contain;
              }
            }
            .brand {
              margin-top: 0.2rem;
              display: flex;
              flex-direction: row;
              .pinpai-icon {
                display: inline-block;
                width: 1.3rem;
                height: 0.75rem;
                background: url("../../images/pinpai.png") no-repeat;
                background-size: contain;
              }
              .take-time {
                padding: 0 0.15rem;
                margin-left: 0.3rem;
                background: linear-gradient(left bottom, #01aaff, #0085ff);
                border-radius: 1px;
              }
            }
          }
        }
      }
    }

    /*商家活动展示部分*/
    .activity-box {
      width: 100%;
      background: $background-fff;
      .activity {
        overflow: hidden;
        padding: 0 0.8rem;
        padding-bottom: 0.5rem;
        padding-top: 1rem;
        font-size: $font-size-0-5;
        background: $background-fff;
        /*列表展示*/
        .active-lists {
          float: left;
          width: 80%;
          .item {
            margin-top: 0.3rem;
            .item-icon {
              padding: 0.1rem;
              color: $color-fff;
              border-radius: 2px;
            }
            .text {
              color: $color-666;
            }
          }
        }
        /*活动数量*/
        .active-num {
          float: left;
          width: 20%;
          padding-top: 0.3rem;
          color: $color-999;
          font-size: $font-size-0-4-5;
          text-align: right;
          /*display: flex;*/
          /*flex-direction: row;*/
          /*justify-content: flex-end;*/
          .active-down {
            display: inline-block;
            width: 0.3rem;
            height: 0.15rem;
            margin-top: 0.25rem;
            margin-left: 0.15rem;
            background: url("../../images/active-down.png") no-repeat;
            background-size: contain;
          }
        }
      }
    }

    /*商品--评价  导航部分*/
    .nav-box {
      background: $background-fff;
      .nav {
        font-size: $font-size-0-7;
        color: $color-666;
        background: $background-fff;
        padding: 0.2rem 0.8rem;
        .goods {
          margin-right: 0.5rem;
          padding-bottom: 0.12rem;
        }
        .commit {
          padding-bottom: 0.12rem;
        }
        .isActive {
          color: $color-primay;
        }
        .underline {
          border-bottom: 2px solid $color-primay;
        }
      }
    }

    /*商品列表*/
    .foodsList {
      background: $background-fff;
      width: 100%;
      display: flex;

      /*食品列表部分*/
      .shop-swiper-box {
        width: 100%;
        display: flex;
        flex-direction: row;

        /*食品导航*/
        .navSwiper {
          width: 3.3rem;
          background: $background-f8;
          font-size: $font-size-0-5;
          color: $color-666;
          overflow-y: auto;

          .lists {
            padding-bottom: 2rem;
            .item {
              position: relative;
              background: $background-f8;
              padding: 0.8rem 0.5rem;
            }
            .activity_menu {
              background: $background-fff;
              color: $color-333;
              font-weight: bold;
            }
            .menus-item-badge{
              position: absolute;
              top: 3px;
              right: 3px;
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
        /*食品列表*/
        .foodSwiper {
          position: relative;
          flex:1;
          /*width: 100%;*/
          background: $background-fff;
          color: $color-666;
          overflow-y: auto;

          .lists {
            padding-bottom: 2rem;
            .item-box {
              padding: 0 0.5rem;
              .item {
                overflow: hidden;
                display: flex;
                flex-direction: column;
                .menu {
                  font-size: $font-size-0-4;
                  padding-top: 0.4rem;
                  padding-bottom: 0.2rem;

                  .title {
                    color: $color-666;
                    font-size: $font-size-0-5;
                    font-weight: bold;
                    margin-right: 0.1rem;
                  }
                }

                .food-list {
                  overflow: hidden;
                  padding: 0.5rem 0;

                  .food-item {
                    display: flex;
                    flex-direction: row;
                    justify-content: space-between;
                    .food-item-img {
                      img {
                        width: 3.2rem;
                        height: 3.2rem;
                        overflow: hidden;
                        border-radius: 2px;
                      }
                    }
                    .food-item-info {
                      width: 100%;
                      margin-left: 0.4rem;
                      h2 {
                        color: $color-333;
                        font-size: $font-size-0-6;
                        font-weight: bold;
                        margin-bottom: 0.1rem;
                      }
                      .des {
                        color: $color-999;
                        font-size: $font-size-0-4;
                        margin-bottom: 0.18rem;
                      }
                      .mouth-sale {
                        color: $color-666;
                        font-size: $font-size-0-4;
                        margin-bottom: 0.18rem;
                      }
                      .price {
                        display: flex;
                        flex-direction: row;
                        justify-content: space-between;
                        .price-sale {
                          font-size: $font-size-0-6;
                          font-weight: bold;
                          color: $color-price;

                          &:before {
                            content: '¥';
                            font-size: $font-size-0-4;
                          }
                        }
                      }
                    }
                  }
                }
              }
            }
          }
        }
      }
    }


    /*底部购物车数量显示*/
    .cart-box{
      width: 100%;
      height: 2.3rem;
      position: fixed;
      bottom: 0;
      left: 0;
      z-index: 5;
      .mint-popup.mint-popup-bottom{
        width: 100%;
        bottom: 2.3rem;
      }

      .cartList{
        width: 100%;
        background: $background-eee;
        .header{
          display: flex;
          flex-direction: row;
          justify-content: space-between;
          padding: 0.3rem 0.5rem;
          color: $color-333;
          font-size: $font-size-0-6;
          h1{
            color: $color-333;
            font-size: $font-size-0-6;
            font-weight: bold;
          }
          .clear{
            display: flex;
            flex-direction: row;
            align-items: center;

            .clear-icon{
              width: 0.6rem;
              height: 0.6rem;
              margin-right: 0.1rem;
              background: url("../../images/clear-icon.png") no-repeat;
              background-size: contain;
            }
          }

        }
        .select-goods-lists{
          background: $background-fff;
          padding: 0 0.5rem;
          .lists{
            padding-top: 0.5rem;
            .item{
              display: flex;
              flex-direction: row;
              padding-bottom: 0.5rem;
              justify-content: space-between;
              .item-name{
                width: 8rem;
                font-size: $font-size-0-7;
                color: $color-666;
              }
              .item-price{
                margin-left: 0.2rem;
                color: $color-price;
                font-size: $font-size-0-7;
                font-weight: bold;
              }
            }
          }
        }
        .many-go{
          padding: 0.3rem 0.5rem;
          font-size: $font-size-0-6;
          color: $color-666;
          display: flex;
          flex-direction: row;
          justify-content: center;
          align-items: center;
          .right-icon{
            margin-left: 0.2rem;
            width: 0.4rem;
            height: 0.6rem;
            background: url("../../images/right1-icon.png") no-repeat;
            background-size: contain;
          }
        }
      }


      .cart-wrap{
        position: fixed;
        bottom: 0;
        left: 0;
        z-index: 2100;
        width: 100%;
        height: 2.3rem;
        background: rgba(61,66,63,0.9);
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
            span{
              font-size: $font-size-0-7;
              font-weight: bold;
            }
          }
          .set-account{
            padding: 0 0.8rem;
            font-size: $font-size-0-7;
            font-weight: bold;
            line-height: 2.3rem;
            color: $color-fff;
            background: $background-totalPrice;
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
        z-index: 2101;
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

    /*底部隐藏的活动列表的popup*/
    .activity-hide-box{
      width: 100%;
      background: $background-fff;
      .mint-popup.mint-popup-bottom{
        width: 100%;
      }
      .activity {
        padding: 0 0.8rem;
        padding-bottom: 0.5rem;
        padding-top: 0.8rem;
        font-size: 0.58rem;
        background: $background-fff;
        .header{
          position: relative;
          box-shadow: 0 2px 3px #fff;
          h1{
            font-size: $font-size-0-7;
            font-weight: bold;
            color: $color-333;
            text-align: center;
          }
          .close-icon{
            position: absolute;
            top: -5px;
            right: -5px;
            width: 0.8rem;
            height: 0.8rem;
            background: url("../../images/popup_close.png") no-repeat;
            background-size: contain;
          }
        }

        /*列表展示*/
        .active-lists {
          float: left;
          width: 80%;
          max-height: 12rem;
          overflow-y: auto;
          padding-top: 0.5rem;
          .item {
            margin-bottom: 0.5rem;
            .item-icon {
              padding: 0.1rem;
              color: $color-fff;
              border-radius: 2px;
              font-size: 0.5rem;
            }
            .text {
              color: $color-666;
            }
          }
        }
      }
    }

    /*食品详情 popup*/
    .foods_detail{
      width: 80%;
      .mint-popup{
        width: 80%;
        .detail_box{
          width: 100%;
          background: $background-fff;
          .detail_img{
            position: relative;
            width: 100%;
            max-height: 15rem;
            overflow: hidden;
            img{
              width: 100%;
            }
            .cover_box{
              position: absolute;
              top: 0;
              left: 0;
              width: 100%;
              height: 100%;
              box-shadow: 0px -30px 80px #333 inset;
              .share_box{
                position: absolute;
                top: 0.5rem;
                right: 0.5rem;
                padding: 0.2rem;
                border-radius: 50%;
                background: $background-777;
                .share_icon{
                  width: 0.9rem;
                  height: 0.9rem;
                  background: url("../../images/share_icon.png") no-repeat;
                  background-size: contain;
                }
              }
              .description{
                position: absolute;
                bottom: 0;
                left: 0;
                padding: 0.5rem;
                color: $color-ddd;
                font-size: $font-size-0-5;
              }
            }
          }
          .detail_content{
            padding: 0.5rem;
            padding-top: 0.8rem;
            .title{
              background-size: contain;
              font-size: $font-size-0-6;
              font-weight: bold;
              color: $color-333;
            }
            .mouth_sale_box{
              .mouth_sale{
                font-size: $font-size-0-4-5;
                color: $color-666;
              }
              .favorate_rate{
                font-size: $font-size-0-4-5;
                color: $color-666;
              }
            }
            .price_box{
              margin-top: 1rem;
              display: flex;
              flex-direction: row;
              justify-content: space-between;
              .price{
                color: $color-price;
              }
              .add_cart_btn{
                width: 3.5rem;
                height: 1.2rem;
                text-align: center;
                line-height: 1.2rem;
                font-size: $font-size-0-5;
                color: $color-fff;
                background: $background-primay;
                border-radius: 0.6rem;
              }
            }
          }
        }
      }
    }



    .ball {
      position: fixed; //小球动画必须脱离html布局流
      left: 28px;
      bottom: 28px;
      z-index: 2000;
      transition: all 0.5s cubic-bezier(0.19, -0.09, 0.75, 0.41);
      .inner {
        width: 1rem;
        height: 1rem;
        color: $color-fff;
        font-size: $font-size-0-7;
        text-align: center;
        line-height: 1rem;
        border-radius: 50%;
        background: $color-primay;
        transition: all 0.5s ease-out;
      }
    }

    /*定义底部购物车动画*/
    .cart-icon-enter-active{
      animation: cart-icon-animate 0.3s;
    }
    .cart-icon-leave-active{
      transition: all 0s;
    }
    .cart-icon-leave-to{
      opacity: 0;
    }

    .cartlists-popup-enter-active{
      transition: all 0.2s;
    }
    .cartlists-popup-enter{
      height: 0;
    }
    .cartlists-popup-enter-to{
      height: 5rem;
    }
    /*定义底部购物车动画*/
    @keyframes cart-icon-animate {
      0%{
        transform: scale(0.6);
      }
      50%{
        transform: scale(1.2);
      }
      85%{
        transform: scale(0.8);
      }
      100%{
        transform: scale(1);
      }
    }
  }


</style>
