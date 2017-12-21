<template>
    <div class="address">
      <div class="header">
        <div class="header_box">
          <div class="header_back">
            <span class="back_icon"></span>
            <h2>选择收货地址</h2>
            <button>新增地址</button>
          </div>
          <div class="header_search">
            <div class="label ellipsis" @click="cityHandler">
              <span class="name ellipsis">北京</span>
              <span class="down_icon"></span>
            </div>
            <div class="search_input">
              <span class="search_icon"></span>
              <input type="text" placeholder="请输入地址" id="search" ref="search" v-model="addressText" @input="addressSearch" @focus="searchFocus">
            </div>
            <div class="btn" v-if="main03Show">
              <button v-if="!tips.length" @click="cancleSearch">取消</button>
              <button v-else @click="">搜索</button>
            </div>
          </div>
        </div>
      </div>
      <div class="main">
        <div class="main_01" v-if="main01Show">
          <div class="title">当前地址</div>
          <div class="list">
            <div class="item">测试城市</div>
          </div>
        </div>
        <div class="main_02" v-if="main02Show">
          <div class="title">当前定位城市</div>
          <div class="list">
            <div class="item">测试城市</div>
          </div>
        </div>
        <div class="main_03" v-if="main03Show">
          <div class="list">
            <div class="item" v-for="tip in tips">
              <span class="circle_icon"></span>
              <div class="content border-bottom">
                <h3>{{tip.name}}</h3>
                <p>{{tip.district}}</p>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
</template>

<script>
  import AMap from 'AMap'
  let self = '';
  export default {
    name: "address",
    data () {
      return {
        addressText:'',
        tips:[],
        main03Show:false,
        main02Show:false,
        main01Show:true
      }
    },
    methods:{
      init(){
        AMap.plugin('AMap.Autocomplete',function(){
          var autoOptions = {
            city:''
          };
          var autocomplete = new AMap.Autocomplete(autoOptions);
          autocomplete.search(self.addressText,function(status, result){
            if(status == 'complete'){
              self.tips = result.tips;

            }else{
              self.tips = [];
            }
          })
        })
      },
      addressSearch(){
        self.tips = [];
        console.log(this.addressText)
        this.init();
      },
      searchFocus(){
        this.main01Show = false;
        this.main02Show = false;
        this.main03Show = true;
      },
      cancleSearch(){
        this.main01Show = true;
        this.main02Show = false;
        this.main03Show = false;
        this.addressText = '';
      },
      cityHandler(){
        this.main01Show = false;
        this.main02Show = true;
        this.main03Show = false;
        this.addressText = '';
      }
    },
    mounted(){
      self = this;
      this.init();
    }
  }
</script>

<style lang="scss" scoped>
  @import "../../style/base";
.address{
  .header{
    height: 4.1rem;
    background: $background-primay;
    .header_box{
      width: 100%;
      position: fixed;
      top: 0;
      left: 0;
      z-index: 1000;
      color: #ffffff;
      padding-bottom: 0.5rem;
      background: $background-primay;
      .header_back{
        width: 100%;
        padding: 0.5rem;
        display: flex;
        flex-direction: row;
        justify-content: space-between;
        align-items: center;
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
      .header_search{
        display: flex;
        flex-direction: row;
        justify-content: space-between;
        align-items: center;
        height: 1.5rem;
        padding: 0 0.5rem;
        .label{
          padding-right: 0.5rem;
          display: flex;
          flex-direction: row;
          justify-content: space-between;
          align-items: center;
          .name{
            width: 2.2rem;
            font-size: $font-size-0-6;
          }
          .down_icon{
            width: 0.6rem;
            height: 0.6rem;
            background: url("../../images/down-icon.png") no-repeat;
            background-size: contain;
          }
        }
        .search_input{
          flex: 1;
          display: flex;
          flex-direction: row;
          align-items: center;
          background: #ffffff;
          height: 100%;
          padding-left: 0.5rem;
          .search_icon{
            width: 0.8rem;
            height: 0.8rem;
            background: url("../../images/search-icon-03.png") no-repeat;
            background-size: contain;
          }
          input{
            padding-left: 0.5rem;
            height: 100%;
            flex: 1;
            border: none;
            outline: none;
          }
        }
        button{
          width: 2.2rem;
          outline: none;
          padding-left: 0.5rem;
          background: transparent;
          font-size: $font-size-0-6;
          color: #ffffff;
        }
      }
    }
  }

  .main{
    background: #ffffff;
    .main_01{
      .title{
        padding: 0.5rem 0.2rem;
        font-size: $font-size-0-6;
        color: $color-666;
        background: #f5f5f5;
      }
      .list{
        .item{
          padding: 0.5rem;
          font-size: $font-size-0-6;
          color: $color-333;
          background: #ffffff;
        }
      }
    }
    .main_02{
      .title{
        padding: 0.5rem 0.2rem;
        font-size: $font-size-0-6;
        color: $color-666;
        background: #f5f5f5;
      }
      .list{
        .item{
          padding: 0.5rem;
          font-size: $font-size-0-6;
          color: $color-333;
          background: #ffffff;
        }
      }
    }
    .main_03{
      .list{
        .item{
          display: flex;
          flex-direction: row;
          justify-content: space-between;
          align-items: center;
          padding: 0 0.5rem;
          .circle_icon{
            width: 1rem;
            height: 1rem;
            background: url("../../images/circle.png") no-repeat;
            background-size: contain;
          }
          .content{
            padding: 0.5rem 0;
            margin-left: 0.8rem;
            flex: 1;
            h3{
              font-size: $font-size-0-7;
              color: $color-333;
            }
            p{
              font-size: $font-size-0-6;
              color: $color-999;
            }
          }
        }
      }
    }

  }

}
</style>
