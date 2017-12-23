//导入vue相关包
import Vue from 'vue';
import Vuex from 'vuex';
import VueRouter from 'vue-router';
import ElementUI from 'element-ui';
import Filters from './filter';
import 'element-ui/lib/theme-chalk/index.css';
import './css/style.css';

//启用vue插件
Vue.use(Vuex);
Vue.use(VueRouter);
Vue.use(ElementUI);
Vue.use(Filters);

//把axios和api配置注入到Vue原型中,这样组件实例就可直接访问
import axios from './js/axios_config.js';
import api from './js/api_config.js';
Vue.prototype.$http = axios;
Vue.prototype.$api = api;

//导入根组件
import AppComponent from "./component/App.vue";

//导入路由实例
import router from './router';


new Vue({
    el: "#app",
    render: c => c(AppComponent),
    router,
    store: new Vuex.Store({
        state: {
            shopcartTotal: 0
        },
        getters: {
            //计算购物车总数
            shopcartTotal(state) {
                return state.shopcartTotal;
            }
        },
        //
        mutations: {
            upShopcartTotal(state, num) {
                state.shopcartTotal += num;
            }
        }
    })
})