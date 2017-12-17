<template>
    <div class="home">
      <div class="header">
        <div class="address-wrap">
          <div class="address-box">
            <span class="address-icon"></span>
            <span class="address-text">地址</span>
            <span class="down-icon"></span>
          </div>
          <div class="weather-box">天气</div>
        </div>
        <!--搜索商品-->
        <div class="search-wrap">
          <span class="search-icon"></span>
          <span class="search-text">搜索商家、商品名称</span>
        </div>
        <!--搜索热词-->
        <div class="search-hot">
          <a href="javascript:;">豆花</a>
          <a href="javascript:;">咖啡</a>
          <a href="javascript:;">鸡蛋灌饼</a>
          <a href="javascript:;">体温计</a>
          <a href="javascript:;">永和大王</a>
          <a href="javascript:;">白加黑</a>
        </div>
      </div>

      <!--食品分类导航-->
      <div class="nav">
        <mt-swipe :auto="0" :continuous="false">
          <mt-swipe-item v-for="item in categorys">
            <div class="food-nav-list">
              <div class="food-nav-item" v-for="i in item">
                <img :src="baseImgUrl+i.imgUrl" alt="">
                <p>{{i.text}}</p>
              </div>
            </div>
          </mt-swipe-item>
        </mt-swipe>
      </div>

      <!--广告banner-->
      <div class="ads">
        <mt-swipe>
          <mt-swipe-item v-for="item in ads">
            <img :src="'static/'+item.imgSrc" alt="">
          </mt-swipe-item>
        </mt-swipe>
      </div>

      <!--热卖推荐-->
      <div class="hot-recommend">
        <div class="recommend-top">
          <div class="recommend-item" v-for="topItem in hotRecommend.top">
            <h2>{{topItem.title}}</h2>
            <p>{{topItem.description}}</p>
            <span>{{topItem.sub}}&nbsp;&gt;</span>
            <img :src="'static/'+topItem.imgSrc" alt="">
          </div>
        </div>
        <div class="recommend-bottom">
          <div class="recommend-item" v-for="bottomItem in hotRecommend.bottom">
            <h2>{{bottomItem.title}}</h2>
            <p><span>{{bottomItem.description}}</span></p>
            <img :src="'static/'+bottomItem.imgSrc" alt="">
          </div>
        </div>
      </div>

      <!--品质优选-->
      <div class="qualityOption">
        <div class="title">
          <h2>{{qualityOption.title}}</h2>
          <a href="javascript:;">更多 &gt;</a>
        </div>
        <div class="list">
          <div class="item" v-for="item in qualityOption.lists">
            <img :src="baseImgUrl+item.imgSrc" alt="">
            <h2>{{item.title}}</h2>
            <p><span>{{qualityOption.subTitle}}</span></p>
          </div>
        </div>
      </div>

      <!--商家列表-->
      <div class="seller">
        <h2 class="seller-title ellipsis">{{sellerListsTitle}}</h2>
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

    </div>
</template>
<script>

import axios from 'axios'
    export default {
      name:'home',
      data(){
        return {
          sellerListsTitle:'推荐商家',
          seller:{},
          activity:[],
          qualityOption:{},
          ads:[],
          hotRecommend:[],
          categorys:[],//导航食品分类数据集合
          baseImgUrl:'https://fuss10.elemecdn.com'//导航食品分类图片域名地址
        }
      },
      methods:{
//        初始化首页数据
        init(){
          axios.get('/api/home').then((response)=>{
            let res = response.data;
            let appdata = res.data.appdata;//app默认加载数据
            let store = res.data.store;//商家数据
            //食品分类初始化数据
            if(!res.status){
              let categorys = appdata.category;
              let len = categorys.length;
              let arr = [];
              for(let i = 0; i < len; i+=8){
                arr.push(categorys.splice(0,8))
              }
              this.categorys = arr;
            }
            //初始化adsBanner数据
            this.ads = appdata.ads_banner;
            //初始化hot-recommend数据
            this.hotRecommend = appdata.hot_recommend;
            //初始化品质优选（qualityOption）的数据
            this.qualityOption = appdata.quality_option;
            //初始化商家列表的数据
            this.seller = store;
            this.activity = appdata.activity_style;
          });
        },
//        点击  进入购物页面，即商家详情页
        goShop(store_id){
          this.$router.push({path:'shop',query: { store_id: store_id }})
        }
      },
      mounted(){
        this.init();
      }
    }
