<template>
    <div class="home">
      <div class="header" ref="searchBox">
        <div class="address-wrap">
          <div class="address-box" @click="goAddress">
            <span class="address-icon"></span>
            <span class="address-text">地址</span>
            <span class="down-icon"></span>
          </div>
          <div class="weather-box">天气</div>
        </div>
        <!--搜索商品-->
        <div class="search-hide">
          <div class="search-box">
            <div class="search-wrap" @click="goSearch">
              <span class="search-icon"></span>
              <span class="search-text">搜索商家、商品名称</span>
            </div>
          </div>
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
        <swiper :options="navSwiperOption" ref="navSwiper">
          <swiper-slide v-for="item in categorys">
            <div class="food-nav-list" @click="goCategory">
              <div class="food-nav-item" v-for="i in item">
                <img :src="baseImgUrl+i.imgUrl" alt="">
                <p>{{i.text}}</p>
              </div>
            </div>
          </swiper-slide>
        </swiper>
        <div class="navSwiper-pagination"></div>
      </div>

      <!--广告banner-->
      <div class="ads">
        <swiper :options="adsSwiperOption" ref="adsSwiper">
          <swiper-slide v-for="item in ads">
            <img :src="'static/'+item.imgSrc" alt="">
          </swiper-slide>

        </swiper>
        <div class="adsSwiper-pagination"></div>
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
        <h2 class="seller-title ellipsis">推荐商家</h2>
        <div class="store_box" ref="storeBox">
          <seller :storeBoxTop="storeBoxTop" :headerHeight="headerHeight" :storeInfo="storeInfo" :activityInfo="activity"></seller>
        </div>
      </div>
    </div>
</template>
<script>
import seller from '../../components/seller/seller'
// import axios from 'axios'
import { home } from '../../service/getData'
    export default {
      name:'home',
      data(){
        return {
          headerHeight:0,
          storeBoxTop:0,
          storeInfo:{},
          activity:[],
          adsSwiperOption:{
            loop:true,
            autoplay:true,
            init:false,//在update钩子中初始化
            pagination:{
              el: '.adsSwiper-pagination'
            }
          },
          navSwiperOption:{
            resistanceRatio:0,//边缘抵抗率
            init:false,//在update钩子中初始化
            pagination:{
              el: '.navSwiper-pagination'
            }
          },
          qualityOption:{},
          ads:[],
          hotRecommend:[],
          categorys:[],//导航食品分类数据集合
          baseImgUrl:'https://fuss10.elemecdn.com'//导航食品分类图片域名地址
        }
      },
      components:{
        seller
      },
      computed:{
        adsSwiper(){
          return this.$refs.adsSwiper.swiper;
        },
        navSwiper(){
          return this.$refs.navSwiper.swiper;
        }
      },
      methods:{
//        初始化首页数据
        init(){
          home().then((response)=>{
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
            this.storeInfo = store;
            console.log(this.storeInfo)
            this.activity = appdata.activity_style;
          });
        },
        // 进入导航分类页
        goCategory(){
          this.$router.push('category')
        },
        // 监听滚动条事件
        scrollHandler(){
          let scrollTop =  window.pageYOffset || document.documentElement.scrollTop || document.body.scrollTop;
          let searchBox = this.$refs.searchBox || null;
          if(searchBox){
            let address = searchBox.getElementsByClassName('address-wrap')[0];
            let search = searchBox.getElementsByClassName('search-box')[0];
            let h = address.offsetHeight;

            //顶部搜索定位控制
            if(scrollTop>=h){
              search.style.position = 'fixed';
            }else{
              search.style.position = 'absolute';
            }
          }
        },
        getHeaderHeight(){
          let headerH = this.$refs.searchBox;
          let headerBoxH = headerH.getElementsByClassName('search-box')[0].offsetHeight;
          let storeBoxT = this.$refs.storeBox.offsetTop;
          this.storeBoxTop = storeBoxT;
          this.headerHeight = headerBoxH;
        },
        goSearch(){
          this.$router.push('search')
        },
        goAddress(){
          this.$router.push('address')
        }
      },
      updated() {
        this.adsSwiper.init();
        this.navSwiper.init();
      },
      mounted(){
        this.init();
        this.$nextTick(()=>{
          window.addEventListener('scroll',this.scrollHandler,false);
          setTimeout(()=>{
            this.getHeaderHeight()
          },500)
        })
      }
    }
</script>
<style lang="scss">
  @import "../../style/base.scss";

  .home{
    padding-bottom: 2.3rem;

    .header{
      position: relative;
      z-index: 3000;
      background: $background-primay;
      /*地址*/
      .address-wrap{
        font-size: $font-size-0-3;
        color: $color-fff;
        padding: 0 0.5rem;
        padding-top: 0.5rem;
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
      .search-hide{
        position: relative;
        width: 100%;
        height: 2.6rem;
        .search-box{
          position: absolute;
          top: 0;
          left: 0;
          z-index: 5000;
          width: 100%;
          padding: 0.5rem;
          background: $background-primay;

          .search-wrap{
            height: 1.6rem;
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
        }
      }


      /*搜搜热词*/
      .search-hot{
        font-size: $font-size-0-5;
        padding: 0 0.5rem;
        padding-bottom: 0.5rem;
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
      position: relative;
      height: 7.8rem;
      background: $background-fff;

      .navSwiper-pagination{
        position: absolute;
        bottom: 0.6rem;
        left: 0;
        right: 0;
        z-index: 1000;
        margin: auto;
        text-align: center;
        .swiper-pagination-bullet{
          width: 0.5rem;
          height: 0.1rem;
          margin: 0 0.2rem;
          border-radius: 0!important;
          background: $background-b4;
          opacity: 0.6;
        }
        .swiper-pagination-bullet-active{
          opacity: 1;
        }
      }

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

      /*.mint-swipe-indicator{
        width: 0.5rem;
        height: 0.1rem;
        background: $background-ddd;
        opacity: 1;
        border-radius: 0px;
      }
      .mint-swipe-indicator.is-active{
        background: $background-d4;
      }*/
    }

    /*adsBanner*/
    .ads{
      position: relative;
      height: 3.8rem;
      padding: 0 0.5rem;
      background: $background-fff;
      .swiper-container{
        width: 100%!important;
      }
      img{
        width: 100%;
      }
      .adsSwiper-pagination{
        position: absolute;
        bottom: 0;
        left: 0;
        right: 0;
        z-index: 1000;
        margin: auto;
        text-align: center;
        .swiper-pagination-bullet{
          width: 0.5rem;
          height: 0.1rem;
          margin: 0 0.2rem;
          border-radius: 0!important;
          background: $background-b4;
        }
        .swiper-pagination-bullet-active{
          background: $background-fff;
        }
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
      padding-top: 0.4rem;
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

    .seller {
      background: $background-fff;
      margin-top: 0.5rem;
      .seller-title{
        padding: 0 0.5rem;
        padding-top: 0.5rem;
        font-size: $font-size-0-7;
        font-weight: bold;
      }
    }
  }
</style>
