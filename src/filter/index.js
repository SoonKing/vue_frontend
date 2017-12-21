//这里注册所有的全局自定义过滤器,使用vue插件的方式书写
//vue插件的编写,只需要一个函数,这个函数在Vue.use的时候,就会接收到Vue对象
export default function(Vue) {
    //日期格式化过滤器
    //过滤器在调用的时候,会自动接受来自模板的数据,要求我们数据处理之后返回,然后进行渲染
    Vue.filter('date', function(tplData) {
        let date = new Date(tplData);
        return `${date.getFullYear()}-${date.getMonth()+1}-${date.getDate()}`;
    });
};

// //vue插件第二种方式,提供一个对象,并且对象里面必须包含一个install方法
// export default{
//   Vue.use(该对象)的时候,会自动调用install方法
//   install(Vue){
//     //定义全局的过滤器
//     定义全剧组建
//     给原型进行扩展
//   }
// }