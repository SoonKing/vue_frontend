import VueRouter from 'vue-router';

import GoodsHomeComponent from '../component/goods/GoodsHome.vue';
import GoodsDetailComponent from '../component/goods/detail/GoodsDetail.vue';
import GoodsMoreComponent from '../component/goods/more/GoodsMore.vue';
import ShopCartComponent from '../component/shopcart/Cart.vue';

//对外导出路由配置对象

//路由配置对象
const routerConfig = [
    //默认访问商品首页-->重定向
    { path: '/', redirect: '/goods' },
    //商品模块
    { name: 'g', path: '/goods', component: GoodsHomeComponent },
    { name: 'gd', path: '/goods/detail/:id', component: GoodsDetailComponent },
    { name: 'gm', path: '/goods/more', component: GoodsMoreComponent },
    { name: 'sc', path: '/shopcart', component: ShopCartComponent }
];

//对外导出配置好的路由实例
export default new VueRouter({
    routes: routerConfig
});