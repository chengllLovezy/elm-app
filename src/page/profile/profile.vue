<template>
    <div class="profile">
      <div class="header">
        <div class="header_box">
          <h2>我的</h2>
          <div class="icon">
            <span class="message_icon"></span>
            <span class="set_icon"></span>
          </div>
        </div>
      </div>

      <div class="person_info" @click="login">
        <div class="header_img">
          <img src="../../images/person-img.png" alt="">
        </div>
        <div class="login_box">
          <div class="login">立即登录</div>
          <div class="login_prompt">登录后可享受更多特权</div>
        </div>
        <div class="right_icon"></div>
      </div>

      <div class="money_box border-bottom">
        <div class="money">
          <div class="money_icon"></div>
          <span class="text">钱包</span>
        </div>
        <div class="red_packet border-left">
          <div class="red_packet_icon"></div>
          <span class="text">红包</span>
        </div>
        <div class="gold border-left">
          <div class="gold_icon"></div>
          <span class="text">金币</span>
        </div>
      </div>

      <div class="profile_01 border-top">
        <div class="address_box border-bottom">收获地址</div>
        <div class="collection_box border-bottom">我的收藏</div>
      </div>
      <div class="profile_02 border-top">
        <div class="gold_store border-bottom">金币商城</div>
      </div>
      <div class="profile_03 border-top">
        <div class="custom_service border-bottom">我的客服</div>
        <div class="commit_score border-bottom">欢迎评分</div>
        <div class="work_together border-bottom">加盟合作</div>
      </div>
    </div>
</template>
<script>
  export default {
    name:'profile',
    data(){
      return {
        loginShow:false
      }
    },
    methods:{
      login(){
        this.$router.push('login')
      }
    }
  }
</script>
<style lang="scss">
  @import "../../style/base";
  .profile{
    padding-bottom: 2.6rem;
    .header{
      height: 2.05rem;
      .header_box{
        width: 100%;
        padding: 0.5rem;
        position: fixed;
        top: 0;
        left: 0;
        display: flex;
        flex-direction: row;
        justify-content: space-between;
        align-items: center;
        background: $background-primay;
        h2{
          font-size: $font-size-0-8;
          color: $color-fff;
        }
        .icon{
          display: flex;
          flex-direction: row;
          justify-content: space-between;
          align-items: center;
          .message_icon{
            width: 0.9rem;
            height: 0.9rem;
            margin-right: 1.5rem;
            background: url("../../images/message-icon.png") no-repeat;
            background-size: contain;
          }
          .set_icon{
            width: 0.9rem;
            height: 0.9rem;
            background: url("../../images/set-icon.png") no-repeat;
            background-size: contain;
          }
        }
      }
    }

    .person_info{
      display: flex;
      flex-direction: row;
      justify-content: space-between;
      align-items: center;
      padding: 0.7rem 0.5rem 1.2rem 0.5rem;
      background: $background-primay;
      .header_img{
        width: 3rem;
        height: 3rem;
        img{
          width: 3rem;
          height: 3rem;
        }
      }
      .login_box{
        flex: 1;
        margin-left: 0.8rem;
        color: $color-fff;
        .login{
          margin-bottom: 0.3rem;
          font-size: $font-size-0-8;
        }
        .login_prompt{
          font-size: $font-size-0-5;
          opacity: 0.95;
        }
      }
      .right_icon{
        width: 0.5rem;
        height: 1rem;
        background: url("../../images/right-icon.png") no-repeat;
        background-size: contain;
      }
    }

    .money_box{
      display: flex;
      flex-direction: row;
      justify-content: space-between;
      align-items: center;
      background: #ffffff;
      .money,.red_packet,.gold{
        flex: 1;
        padding: 0.8rem 0;
        text-align: center;
        display: flex;
        flex-direction: column;
      }
      .money_icon{
        width: 1.2rem;
        height: 1.2rem;
        margin: auto;
        background: url("../../images/z4.png") no-repeat;
        background-size: contain;
      }
      .red_packet_icon{
        width: 1.2rem;
        height: 1.2rem;
        margin: auto;
        background: url("../../images/z6.png") no-repeat;
        background-size: contain;
      }
      .gold_icon{
        width: 1.2rem;
        height: 1.2rem;
        margin: auto;
        background: url("../../images/z5.png") no-repeat;
        background-size: contain;
      }
      .text{
        margin-top: 0.1rem;
        font-size: $font-size-0-5;
        color: $color-333;
      }
    }

    .profile_01{
      font-size: $font-size-0-7;
      background: #ffffff;
      margin-top: 0.4rem;
      .address_box{
        padding: 0.5rem 0;
        padding-left: 2rem;
        background: url("../../images/a6_.png") no-repeat;
        background-size: 0.9rem 0.9rem;
        background-position: 0.5rem center;
      }
      .collection_box{
        padding: 0.5rem 0;
        padding-left: 2rem;
        background: url("../../images/a6d.png") no-repeat;
        background-size: 0.9rem 0.9rem;
        background-position: 0.5rem center;
      }
    }

    .profile_02{
      font-size: $font-size-0-7;
      background: #ffffff;
      margin-top: 0.4rem;
      .gold_store{
        padding: 0.5rem 0;
        padding-left: 2rem;
        background: url("../../images/a6f.png") no-repeat;
        background-size: 0.9rem 0.9rem;
        background-position: 0.5rem center;
      }
    }

    .profile_03{
      font-size: $font-size-0-7;
      background: #ffffff;
      margin-top: 0.4rem;
      .custom_service{
        padding: 0.5rem 0;
        padding-left: 2rem;
        background: url("../../images/a6k.png") no-repeat;
        background-size: 0.9rem 0.9rem;
        background-position: 0.5rem center;
      }
      .commit_score{
        padding: 0.5rem 0;
        padding-left: 2rem;
        background: url("../../images/a6m.png") no-repeat;
        background-size: 0.9rem 0.9rem;
        background-position: 0.5rem center;
      }
      .work_together{
        padding: 0.5rem 0;
        padding-left: 2rem;
        background: url("../../images/a6h.png") no-repeat;
        background-size: 0.9rem 0.9rem;
        background-position: 0.5rem center;
      }
    }
  }
</style>
