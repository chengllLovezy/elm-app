<template>
    <div class="home">
      <div class="header" ref="searchBox">
        <div class="address-wrap">
          <div class="address-box">
            <span class="address-icon"></span>
            <span class="address-text">地址</span>
            <span class="down-icon"></span>
          </div>
          <div class="weather-box">天气</div>
        </div>
        <!--搜索商品-->
        <div class="search-hide">
          <div class="search-box">
            <div class="search-wrap">
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
        <div class="opare-box" ref="opareBox">
          <div class="opare border-bottom">
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
        <!--<seller :sellerInfo="seller" :activityInfo="activity"></seller>-->
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

      <div class="sort-popup">
        <mt-popup v-model="sortPopupShow" position="top">
          <div class="sort-lists">
            <div class="item" v-for="(sortItem,index) in sortData" :key="index" @click="sortSelectedHandler(index)">
              <span class="label" :class="{selected:sortItem.selected}">{{sortItem.label}}</span>
              <span class="select-icon" v-if="sortItem.selected"></span>
            </div>
          </div>
        </mt-popup>
      </div>
    </div>
</template>
<script>
// import seller from '../../components/seller/seller'
import axios from 'axios'
    export default {
      name:'home',
      data(){
        return {
          cancelScroll:false,
          sortPopupShow:false,//综合排序点击popup
          sortText:'综合排序',
          sortData:[
            {label:'综合排序',selected:true},
            {label:'销量最高',selected:false},
            {label:'起送价最低',selected:false},
            {label:'配送最快',selected:false},
            {label:'配送费最低',selected:false},
            {label:'人均从低到高',selected:false},
            {label:'人均从高到低',selected:false}
          ],
          seller:{},
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
        // seller
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
            console.log(this.seller)
            this.activity = appdata.activity_style;
          });
        },
        // 进入导航分类页
        goCategory(){
          this.$router.push('category')
        },
//        点击  进入购物页面，即商家详情页
        goShop(store_id){
          this.cancelScroll = true;
          this.$router.push({path:'shop',query: { store_id: store_id }})
        },
        // 监听滚动条事件
        scrollHandler(){
          if(this.cancelScroll){
            return;
          }
          let scrollTop =  window.pageYOffset || document.documentElement.scrollTop || document.body.scrollTop;
          let searchBox = this.$refs.searchBox;
          let address = searchBox.getElementsByClassName('address-wrap')[0];
          let search = searchBox.getElementsByClassName('search-box')[0];
          let h = address.offsetHeight;

          let opareBox = this.$refs.opareBox;
          let opare = opareBox.getElementsByClassName('opare')[0];
          let top = opareBox.offsetTop - search.offsetHeight;
          //顶部搜索定位控制
          if(scrollTop>=h){
            search.style.position = 'fixed';
          }else{
            search.style.position = 'absolute';
          }
          //商家筛选排序 定位控制
          if(scrollTop>=top){
            opare.style.position = 'fixed';
            opare.style.top = '2.5rem';
          }else{
            opare.style.position = 'absolute';
            opare.style.top = '0';
          }
        },
        // 综合排序点击popup
        sortPopupHandler(){
          let searchBox = this.$refs.searchBox;
          let search = searchBox.getElementsByClassName('search-box')[0];
          let opareBox = this.$refs.opareBox;
          let opare = opareBox.getElementsByClassName('opare')[0];
          let top = opareBox.offsetTop - search.offsetHeight
          window.scrollTo(0,top);
          this.sortPopupShow = !this.sortPopupShow;
        },
        // 综合排序点击切换
        sortSelectedHandler(i){
          this.sortData.forEach((item,index)=>{
            if(index === i){
              item.selected = true;
              this.sortText = item.label;
            }else{
              this.sortPopupShow = false;
              item.selected = false
            }
          });
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
        })
      }
    }
</script>
<style lang="scss">
  @import "../../style/base.scss";

  .home{
    padding-bottom: 2.3rem;

    .header{
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
        height: 2.5rem;
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

    /*商家列表*/
    .seller{
      background: $background-fff;
      /*margin-top: 0.5rem;
      padding: 0.8rem 0;*/

      .seller-title{
        padding: 0 0.5rem;
        font-size: $font-size-0-7;
        font-weight: bold;
      }

      .opare-box{
        width: 100%;
        height: 2rem;
        position: relative;
        z-index: 4000;
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

    .sort-popup{
      width: 100%;
      .mint-popup{
        width: 100%;
        top: 4.5rem;
        .sort-lists{
          padding: 0.5rem 0.8rem;
          .item{
            padding: 0.4rem 0;
            display: flex;
            flex-direction: row;
            justify-content: space-between;
            align-items: center;
            .label{
              font-size: $font-size-0-6;
              color: $color-333;
            }
            .select-icon{
              width: 0.7rem;
              height: 0.7rem;
              background: url("../../images/select-icon.png") no-repeat;
              background-size: contain;
            }
            .selected{
              font-weight: bold;
              color: $color-primay;
            }
          }
        }
      }
    }
  }
</style>
