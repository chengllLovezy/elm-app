<template>
    <div class="">
      <div class="header">
        <div class="address-wrap">
          <div class="address-box">
            <icon name="address" width="1rem" height="1rem"></icon>
            <span class="address-text">地址</span>
            <icon name="address-down" width="0.5rem" height="0.5rem"></icon>
          </div>
          <div class="weather-box">天气</div>
        </div>
        <!--搜索商品-->
        <div class="search-wrap">
          <icon name="search" width="0.9rem" height="0.9rem"></icon>
          <span>搜索商家、商品名称</span>
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


      <div class="nav">
        <div class="">
          <div class="">
            <img :src="baseImgUrl" alt="">
            <p></p>
          </div>
        </div>
      </div>
    </div>
</template>
<script>
//  import { foodNav } from '../../service/getData'
import axios from 'axios'
    export default {
      name:'home',
      data(){
        return {
          baseImgUrl:'https://fuss10.elemecdn.com'//导航食品分类图片域名地址
        }
      },
      mounted(){
        axios.get('/home/foodNav').then(function (res) {
          console.log(res)
        })
      }
    }
</script>
<style lang="scss">
  .header{
    background: #019aff;
    padding: 0.5rem;
    /*地址*/
    .address-wrap{
      font-size: 0.3rem;
      color: #ffffff;
      display: flex;
      flex-direction: row;
      flex-wrap: nowrap;
      justify-content: space-between;
      align-items: flex-end;
      .address-box{
        display: flex;
        flex-direction: row;
        align-items: center;
        font-size: 0.75rem;
        .address-text{
          font-weight: bold;
          margin-left: 0.3rem;
          margin-right: 0.3rem;
        }
      }
      .weather-box{

      }
    }
    /*搜索框*/
    .search-wrap{
      height: 1.6rem;
      margin:auto;
      margin: 0.5rem 0;
      background: #fff;
      border-radius: 2px;
      color: #bbb;
      display: flex;
      flex-direction: row;
      justify-content: center;
      align-items: center;
      span{
        font-size: 0.8rem;
        font-family: '宋体';
      }
    }
    /*搜搜热词*/
    .search-hot{
      font-size: 0.3rem;
      padding: 0 0.2rem;
      display: flex;
      flex-direction: row;
      justify-content: space-between;
      a{
        color: #fff;
      }
    }
  }
</style>
