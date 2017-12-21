<template>
<div>
 <app-breadcrumb></app-breadcrumb>
 <app-top></app-top>
 <app-list></app-list>
 </div>
</template>

<script>
//导入三个分块模块
import BreadcrumbComponent from './frame/Breadcrumb.vue';
import TopComponent from './frame/Top.vue';
import ListComponent from './frame/List.vue';
  export default {
    components:{
      appBreadcrumb:BreadcrumbComponent,
      appTop:TopComponent,
      appList:ListComponent,
    }
  }
</script>

<style scoped>

</style>