</script>
<style lang="scss">
  @import "../../style/base.scss";

  .home{
    padding-bottom: 2.3rem;

    .header{
      background: $background-primay;
      padding: 0.5rem;
      /*地址*/
      .address-wrap{
        font-size: $font-size-0-3;
        color: $color-fff;
        display: flex;
        flex-direction: row;
        flex-wrap: nowrap;
        justify-content: space-between;
        align-items: flex-end;
        .address-box{
          display: flex;
          flex-direction: row;
          align-items: center;
          font-size: $font-size-0-7;

          .address-icon{
            width: 0.7rem;
            height: 0.7rem;
            background: url("../../images/address-icon.png") no-repeat;
            background-size: contain;
          }
          .down-icon{
            width: 1rem;
            height: 1rem;
            background: url("../../images/down-icon.png") no-repeat;
            background-size: contain;
          }

          .address-text{
            font-weight: bold;
            margin-left: 0.3rem;
            margin-right: 0.3rem;
          }
        }
        .weather-box{
          font-size: $font-size-0-5;
        }
      }
      /*搜索框*/
      .search-wrap{
        height: 1.6rem;
        margin: 0.5rem 0;
        background: $background-fff;
        border-radius: 2px;
        color: $color-bbb;
        display: flex;
        flex-direction: row;
        justify-content: center;
        align-items: center;

        .search-icon{
          width: 0.7rem;
          height: 0.7rem;
          background: url("../../images/search-icon.png") no-repeat;
          background-size: contain;
          margin-right: 0.1rem;
        }
        .search-text{
          font-size: $font-size-0-6;
          font-family: '宋体';
        }
      }
      /*搜搜热词*/
      .search-hot{
        font-size: $font-size-0-5;
        padding: 0 0.2rem;
        display: flex;
        flex-direction: row;
        justify-content: space-between;
        a{
          color: $color-fff;
        }
      }
    }

    /*食品分类导航*/
    .nav{
      height: 7.5rem;
      background: $background-fff;

      .food-nav-list{
        display: flex;
        flex-direction: row;
        flex-wrap: wrap;

        .food-nav-item{
          width: 25%;
          margin-top: 0.5rem;
          text-align: center;
          &>img{
            width: 2rem;
            height: 2rem;
          }
          &>p{
            font-size: $font-size-0-5;
            color: $color-666;
          }
        }
      }

      .mint-swipe-indicator{
        width: 0.5rem;
        height: 0.1rem;
        background: $background-ddd;
        opacity: 1;
        border-radius: 0px;
      }
      .mint-swipe-indicator.is-active{
        background: $background-d4;
      }
    }

    /*adsBanner*/
    .ads{
      height: 4.2rem;
      padding: 0 0.5rem;
      background: $background-fff;

      img{
        width: 100%;
      }
      .mint-swipe-indicators{
        .mint-swipe-indicator{
          width: 0.7rem;
          height: 0.1rem;
          opacity: 0.5;
          background: $background-b4;
          border-radius: 0px;
        }
        .is-active{
          opacity: 0.6;
        }
      }
    }

    /*hot-recommend*/
    .hot-recommend{
      padding: 0.1rem 0.5rem;
      background: $background-fff;

      .recommend-item{
        background: $background-f9;
        padding-top: 0.5rem;
        padding-left: 0.5rem;
        /*display: flex;*/
        /*flex-direction: column;*/

        h2{
          color: $color-333;
          font-size: $font-size-0-7;
          font-weight: bold;
          overflow: hidden;
        }
        p{
          font-size: $font-size-0-6;
          color: $color-666;
          /*font-weight: bold;*/
        }
        span{
          font-size: $font-size-0-6;
          color: $color-333;
        }
        img{
          width: 100%;
        }
      }

      .recommend-top{
        display: flex;
        flex-direction: row;
        justify-content: space-between;

        &>*{
          width: 49.5%;
        }

        &>.recommend-item:nth-of-type(1){
          h2{
            color: $color-e81919;
          }
          span{
            font-weight: bold;
          }
        }
      }

      .recommend-bottom{
        margin-top: 0.1rem;
        display: flex;
        flex-direction: row;
        text-align: center;
        justify-content: space-between;

        &>*{
          width: 32.5%;
        }

        span{
          display: inline-block;
          color: $color-666;
          padding: 0.08rem 0.2rem;
          font-size: $font-size-0-3;
          border: 1px solid $color-666;
          border-radius: 2px;
        }
        img{
          margin-top: 0.5rem;
        }
        &>.recommend-item:nth-of-type(2){
          h2{
            color: $color-e81919;
          }
          img{
            margin-top: 0.8rem;
          }
        }
      }
    }

    /*品质优选(qualityOption)*/
    .qualityOption{
      margin-top: 0.5rem;
      padding: 0.5rem 0.5rem;
      background: $background-fff;

      .title{
        display: flex;
        flex-direction: row;
        justify-content: space-between;
        margin-bottom: 0.5rem;
        align-items: flex-end;
        h2{
          color: $color-ab7d42;
          font-size: $font-size-0-7;
          font-weight: bold;
          overflow: hidden;
        }
        a{
          color: $color-666;
          font-size: $font-size-0-5;
        }
      }

      .list{
        display: flex;
        flex-direction: row;
        justify-content: space-between;
        .item{
          width: 19%;
          text-align: center;
          img{
            width: 2.5rem;
            height: 2.5rem;
            margin:auto;
            border: 1px solid $color-eee;
            border-radius: 2px;
          }
          h2{
            color: $color-333;
            font-size: $font-size-0-6;
            margin: 0.2rem 0;
            font-weight: bold;
            overflow: hidden;
          }
          p{
            margin-top: -0.5rem;
            span{
              padding: 0.1rem 0.2rem;
              font-size: $font-size-0-3;
              color: $color-14b2ff;
              border: 1px solid $color-14b2ff;
            }
          }

        }
      }
    }

    /*商家列表*/
    .seller{
      background: $background-fff;
      margin-top: 0.5rem;
      padding: 0.8rem 0;

      .seller-title{
        padding: 0 0.5rem;
        font-size: $font-size-0-7;
        font-weight: bold;
      }
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

    .mint-tabbar{
      position: fixed;
      z-index: 5000;
    }
  }
</style>
