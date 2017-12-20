<template>
    <div class="psdlogin">
      <div class="header">
        <div class="header_box">
          <span class="back_icon" @click="goback"></span>
          <h2>密码登录</h2>
        </div>
      </div>

      <div class="input_box border-top">
        <div class="item border-bottom">
          <div class="username">
            <input type="text" placeholder="手机/邮箱/用户名">
          </div>
        </div>
        <div class="item border-bottom">
          <div class="psd">
            <input type="text" placeholder="密码">
          </div>
          <div class="psd_icon"></div>
        </div>
      </div>

      <div class="login_btn">
        <button :class="{btn_bg:btnChange}" @touchstart="login" @touchend="bgEnd">登录</button>
      </div>

      <div class="forget">
        <a href="">忘记密码？</a>
      </div>
    </div>
</template>

<script>
    export default {
      name: "psdlogin",
      data(){
        return {
          btnChange:false
        }
      },
      methods:{
        login(){
          this.btnChange = true;
        },
        bgEnd(){
          this.btnChange = false
        },
        goback(){
          this.$router.go(-1)
        }
      }
    }
</script>

<style lang="scss" scoped>
  @import "../../style/base";
.psdlogin{
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
      .username,.psd{
        flex: 1;
        input{
          width: 100%;
          height: 1.5rem;
          color: $color-333;
          font-size: $font-size-0-6;
          outline: none;
        }
      }
      .psd_icon{
        width: 1rem;
        height: 1rem;
        background: url("../../images/psd.png") no-repeat;
        background-size: contain;
      }
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

  .forget{
    margin-top: 0.5rem;
    padding: 0 0.5rem;
    text-align: right;
    a{
      color: #0088cc;
      font-size: $font-size-0-6;
    }
  }
}
</style>
