<template>
    <div class="pay">
      <div class="header">
        <div class="header_box">
          <div class="header_back">
            <span class="back_icon" @click="goBack"></span>
            <h1 class="back_title">订单配送至</h1>
          </div>
          <div class="address_box">
            <div class="address">
              <span class="address_01">宝莱坞永大路115号</span>
              <span class="address_02">永丰屯68号</span>
              <span class="right-icon"></span>
            </div>
            <div class="username_box">
              <div class="username">
                <span class="name">程路路</span>
                <span class="sex">(先生)</span>
              </div>
              <div class="phone">15201512159</div>
            </div>
          </div>
        </div>
      </div>

      <div class="main">
        <div class="dispatch_time">
          <div class="dispatch_prompt">
            <h2>尽快送达 [ 预计 00:39 ]</h2>
            <div class="dispatch_category">
              <span class="dispatch_icon"></span>
              <span class="schedule_icon"></span>
              <div class="overtime">
                <span class="overtime_info">超时10分钟享赔付</span>
                <span class="problem_icon"></span>
              </div>
            </div>
          </div>
          <div class="right_icon"></div>
        </div>

        <div class="foods_lists">
          <div class="title">
            <span class="double_icon"></span>
            <h2 class="ellipsis">吉祥馄饨 (永丰屯店) </h2>
            <span class="double_icon"></span>
          </div>

          <div class="lists">
            <div v-for="cartFoodItem in cartDataLists">
              <div class="item border-bottom-dashed" v-if="cartFoodItem.num">
                <span class="item_name ellipsis">{{cartFoodItem.foods.name}}</span>
                <span class="item_num">×{{cartFoodItem.num}}</span>
                <span class="item_price">{{cartFoodItem.foods.price | currencyFilter}}</span>
              </div>
            </div>
            <div>
              <div class="item border-bottom-dashed">
                <span class="item_name ellipsis">餐盒</span>
                <span class="item_price">{{2 | currencyFilter}}</span>
              </div>
            </div>
            <div>
              <div class="item border-bottom-dashed">
                <span class="item_name ellipsis">配送费</span>
                <span class="item_price">{{4 | currencyFilter}}</span>
              </div>
            </div>
            <div class="red_packet">
              <div class="name">
                <span class="title">红包</span>
                <span class="contain_store">(含店铺红包)</span>
              </div>
              <div class="ishave_redpacket">
                <div class="nohave">无可用红包</div>
                <div class="right_icon"></div>
              </div>
            </div>
            <div class="double_line_icon"></div>
            <div class="subtotal">
              <div class="reduction">
                <span class="reduction_label">优惠说明</span>
                <span class="problem_icon"></span>
              </div>
              <div class="total">
                <span class="total_label">小计</span>
                <span class="total_price">{{30 | currencyFilter}}</span>
              </div>
            </div>
          </div>
        </div>

        <div class="super_member" @click="checkIconShow = !checkIconShow">
          <div class="label">
            <h2>成为超级会员，本单减5元 <span class="problem_icon"></span></h2>
            <div>每月都送你20元无门槛红包</div>
          </div>
          <div class="price">
            <span class="cost_price">{{15 | currencyFilter}}</span>
            <span class="now_price">{{12 | currencyFilter}}</span>
          </div>
          <div class="check_box">
            <div class="check_icon" id="check">
              <div class="check_icon_default" v-if="!checkIconShow"></div>
              <div class="check_icon_active" v-if="checkIconShow"></div>
            </div>
          </div>
        </div>

        <div class="other">
          <div class="more_online_pay border-bottom-dashed">
            <h2>更多在线支付</h2>
            <div class="right_icon"></div>
          </div>
          <div class="anonymous border-bottom-dashed">
            <div class="label">
              <h2>匿名购买 <div class="problem_icon"></div></h2>
              <div class="prompt" v-if="anonymousPrompt">请留意 [<span>95013</span>] 开头的送货电话</div>
            </div>
            <div class="toggle" ref="toggle" @click.stop="toggleAnonymous">
              <div class="toggle_bar"></div>
            </div>
          </div>
          <div class="hobby">
            <h2>餐具份数/口味偏好</h2>
            <div class="environment">
              <span class="environment_icon"></span>
              <span class="text">马上助力环保</span>
            </div>
            <div class="right_icon"></div>
          </div>
        </div>
      </div>

      <div class="pay_price">
        <div class="pay_price_wrap">
          <div class="pay_total_price">{{30 | currencyFilter}}</div>
          <div class="go_pay">去支付</div>
        </div>
      </div>
    </div>
