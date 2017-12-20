<template>
    <div class="login">
      <div class="header">
        <div class="header_box">
          <span class="back_icon" @click="goback"></span>
          <h2>登录</h2>
          <div class="psd_login" @click="openPsdLoginPopup">密码登录</div>
        </div>
      </div>

      <div class="input_box border-top">
        <div class="item border-bottom">
          <div class="phone">
            <input type="text" placeholder="手机号">
          </div>
          <div class="getIden">获取验证码</div>
        </div>
        <div class="item border-bottom">
          <div class="iden">
            <input type="text" placeholder="验证码">
          </div>
        </div>
      </div>

      <p class="prompt">温馨提示: 未注册***账号的手机号，登录时将自动注册，且代表您已同意 <a href="">《用户服务协议》</a></p>

      <div class="login_btn">
        <button :class="{btn_bg:btnChange}" @touchstart="login" @touchend="bgEnd">登录</button>
      </div>

      <div class="other_login">
        <p>第三方登录</p>
        <div class="list">
          <div class="item">
            <div class="img">
              <img src="../../images/a6p.png" alt="">
            </div>
            <span>微信</span>
          </div>
          <div class="item">
            <div class="img">
              <img src="../../images/a6z.png" alt="">
            </div>
            <span>QQ</span>
          </div>
          <div class="item">
            <div class="img">
              <img src="../../images/a6o.png" alt="">
            </div>
            <span>微博</span>
          </div>
          <div class="item">
            <div class="img">
              <img src="../../images/a68.png" alt="">
            </div>
            <span>淘宝</span>
          </div>
        </div>
      </div>
    </div>
</template>

<script>
    export default {
      name: "login",
      data(){
        return {
          btnChange:false,
          psdLoginShow:false
        }
      },
      methods:{
        login(){
          this.btnChange = true;
        },
        bgEnd(){
          this.btnChange = false
        },
        openPsdLoginPopup(){
          this.$router.push('psdlogin')
        },
        goback(){
          this.$router.go(-1)
        }
      }
    }
</script>

<style lang="scss" scoped>
  @import "../../style/base";
.login{
  display: flex;
  flex-direction: column;
  justify-content: space-between;
  width: 100%;
  height: 100%;
  .header{
    height: 2.05rem;
    .header_box{
      display: flex;
      flex-direction: row;
      justify-content: space-between;
      align-items: center;
      color: #ffffff;
      background: $background-primay;
      padding: 0.5rem;
      .back_icon{
        width: 1rem;
        height: 1rem;
        background: url("../../images/back-icon.png") no-repeat;
        background-size: contain;
      }
      h2{
        flex: 1;
        margin-left: 1rem;
        font-size: $font-size-0-8;
      }
      .psd_login{
        font-size: $font-size-0-7;
        font-weight: bold;
      }
    }
  }

  .input_box{
    margin-top: 0.5rem;
    background: #ffffff;
    .item{
      padding: 0 0.5rem;
      display: flex;
      flex-direction: row;
      justify-content: space-between;
      align-items: center;
      height: 2.2rem;
      .phone,.iden{
        flex: 1;
        input{
          width: 100%;
          height: 1.5rem;
          color: $color-333;
          font-size: $font-size-0-6;
          outline: none;
        }
      }
      .getIden{
        font-size: $font-size-0-7;
        color: #ffffff;
        padding: 0.4rem;
        background: $background-primay;
      }
    }
  }

  .prompt{
    margin-top: 0.5rem;
    padding: 0 0.5rem;
    font-size: $font-size-0-6;
    color: $color-333;
    a{
      color: #0088cc;
    }
  }
  .login_btn{
    margin-top: 1rem;
    padding: 0 0.5rem;
    button{
      width: 100%;
      background: #4dc060;
      color: #ffffff;
      font-size: $font-size-0-8;
      text-align: center;
      padding: 0.5rem 0;
      border-radius: 3px;
      outline: none;
    }
    .btn_bg{
      background: #25a044;
    }
  }

  .other_login{
    flex: 1;
    padding: 0 0.5rem;
    padding-bottom: 1rem;
    text-align: center;
    position: relative;
    p{
      position: absolute;
      bottom: 4.5rem;
      left: 0;
      width: 100%;
      font-size: $font-size-0-6;
      color: $color-666;
    }
    .list{
      position: absolute;
      bottom: 1rem;
      left: 0;
      padding: 0 1rem;
      width: 100%;
      display: flex;
      flex-direction: row;
      justify-content: space-between;
      align-items: center;
      .item{
        display: flex;
        flex-direction: column;
        justify-content: space-between;
        align-items: center;
        .img{
          width: 1.8rem;
          height: 1.8rem;
          img{
            width: 1.8rem;
            height: 1.8rem;
          }
        }
        span{
          margin-top: 0.2rem;
          font-size: $font-size-0-4;
          color: $color-666;
        }
      }
    }
  }
}
</style>
