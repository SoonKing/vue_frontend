<template>
    <div class="magnifier" id="magnifier1">
        <div class="magnifier-container">
            <div class="images-cover"></div>
            <!--当前图片显示容器-->
            <div class="move-view"></div>
            <!--跟随鼠标移动的盒子-->
        </div>
        <div class="magnifier-assembly">
            <div class="magnifier-btn">
                <span class="magnifier-btn-left">&lt;</span>
                <span class="magnifier-btn-right">&gt;</span>
             </div>
             <!--按钮组-->
             <div class="magnifier-line">
                 <ul class="clearfix animation03">
                     <li v-for="item in imglist" :key="item.id">
                         <div class="small-img">
                             <img :src="item.original_path" />
                         </div>
                     </li>
                 </ul>
             </div>
            <!--缩略图-->
         </div>
         <div class="magnifier-view"></div>
         <!--经过放大的图片显示容器-->
     </div>
 </template>

<script>
//导入jq放大镜插件,该插件依赖jq所以在源代码中import一下jq
import '../../../../../lib/imgzoom/js/magnifier.js';
    //导入$,调用插件方法
    import $ from "jquery";
  export default {
    props:['imglist'],
    //该函数只会执行一次,imglist那时候由于是异步请求,还是空数组
mounted(){},
    //所以使用watch监听imglist的方法,每次变化都要重新初始化放大镜插件
    watch:{
      imglist(){
        this.$nextTick(function(){
            var _magnifier = $().imgzoon({
               magnifier : "#magnifier1",//最外层的大容器
               width : 370,//承载容器宽
               height : 370,//承载容器高
               moveWidth : null,//如果设置了移动盒子的宽度，则不计算缩放比例
               zoom : 5//缩放比例
            });
        })
      }
    }

  }
</script>

<style scoped lang='less'>
@import '../../../../../lib/imgzoom/css/magnifier.css';

</style>