</template>

<script>
  import { mapState, mapMutations } from 'vuex'
    export default {
      name: "pay",
      data(){
        return {
          checkIconShow:false,
          anonymousPrompt:false,//匿名购买中的提示
        }
      },
      computed:{
        ...mapState(['cartLists']),
        storeId(){
          return this.$route.query.storeId;
        },
        //购物车数据初始化
        cartDataLists(){
          return this.cartLists[this.storeId]
        },
      },
      methods:{
        ...mapMutations(['INIT_CART']),
        initData(){
          console.log(this.cartDataLists)
        },
        // 匿名购买中toggle
        toggleAnonymous(){
          this.anonymousPrompt = !this.anonymousPrompt;
          let toggle = this.$refs.toggle;
          let toggleBar = toggle.getElementsByClassName('toggle_bar')[0];
          if(this.anonymousPrompt){
            toggle.style.background = '#c1e9f7';
            toggleBar.style.transform = 'translate3d(0.5rem,0,0)'
            toggleBar.style.background = '#32b2e0';
          }else{
            toggle.style.background = '#b2b2b2';
            toggleBar.style.transform = 'translate3d(0,0,0)'
            toggleBar.style.background = '#ececec';
          }
        },
        goBack(){
          this.$router.go(-1)
        }
      },
      created(){
        this.INIT_CART();
      },
      mounted(){
        this.initData();
      }
    }
</script>

