//导入vue相关包
import Vue from 'vue';

import AppComponent from "./component/App.vue";


new Vue({
    el: "#app",
    render: c => c(AppComponent)
})