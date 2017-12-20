<template>
    <div class="address">
      <div class="header">
        <div class="header_box">
          <span class="back_icon"></span>
          <h2>选择收货地址</h2>
          <button>新增地址</button>
        </div>
      </div>
    </div>
</template>

<script>
    export default {
        name: "address"
    }
</script>

<style lang="scss" scoped>
  @import "../../style/base";
.address{
  .header{
    height: 2.1rem;
    background: $background-primay;
    .header_box{
      width: 100%;
      position: fixed;
      top: 0;
      left: 0;
      display: flex;
      flex-direction: row;
      justify-content: space-between;
      align-items: center;
      padding: 0.5rem;
      color: #ffffff;
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
      button{
        outline: none;
        background: transparent;
        font-size: $font-size-0-6;
        font-weight: bold;
        color: #ffffff;
      }
    }


  }
}
</style>
