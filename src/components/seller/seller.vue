<template>
    <div class="sellerCom">

      <div class="opare-box">
        <div class="opare border-bottom" ref="opareBox">
          <div class="sort" @click="sortPopupHandler">
            <span class="label ellipsis">{{sortText}}</span>
            <span class="down-icon"></span>
          </div>
          <div class="favorite">好评优先</div>
          <div class="distance">距离最近</div>
          <div class="filter">
            <span class="label">筛选</span>
            <span class="filter-icon"></span>
          </div>
        </div>
      </div>

      <div class="seller">
        <div class="seller-item border-bottom" v-for="item in seller" @click="goShop(item._id)">
          <div class="avater">
            <img :src="baseImgUrl+item.head_img" alt="">
          </div>
          <div class="main">
            <!--商家名称-->
            <div class="title">
              <h2><i class="icon-brand">品牌</i>{{item.store_name}}</h2>
              <ul>
                <li><span class="border">票</span></li>
              </ul>
            </div>
            <!--五星评价部分-->
            <div class="rate">
              <div class="rate-info">
                <div class="rate-star">
                  <div class="rate-default">
                    <icon name="rate"></icon>
                  </div>
                  <div class="rate-active">
                    <icon name="rate-active"></icon>
                  </div>
                </div>
                <span class="rate-score">{{item.score.total_score}}</span>
                <span class="salenum">月售{{item.mouth_sale}}单</span>
              </div>
              <div class="rate-icon">
                <div class="rate-za"></div>
              </div>
            </div>
            <!--起送 配送部分-->
            <div class="moneylimit border-bottom">
              <div class="money-box">
                <span class="after-line">{{item.money_limit | currencyFilter}}起送</span>
                <span>配送费{{item.money_dispatch | currencyFilter}}</span>
              </div>
              <div class="distance-time">
                <span class="distance after-line">1.54km</span>
                <span class="time">26分钟</span>
              </div>
            </div>

            <!--活动展示部分-->
            <div class="activity">
              <div class="avtive-lists">
                <!--活动列表-->
                <div class="item ellipsis" v-for="active_item in item.activity">
                  <!--减  首  特  的样式-->
                  <span class="item-icon" v-for="active_icon in activity" v-if="active_icon.active_id === active_item.active_id" :style="{background:active_icon.bgcolor}">{{active_icon.text}}</span>
                  <span class="text">{{active_item.contentText}}</span>
                </div>
              </div>
              <!--活动数量-->
              <div class="active-num" v-if="item.activity.length">
                <span>{{item.activity.length}}个活动</span>
                <span class="active-down"></span>
              </div>
            </div>
          </div>
        </div>
      </div>

      <div class="sort-popup" ref="sortPopup">
        <mt-popup v-model="sortPopupShow" position="top">
          <div class="sort-lists">
            <div class="item" v-for="(sortItem,index) in sortData" :key="index" @click="sortSelectedHandler(index)">
              <span class="label" :class="{selected:index==selectedIndex}">{{sortItem.label}}</span>
              <span class="select-icon" v-if="index==selectedIndex"></span>
            </div>
          </div>
        </mt-popup>
      </div>
    </div>
</template>

<script>
  export default {
    name:'seller',
    props:['storeInfo','activityInfo','storeBoxTop','headerHeight'],
    data(){
      return {
        sortPopupShow:false,//综合排序点击popup
        sortText:'综合排序',
        sortData:[
          {label:'综合排序'},
          {label:'销量最高'},
          {label:'起送价最低'},
          {label:'配送最快'},
          {label:'配送费最低'},
          {label:'人均从低到高'},
          {label:'人均从高到低'}
        ],
        selectedIndex:0,
        baseImgUrl:'https://fuss10.elemecdn.com'
      }
    },
    computed:{
      seller(){
        return this.storeInfo;
      },
      activity(){
        return this.activityInfo;
      },
      storeT(){
        return this.storeBoxTop;
      },
      headerH(){
        return this.headerHeight;
      }
    },
    methods:{
//        初始化首页数据
      init(){
        console.log(this.sellerInfo)
      },
//        点击  进入购物页面，即商家详情页
      goShop(store_id){
        this.$router.push({path:'shop',query: { store_id: store_id }})
      },
      // 监听滚动条事件
      scrollHandler(){
        let opareBox = this.$refs.opareBox || null;
        let scrollTop = document.documentElement.scrollTop || window.pageYOffset || document.body.scrollTop;
        let storeT = this.storeT || 0;//store距离文档顶端的距离
        let headerH = this.headerH || 0;//头部定位元素的高度
        let dis = storeT - headerH - scrollTop;
        if(opareBox){
          if(dis<=0){
            opareBox.style.position = 'fixed';
            opareBox.style.top = headerH + 'px';
          }else{
            opareBox.style.position = 'absolute';
            opareBox.style.top = 0;
          }
        }
      },
      // 综合排序点击popup
      sortPopupHandler(){
        let h = this.$refs.opareBox.offsetHeight;
        let storeT = this.storeT;//store距离文档顶端的距离
        let headerH = this.headerH;//头部定位元素的高度
        let dis = storeT - headerH;
        let sortPopup = this.$refs.sortPopup.getElementsByClassName('mint-popup')[0];
        sortPopup.style.top = (headerH + h) + 'px';
        window.scrollTo(0,dis);
        this.sortPopupShow = !this.sortPopupShow;
      },
      // 综合排序点击切换
      sortSelectedHandler(i){
        this.selectedIndex = i;
        this.sortPopupShow = false;
      },
      scrollCancleHandler(ev){
        if(this.sortPopupShow){
          ev.preventDefault();
        }
        return;
      }
    },
    mounted(){
      this.init();
      this.$nextTick(()=>{
        window.addEventListener('scroll',this.scrollHandler,false);
        window.addEventListener('touchmove',this.scrollCancleHandler,{passive: false});
      })
    }
  }
