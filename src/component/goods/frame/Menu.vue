<template>
  <p>
    <a v-for="item in menu" :key="item.id">
      {{item.title}}
      <!-- 判断item是否还有自己数据,如果有的话就使用地柜自己调用自己,进行数据的渲染,没有就递归结束 -->
      <app-menu v-if="item.subcates && item.subcates.length!=0" :menu="item.subcates"></app-menu>
    </a>
  </p>
</template>

<script>
  export default {
    //定义组件默认的名称,这样组件在这里自己调用自己
    name:'app-menu',
    //接收到的menu是一个数组[ { title, subcates }, { title, subcates } ]
    //数组的每个对象可能会含有subcates属性,值还是数组
    //需要递归的自己调用自己
    props:['menu']
  }
</script>

<style scoped>

</style>