<template>
  <div>
    <!-- 导航栏 -->
    <app-breadcrumb></app-breadcrumb>

    <!-- 商品详情 -->
    <div class="section">
      <div class="wrapper clearfix">
        <div class="wrap-box">
          <!--页面左边-->
          <div class="left-925">
            <div class="goods-box clearfix">
              <!--商品图片-->
              <div class="pic-box">
                <!-- 添加事件监听,传递到子组件 -->
                <app-left-img :imglist="goodsDetail.imglist"></app-left-img>
              </div>
              <!--/商品图片-->

              <!--商品信息-->
              <app-left-info :goodsinfo="goodsDetail.goodsinfo"></app-left-info>
              <!--/商品信息-->
            </div>

            <div id="goodsTabs" class="goods-tab bg-wrap">
              <!--选项卡-->

              <el-tabs type="border-card">
                <el-tab-pane label="商品介绍">
                  <!--选项内容-->
                  <div class="tab-content entry" v-html="goodsDetail.goodsinfo.content" style="display:block;">

                  </div>
                </el-tab-pane>
                <!--网友评论  获取商品模块的页面和id参数-->
                <el-tab-pane label="商品评论">
                  <div class="tab-content" style="display: block;">
                    <app-comment tablename="goods" :artID="id"></app-comment>
                    <!--/网友评论-->
                  </div>
                </el-tab-pane>
              </el-tabs>
              <!--/选项卡-->

            </div>

          </div>
          <!--/页面左边-->

          <!--页面右边-->
          <div class="left-220">
            <div class="bg-wrap nobg">
              <app-right :hotgoodslist="goodsDetail.hotgoodslist"></app-right>
            </div>
          </div>
          <!--/页面右边-->
        </div>
      </div>
    </div>
  </div>
</template>

<script>
import CommentComponent from "../../common/Comment.vue";
import BreadcrumbComponent from "./frame/Breadcrumb.vue";
import LeftImgComponent from "./frame/LeftImg.vue";
import LeftInfoComponent from "./frame/LeftInfo.vue";
import RightComponent from "./frame/Right.vue";
export default {
  data() {
    return {
      //将id存起来
      id: this.$route.params.id,
      //存放三个子组件需要的数据
      goodsDetail: {
        hotgoodslist: [],
        imglist: [],
        goodsinfo: {}
      }
    };
  },
  //配置方法
  methods: {
    getGoodsDetail() {
      this.$http
        .get(this.$api.goodsDetail + this.id)
        .then(res => (this.goodsDetail = res.data.message));
    }
  },
  //数据加载完毕之后就调用数据的--生命周期函数
  created() {
    this.getGoodsDetail();
  },
//如果是同一个路由匹配的url变化,name不会触发路由页面的更换,
//但是$route对象惠济路新的url参数信息,我们来监视$route对象得知页面同一个路由
  watch:{
    $route(){
      this.id=this.$route.params.id;
      this.getGoodsDetail();
    }
  },

  components: {
    appComment: CommentComponent,
    appBreadcrumb: BreadcrumbComponent,
    appLeftImg: LeftImgComponent,
    appLeftInfo: LeftInfoComponent,
    appRight: RightComponent
  }
};
</script>

<style scoped>

</style>