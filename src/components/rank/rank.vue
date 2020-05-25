<template>
  <div>
    排行页面
   <scroll :data="list">
    {{list}}


   </scroll>
  </div>
</template>

<script>
import scroll from 'base/scroll/scroll'

export default{
  data(){
    return{
      list:[
        {title:"243",desc:"kjdjsaf"}
      ]
    }
  }
  ,
  components:{
    scroll
  }

}

</script>

<style>
</style>