</script>

<style lang="scss" scoped>
  @import "../../style/base.scss";
  .sellerCom{
    position: relative;
    .opare-box{
      width: 100%;
      height: 2rem;
      position: relative;
      z-index: 2100;
      .opare{
        position: absolute;
        left: 0;
        top: 0;
        width: 100%;
        height: 2rem;
        background: $background-fff;
        padding: 0 0.5rem;
        display: flex;
        flex-direction: row;
        align-items: center;
        justify-content: space-between;
        font-size: $font-size-0-6;
        color: $color-666;
        .sort{
          display: flex;
          flex-direction: row;
          align-items: center;
          justify-content: flex-start;
          .label{
            width: 2.6rem;
            font-size: $font-size-0-6;
            color: $color-333;
            font-weight: bold;
          }
          .down-icon{
            width: 0.5rem;
            height: 1rem;
            margin-left: 0.2rem;
            background: url("../../images/down-icon-01.png") no-repeat;
            background-size: contain;
          }
        }
        .favorite,.distance{
          text-align: center;
          width: 25%;
        }
        .filter{
          text-align: center;
          display: flex;
          flex-direction: row;
          justify-content: flex-end;
          align-items: center;
          .label{
            font-size: $font-size-0-6;
            color: $color-666;
          }
          .filter-icon{
            width: 0.55rem;
            height: 0.55rem;
            margin-left: 0.2rem;
            background: url("../../images/filter-icon.jpg") no-repeat;
            background-size: contain;
          }
        }
      }
    }

    .seller{
      background: $background-fff;
      /*margin-top: 0.5rem;
      padding: 0.8rem 0;*/
      /*商家列表item*/
      .seller-item{
        display: flex;
        flex-direction: row;
        /*border-bottom: 1px solid $color-ccc;*/
        padding: 0.8rem 0.5rem;
        /*头像*/
        .avater{
          img{
            width: 3rem;
            height: 3rem;
            border: 1px solid $color-eee;
          }
        }
        /*主要内容*/
        .main{
          width: 100%;
          margin-left: 0.4rem;
          /*商家name*/
          .title{
            /*margin-bottom: 0.1rem;*/
            display: flex;
            flex-direction: row;
            justify-content: space-between;
            h2{
              max-width: 80%;
              font-size: $font-size-0-7;
              font-weight: 700;
              align-items: center;
              .icon-brand{
                display: inline-block;
                padding: 0.1rem;
                font-size: 0.25rem;
                font-weight: 700;
                transform: scale(0.9);
                transform-origin: 0 0;
                color: $color-6f3f15;
                background: linear-gradient(-139deg,#fff100,#ffe339);
              }
            }
            ul{
              display: flex;
              flex-direction: row;
              li{
                margin-left: 0.5rem;
                display: flex;
                flex-direction: column;
                justify-content: center;
                span{
                  width: 0.8rem;
                  height: 0.8rem;
                  font-size: $font-size-0-3;
                  color: $color-999;
                }
              }
            }
          }
          /*商家评分*/
          .rate{
            margin-bottom: 0.2rem;
            font-size: $font-size-0-5;
            color: $color-666;
            display: flex;
            flex-direction: row;
            justify-content: space-between;
            align-items: center;

            .rate-info{
              .rate-star{
                display: inline-block;
                position: relative;

                .rate-active{
                  width: 50%;
                  overflow: hidden;
                  position: absolute;
                  top: 0;
                  left: 0;
                  z-index: 2;
                }
              }

              .rate-score{
                margin-left: 0.3rem;
                margin-right: 0.3rem;
              }
            }
            .rate-icon{
              .rate-za{
                width: 2rem;
                height: 0.6rem;
                background: url("../../images/za.jpg") no-repeat;
                background-size: contain;
              }
            }
          }
          /*商家配送*/
          .moneylimit{
            font-size: $font-size-0-4-5;
            color: $color-666;
            display: flex;
            flex-direction: row;
            justify-content: space-between;
            padding-bottom: 0.3rem;

            .after-line:after{
              content: '|';
              color: $color-ddd;
              margin: 0 0.1rem 0 0.2rem;
            }
          }

          /*商家活动展示部分*/
          .activity{
            padding-bottom: 0.5rem;
            display: flex;
            flex-direction: row;
            font-size: $font-size-0-5;
            /*列表展示*/
            .avtive-lists{
              width: 70%;
              .item{
                margin-top: 0.3rem;
                .item-icon{
                  padding: 0.1rem;
                  color: $color-fff;
                  border-radius: 2px;
                }
                .text{
                  color: $color-666;
                }
              }
            }
            /*活动数量*/
            .active-num{
              width: 30%;
              padding-top: 0.3rem;
              color: $color-999;
              font-size: $font-size-0-4-5;
              text-align: right;
              display: flex;
              flex-direction: row;
              justify-content: flex-end;
              .active-down{
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
      }
    }

    .sort-popup {
      width: 100%;
      .mint-popup {
        width: 100%;
        top: 4.5rem;
        .sort-lists {
          padding: 0.5rem 0.8rem;
          .item {
            padding: 0.4rem 0;
            display: flex;
            flex-direction: row;
            justify-content: space-between;
            align-items: center;
            .label {
              font-size: $font-size-0-6;
              color: $color-333;
            }
            .select-icon {
              width: 0.7rem;
              height: 0.7rem;
              background: url("../../images/select-icon.png") no-repeat;
              background-size: contain;
            }
            .selected {
              font-weight: bold;
              color: $color-primay;
            }
          }
        }
      }
    }
  }
</style>
