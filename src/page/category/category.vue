<template>
    <div class="category">
      <div class="header">
        <div class="header_box" ref="header">
          <div class="header_back">
            <span class="back_icon" @click="goBack"></span>
            <h1 class="back_title">美食</h1>
            <span class="search_icon"></span>
          </div>
          <div class="nav" v-show="!navShow">
            <div class="list">
              <div class="item" v-for="(item,index) in navData" :key="index" :class="{active:item.selected}">
                {{item.label}}
              </div>
              <div class="down_icon" @click="navShow = !navShow"></div>
            </div>
          </div>
          <div class="select_category" v-show="navShow">
            <h2>请选择分类</h2>
            <div class="top_icon" @click="navShow = !navShow"></div>
          </div>
        </div>
      </div>

      <div class="hot_sale">
        <div class="title">
          <h2>热卖套餐</h2>
          <a href="">更多</a>
        </div>
        <div class="list">
          <div class="item">
            <div class="item_img">
              <img src="https://fuss10.elemecdn.com/8/2d/3d121119f78f24f3234deb5a0223djpeg.jpeg" alt="">
            </div>
            <h3 class="ellipsis">黄焖鸡+鱼豆腐</h3>
            <p>17人好评</p>
            <div class="price_box">
              <div class="price">{{26 | currencyFilter}}</div>
              <div class="minus border-01">满25减13</div>
            </div>
          </div>
          <div class="item">
            <div class="item_img">
              <img src="https://fuss10.elemecdn.com/8/2d/3d121119f78f24f3234deb5a0223djpeg.jpeg" alt="">
            </div>
            <h3 class="ellipsis">黄焖鸡+鱼豆腐</h3>
            <p>17人好评</p>
            <div class="price_box">
              <div class="price">{{26 | currencyFilter}}</div>
              <div class="minus border-01">满25减13</div>
            </div>
          </div>
          <div class="item">
            <div class="item_img">
              <img src="https://fuss10.elemecdn.com/8/2d/3d121119f78f24f3234deb5a0223djpeg.jpeg" alt="">
            </div>
            <h3 class="ellipsis">黄焖鸡+鱼豆腐</h3>
            <p>17人好评</p>
            <div class="price_box">
              <div class="price">{{26 | currencyFilter}}</div>
              <div class="minus border-01">满25减13</div>
            </div>
          </div>
        </div>
      </div>

      <div class="store_box" ref="storeBox">
        <seller :storeBoxTop="storeBoxTop" :headerHeight="headerHeight" :storeInfo="storeInfo" :activityInfo="activity"></seller>
      </div>

      <mt-popup v-model="navShow" position="top">
        <div class="category_box">
          <div class="category_nav">
            <div class="list">
              <div class="item border-right" v-for="(item,index) in category" :class="{active:index==categoryIndex}" :key="index" @click.stop="selectedCategory(index)">
                <div class="item_content">
                  <span class="name">{{item.text}}</span>
                  <span class="num border-02">{{2000}}</span>
                </div>
              </div>
            </div>
          </div>
          <div class="category_subnav">
            <div class="list">
              <div class="item" v-for="(item,index) in category" :key="index">
                <div class="item_content">
                  <img :src="baseImgUrl+item.imgUrl" alt="">
                  <span class="name">{{item.text}}</span>
                  <span class="num border-02">{{2000}}</span>
                </div>
              </div>
            </div>
          </div>
        </div>
      </mt-popup>
    </div>
</template>

<script>
  import seller from '../../components/seller/seller'
  import { home } from '../../service/getData'
  export default {
    name: "category",
    data(){
      return {
        navData:[
          {label:'全部',selected:true},
          {label:'香锅冒菜',selected:false},
          {label:'简餐便当',selected:false},
          {label:'面食粥点',selected:false}
        ],
        storeInfo:[],
        activity:[],
        storeBoxTop:0,
        headerHeight:0,
        navShow:false,
        category:[],
        categoryIndex:0,
        baseImgUrl:'https://fuss10.elemecdn.com'
      }
    },
    components:{
      seller
    },
    methods:{
      init(){
        home().then((response)=>{
          let res = response.data.data;
          let appData = res.appdata;
          this.category = appData.category;
          this.storeInfo = res.store;
          this.activity = appData.activity_style;
        })
      },
      getStoreBoxHeight(){
        let scrollTop = document.documentElement.scrollTop || window.pageYOffset || document.body.scrollTop;
        let storeBox = this.$refs.storeBox;
        let header = this.$refs.header;
        this.storeBoxTop = storeBox.offsetTop;
        this.headerHeight = header.offsetHeight;
      },
      selectedCategory(index){
        this.categoryIndex = index;
      },
      goBack(){
        this.$router.go(-1);
      }
    },
    mounted(){
      this.init();
      this.$nextTick(()=>{
        setTimeout(()=>{
          this.getStoreBoxHeight()
        },100)
      })
    }
  }
</script>