<style lang="scss" scoped>
  @import '../../style/base';
  .pay{
    .header{
      width: 100%;
      height: 4.2rem;
      .header_box{
        background: $background-primay;
        color: $color-fff;
        width: 100%;
        padding: 0.5rem;
        position: fixed;
        top: 0;
        left: 0;
        z-index: 100;
        .header_back{
          position: relative;
          .back_icon {
            position: absolute;
            top: 0;
            left: 0;
            width: 1rem;
            height: 1rem;
            background: url("../../images/back-icon.png") no-repeat;
            background-size: contain;
          }
          .back_title{
            flex: 1;
            text-align: center;
            font-size: $font-size-0-7;
            font-weight: bold;
          }
        }
        .address_box{
          padding-top: 0.4rem;

          .address{
            display: flex;
            flex-direction: row;
            justify-content: center;
            align-items: center;
            font-size: $font-size-0-7;
            .address_01{
              margin-right: 0.2rem;
              font-weight: bold;
            }
            .address_02{
              margin-right: 0.2rem;
              font-weight: bold;
            }
            .right-icon{
              width: 0.5rem;
              height: 0.8rem;
              background: url("../../images/right-icon.png") no-repeat;
              background-size: contain;
            }
          }
          .username_box{
            display: flex;
            flex-direction: row;
            justify-content: center;
            align-items: center;
            font-size: $font-size-0-6;
            .username{
              margin-right: 0.2rem;
            }
          }
        }
      }
    }

    .main{
      padding: 0.5rem;
      padding-bottom: 3rem;
      .dispatch_time{
        display: flex;
        flex-direction: row;
        justify-content: space-between;
        align-items: center;
        background: $background-fff;
        padding: 0.6rem 0.5rem;
        .dispatch_prompt{
          h2{
            font-size: 0.65rem;
            color: $color-333;
            font-weight: bold;
            margin-bottom: 0.2rem;
          }
          .dispatch_category{
            display: flex;
            flex-direction: row;
            align-items: center;
            .dispatch_icon{
              width: 2rem;
              height: 0.7rem;
              background: url("../../images/za.jpg") no-repeat;
              background-size: contain;
            }
            .schedule_icon{
              width: 1.76rem;
              height: 0.7rem;
              background: url("../../images/zb.jpg") no-repeat;
              background-size: contain;
              margin: 0 0.2rem;
            }
            .overtime{
              display: flex;
              flex-direction: row;
              align-items: center;
              .overtime_info{
                font-size: $font-size-0-5;
                margin-right: 0.2rem;
                color: $color-primay;
              }
            }
          }
        }
      }

      .foods_lists{
        width: 100%;
        padding: 0.5rem;
        margin-top: 0.4rem;
        background: $background-fff;
        .title{
          display: flex;
          flex-direction: row;
          align-items: center;
          justify-content: space-between;
          h2{
            flex: 1;
            text-align: center;
            font-size: 0.65rem;
            font-weight: bold;
            color: $color-333;
            margin: 0 0.5rem;
          }
          .double_icon{
            width: 3.2rem;
            height: 0.1rem;
            background: url("../../images/double-line-icon.jpg") repeat-x;
            background-size: contain;
          }
        }

        .lists{
          margin-top: 0.2rem;
          .item{
            padding: 0.4rem 0;
            display: flex;
            flex-direction: row;
            align-items: center;
            justify-content: space-between;
            .item_name{
              flex: 1;
              font-size: $font-size-0-6;
              color: $color-333;
            }
            .item_num{
              margin: 0 1rem;
              font-size: $font-size-0-6;
              color: $color-333;
            }
            .item_price{
              font-size: $font-size-0-6;
              color: $color-333;
            }
          }

          .red_packet{
            display: flex;
            flex-direction: row;
            align-items: center;
            justify-content: space-between;
            padding: 0.4rem 0;
            .name{
              display: flex;
              flex-direction: row;
              align-items: center;
              .title{
                font-size: $font-size-0-6;
                font-weight: bold;
                color: $color-333;
              }
              .contain_store{
                font-size: $font-size-0-5;
                font-weight: bold;
                color: $color-999;
              }
            }
            .ishave_redpacket{
              display: flex;
              flex-direction: row;
              align-items: center;
              justify-content: space-between;
              .nohave{
                font-size: $font-size-0-5;
                color: $color-666;
              }
            }
          }

          .double_line_icon{
            width: 100%;
            height: 0.15rem;
            background: url("../../images/double-line-icon.jpg") repeat-x;
            background-size: contain;
          }

          .subtotal{
            padding-top: 0.4rem;
            display: flex;
            flex-direction: row;
            align-items: center;
            justify-content: space-between;
            .reduction{
              display: flex;
              flex-direction: row;
              align-items: center;
              .reduction_label{
                font-size: $font-size-0-5;
                color: $color-666;
              }
              .problem_icon{
                width: 0.5rem;
                height: 0.5rem;
                margin-left: 0.3rem;
                background: url("../../images/problem-icon.png") no-repeat;
                background-size: contain;
              }
            }
            .total{
              display: flex;
              flex-direction: row;
              align-items: center;
              .total_label{
                font-size: $font-size-0-6;
                font-weight: bold;
                color: $color-333;
              }
              .total_price{
                margin-left: 0.3rem;
                font-size: $font-size-0-8;
                font-weight: bold;
                color: $color-333;
              }
            }
          }
        }
      }

      .super_member{
        margin-top: 0.4rem;
        height: 3rem;
        padding: 0.5rem;
        background: $background-fff url("../../images/super-member.jpg") repeat-y;
        background-size: 0.1rem auto;
        background-position: left center;
        display: flex;
        flex-direction: row;
        align-items: center;
        justify-content: space-between;
        .label{
          flex: 1;
          h2{
            font-size: $font-size-0-6;
            font-weight: bold;
            color: $color-333;
          }
          div{
            font-size: $font-size-0-5;
            color: $color-999;
          }
        }
        .price{
          margin-right: 1rem;
          .cost_price{
            text-decoration: line-through;
            font-size: $font-size-0-5;
            color: $color-999;
          }
          .now_price{
            font-size: $font-size-0-7;
            color: $color-333;
            font-weight: bold;
          }
        }
        .check_box{
          .check_icon{
            width: 0.8rem;
            height: 0.8rem;
            margin-right: 0.2rem;
            .check_icon_default{
              width: 100%;
              height: 100%;
              background: url("../../images/check-icon-default.png");
              background-size: contain;
            }
            .check_icon_active{
              width: 100%;
              height: 100%;
              background: url("../../images/check-icon-active.png");
              background-size: contain;
            }
          }
        }
      }

      .other{
        margin-top: 0.4rem;
        background-color: $background-fff;
        .more_online_pay{
          padding: 0.4rem 0.5rem;
          display: flex;
          flex-direction: row;
          justify-content: space-between;
          align-items: center;
          h2{
            flex: 1;
            font-size: $font-size-0-6;
            font-weight: bold;
          }
        }
        .anonymous{
          padding: 0.4rem 0.5rem;
          display: flex;
          flex-direction: row;
          justify-content: space-between;
          .label{
            flex: 1;
            h2{
              font-size: $font-size-0-6;
              font-weight: bold;
            }
            .prompt{
              font-size: $font-size-0-5;
              color: $color-999;
              span{
                color: $color-price;
              }
            }
          }
          .toggle{
            position: relative;
            width: 1.5rem;
            height: 0.6rem;
            background: #b2b2b2;
            border-radius: 0.3rem;
            .toggle_bar{
              position: absolute;
              left: 0;
              top: -0.22rem;
              transition: all 0.2s;
              transform: translate3d(-0.2rem,0,0);
              width: 1rem;
              height: 1rem;
              background: #ececec;
              box-shadow: 0 2px 2px #c6c6c6;
              border-radius: 50%;
            }
          }
        }
        .hobby{
          padding: 0.4rem 0.5rem;
          display: flex;
          flex-direction: row;
          justify-content: space-between;
          align-items: center;
          h2{
            flex: 1;
            font-size: $font-size-0-6;
            font-weight: bold;
          }
          .environment{
            display: flex;
            flex-direction: row;
            justify-content: space-between;
            align-items: center;
            .environment_icon{
              width: 0.8rem;
              height: 0.8rem;
              margin-right: 0.3rem  ;
              background: url("../../images/environment.png") no-repeat;
              background-size: contain;
            }
            .text{
              font-size: $font-size-0-5;
              color: #00b773;
            }
          }
        }
      }
    }

    .pay_price{
      position: fixed;
      bottom: 0;
      left: 0;
      width: 100%;
      height: 2.3rem;
      background: rgba(61,66,63,0.9);
      .pay_price_wrap{
        height: 2.3rem;
        display: flex;
        flex-direction: row;
        .pay_total_price{
          flex: 1;
          padding-left: 0.5rem;
          line-height: 2.3rem;
          font-size: $font-size-1-0;
          color: $color-fff;
        }
        .go_pay{
          padding: 0 1.5rem;
          font-size: $font-size-0-7;
          font-weight: bold;
          line-height: 2.3rem;
          color: $color-fff;
          background: $background-totalPrice;
        }
      }
    }
    /*问号图标*/
    .problem_icon{
      display: inline-block;
      width: 0.5rem;
      height: 0.5rem;
      background: url("../../images/problem-icon.png") no-repeat;
      background-size: contain;
    }
    /*右箭头图标*/
    .right_icon{
      width: 0.4rem;
      height: 0.6rem;
      margin-left: 0.5rem;
      background: url("../../images/right2-icon.png") no-repeat;
      background-size: contain;
    }
  }
</style>
