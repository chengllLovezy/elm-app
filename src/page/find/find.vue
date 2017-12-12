<template>
  <div class="" >
    <h2>find</h2>
    <button @click="asd($event)">asd</button>
    <div ref="add">
      <transition @before-enter="beforeAdd" @enter="adding" @after-enter="afterAdd">
        <div class="reduce-icon" v-if="reduce" @click="reduceCart(fooditem.foods_id,$event)"></div>
      </transition>
    </div>

  </div>
</template>
<script>
  export default {
    name:'',
    data(){
      return {
        reduce:false
      }
    },
    methods:{
      asd(){

        this.add(this.$refs.add)
      },
      add(el){
        this.reduce = true;
      },
      beforeAdd(el){
        console.log(el)
      },
      adding(el){

      },
      afterAdd(el){

      },
    },
    mounted(){

    }
  }
</script>
<style lang="scss">
  @import "../../style/base";
  .ball-container {
    float: right;
    .ball {
      width: 100%;
      background: #000;
      position: fixed; //小球动画必须脱离html布局流
      left: 32px;
      bottom: 22px;
      z-index: 200;
      transition: all 5s cubic-bezier(0.49, -0.29, 0.75, 0.41);
      .inner {
        width: 16px;
        height: 16px;
        border-radius: 50%;
        background: rgb(0, 160, 220);
        transition: all 5s linear;
      }
    }
  }
</style>