<style lang="scss" scoped>
  @import '../../style/base';
  .category{
    .header{
      width: 100%;
      height: 3.6rem;
      .header_box{
        background: $background-primay;
        color: $color-fff;
        width: 100%;
        position: fixed;
        top: 0;
        left: 0;
        z-index: 2100;
        .header_back{
          padding: 0.5rem;
          display: flex;
          flex-direction: row;
          justify-content: space-between;
          align-items: center;
          .back_icon {
            width: 1rem;
            height: 1rem;
            background: url("../../images/back-icon.png") no-repeat;
            background-size: contain;
          }
          .back_title{
            flex: 1;
            margin-left: 1.2rem;
            font-size: $font-size-0-8;
          }
          .search_icon{
            width: 0.8rem;
            height: 0.8rem;
            background: url("../../images/search-icon-02.png") no-repeat;
            background-size: contain;
          }
        }
        .nav{
          .list{
            display: flex;
            flex-direction: row;
            justify-content: space-between;
            align-items: center;
            .item{
              flex: 1;
              color: $color-fff;
              font-size: $font-size-0-6;
              opacity: 0.8;
              padding: 0.3rem 0;
              text-align: center;
            }
            .active{
              opacity: 1;
              font-weight: bold;
              border-bottom: 2px solid #ffffff;
            }
            .down_icon{
              width: 0.7rem;
              height: 0.35rem;
              margin-left: 0.9rem;
              margin-right: 0.5rem;
              background: url("../../images/down-icon-02.png") no-repeat;
              background-size: contain;
              position: relative;
              &:after{
                content: '';
                position: absolute;
                top: -0.4rem;
                left: -1.1rem;
                width: 0.4rem;
                height: 1.4rem;
                background: url("../../images/line-icon-02.png") no-repeat;
                background-size: contain;
              }
            }
          }
        }
        .select_category{
          background: #f5f5f5;
          padding: 0.3rem 0.5rem;
          display: flex;
          flex-direction: row;
          justify-content: space-between;
          align-items: center;
          h2{
            font-size: $font-size-0-6;
            font-weight: bold;
            color: $color-333;
          }
          .top_icon{
            width: 0.8rem;
            height: 0.4rem;
            background: url("../../images/top-icon.png") no-repeat;
            background-size: contain;
          }
        }
      }
    }

    .hot_sale{
      background: $background-fff;
      padding-top: 0.8rem;
      .title{
        display: flex;
        flex-direction: row;
        justify-content: space-between;
        align-items: center;
        padding: 0 0.5rem;
        h2{
          font-size: $font-size-0-7;
          font-weight: bold;
          color: $color-333;
        }
        a{
          font-size: 0.55rem;
          color: $color-666;
          padding-right: 0.5rem;
          position: relative;
          &:after{
            content: '';
            position: absolute;
            right: 0;
            top: 0;
            bottom: 0;
            margin: auto;
            width: 0.35rem;
            height: 0.5rem;
            background: url("../../images/right1-icon.png") no-repeat;
            background-size: contain;
          }
        }
      }
      .list{
        display: flex;
        flex-direction: row;
        justify-content: space-between;
        align-items: center;
        padding: 0.2rem 0.5rem;
        .item{
          width: 32%;
          .item_img{
            width: 100%;
            img{
              width: 100%;
              height: auto;
            }
          }
          h3{
            font-size: $font-size-0-6;
            font-weight: bold;
            color: $color-333;
            margin-top: 0.3rem;
          }
          p{
            font-size: $font-size-0-4;
            color: $color-999;
          }
          .price_box{
            display: flex;
            flex-direction: row;
            align-items: center;
            .price{
              font-size: $font-size-0-6;
              font-weight: bold;
              color: $color-333;
              margin: 0.2rem 0;
              margin-right: 0.3rem;
            }
            .minus{
              padding: 0 0.2rem;
              font-size: $font-size-0-4;
              color: $color-price;
            }
          }
        }
      }
    }
    .store_box{
      margin-top: 0.5rem;
    }

    .mint-popup{
      width: 100%;
    }
    .category_box{
      width: 100%;
      position: absolute;
      top: 3.5rem;
      left: 0;
      background: #ffffff;
      display: flex;
      flex-direction: row;
      justify-content: space-between;
      .category_nav{
        width: 30%;
        height: 15rem;
        overflow-y: auto;
        .list{
          .item{
            width: 100%;
            padding: 0.7rem 0;
            background: #fcfcfc;
            .item_content{
              display: flex;
              flex-direction: row;
              justify-content: space-between;
              align-items: center;
              padding: 0.1rem 0;
              padding-left: 0.5rem;
              padding-right: 0.2rem;

              .name{
                font-size: $font-size-0-6;
                color: $color-333;
              }
              .num{
                font-size: $font-size-0-4;
                color: $color-999;
                padding: 0 0.1rem;
              }
            }
            .active{
              background: #ffffff;
              border-left: 3px solid $color-primay;
            }
          }
        }
      }
      .category_subnav{
        width: 70%;
        height: 15rem;
        overflow-y: auto;
        .list{
          .item{
            padding: 0.35rem 0;
            background: #fcfcfc;
            .item_content{
              display: flex;
              flex-direction: row;
              justify-content: space-between;
              align-items: center;
              padding: 0.1rem 0;
              padding-left: 0.5rem;
              padding-right: 0.5rem;

              img{
                width: 1.6rem;
                height: 1.6rem;
              }
              .name{
                flex: 1;
                margin-left: 0.5rem;
                font-size: $font-size-0-6;
                color: $color-333;
              }
              .num{
                font-size: $font-size-0-4;
                color: $color-999;
                padding: 0 0.2rem;
              }
            }
            .active{
              background: #ffffff;
            }
          }
        }
      }
    }
  }

</style>
