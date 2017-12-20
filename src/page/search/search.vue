<template>
    <div class="search">
      <div class="header">
        <span class="back_icon" @click="goback"></span>
        <div class="search_input">
          <input type="text" placeholder="搜索商家、商品名称">
        </div>
        <button class="search_btn">搜索</button>
      </div>
    </div>
</template>

<script>
  export default {
    name: "search",
    methods:{
      goback(){
        this.$router.go(-1)
      }
    }
  }
</script>

<style lang="scss" scoped>
  @import "../../style/base";
.search{
  width: 100%;
  height: 100%;
  background: #ffffff;
  .header{
    display: flex;
    flex-direction: row;
    justify-content: space-between;
    align-items: center;
    padding: 0.5rem;
    .back_icon{
      width: 1rem;
      height: 1rem;
      background: url("../../images/back-icon-01.png") no-repeat;
      background-size: contain;
    }
    .search_input{
      flex: 1;
      margin: 0 0.5rem;
      input{
        width: 100%;
        padding-left: 0.5rem;
        height: 1.6rem;
        outline: none;
        background: #f4f4f4;
      }
    }
    .search_btn{
      background: transparent;
      outline: none;
      color: $color-333;
      font-size: $font-size-0-6;
    }
  }
}
</style>
