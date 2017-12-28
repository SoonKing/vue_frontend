<template>
  <div>
    <div class="section">
      <div class="location">
        <span>当前位置：</span>
        <a href="/index.html">首页</a> &gt;
        <a href="/cart.html">购物车</a>
      </div>
    </div>

    <div class="section">
      <div class="wrapper">
        <div class="bg-wrap">
          <!--购物车头部-->
          <div class="cart-head clearfix">
            <h2>
              <i class="iconfont icon-cart"></i>我的购物车</h2>
            <div class="cart-setp">
              <ul>
                <li class="first active">
                  <div class="progress">
                    <span>1</span>
                    放进购物车
                  </div>
                </li>
                <li>
                  <div class="progress">
                    <span>2</span>
                    填写订单信息
                  </div>
                </li>
                <li class="last">
                  <div class="progress">
                    <span>3</span>
                    支付/确认订单
                  </div>
                </li>
              </ul>
            </div>
          </div>
          <!--购物车头部-->
          <!--商品列表-->
          <div class="cart-box">
            <input id="jsondata" name="jsondata" type="hidden">
            <table width="100%" align="center" class="cart-table" border="0" cellspacing="0" cellpadding="8">
              <tbody>
                <tr>
                  <!-- 表头 -->
                  <th width="48" align="center">
                    <!-- 设置value属性 -->
                    <el-switch :value="allSwitchState" @change="switchAllChange" active-color="#13ce66"></el-switch>
                  </th>
                  <th align="left" colspan="2">商品信息</th>
                  <th width="84" align="left">单价</th>
                  <th width="104" align="center">数量</th>
                  <th width="104" align="left">金额(元)</th>
                  <th width="54" align="center">操作</th>
                </tr>
                <!-- 商品列表 -->
                <tr v-for="item in goodsList" :key="item.id">
                  <td width="48" align="center">
                    <el-switch v-model="item.selected" active-color="#13ce66"></el-switch>
                  </td>

                  <td align="left" colspan="2">
                    <img width="50" height="50" :src="item.img_url" alt="">
                    <span>{{ item.title }}</span>
                  </td>
                  <td width="84" align="left">
                    ￥{{ item.sell_price }}
                  </td>
                  <td width="104" align="center">
                    <el-input-number v-model="item.buycount" @change="numChange(item.id, $event)" size="mini" :min="1"></el-input-number>
                  </td>
                  <td width="104" align="left">
                    ￥{{ item.sell_price * item.buycount }}</td>
                  </td>
                  <td width="54" align="center">
                    <el-button size="mini" @click.native="delGoods(item.id)">删除</el-button>
                  </td>
                </tr>
                <!-- 没有商品的提示 -->
                <tr v-if="!goodsList.length">
                  <td colspan="10">
                    <div class="msg-tips">
                      <div class="icon warning">
                        <i class="iconfont icon-tip"></i>
                      </div>
                      <div class="info">
                        <strong>购物车没有商品！</strong>
                        <p>您的购物车为空，
                          <a href="/index.html">马上去购物</a>吧！</p>
                      </div>
                    </div>
                  </td>
                </tr>
                <tr>
                  <th align="right" colspan="8">
                    已选择商品
                    <b class="red" id="totalQuantity">{{ selectedShopcartTotal }}</b> 件 &nbsp;&nbsp;&nbsp; 商品总金额（不含运费）：
                    <span class="red">￥</span>
                    <b class="red" id="totalAmount">{{ selectedShopcartTotalPrice }}</b>元
                  </th>
                </tr>
              </tbody>
            </table>
          </div>
          <!--/商品列表-->
          <!--购物车底部-->
          <div class="cart-foot clearfix">
            <div class="right-box">
              <button class="button" onclick="javascript:location.href='/index.html';">继续购物</button>
              <button class="submit" @click="downdown">立即结算</button>
            </div>
          </div>
          <!--购物车底部-->
        </div>
      </div>
    </div>
  </div>
</template>

<script>
export default {
  data() {
    return {
      goodsList: []
    };
  },
  computed: {
    //选取的商品总数
    //1.遍历商品列表
    //2.找出selected的商品,累加
    selectedShopcartTotal() {
      // console.log(goodsList);

      return this.goodsList.reduce(
        (s, v) => (v.selected ? s + v.buycount : s),
        0
      );
    },
    //选取商品总价
    //1.商品列表遍历
    //2.找出selected为true的商品, 累加他们的单价 * 购买数量.
    selectedShopcartTotalPrice() {
      return this.goodsList.reduce(
        (s, v) => (v.selected ? s + v.sell_price * v.buycount : s),
        0
      );
    },
    //全选switch的状态
    allSwitchState() {
      return this.goodsList.every(v => v.selected);
    }
  },
  methods: {
    //全选switch
    switchAllChange(bol) {
      this.goodsList.forEach(v => (v.selected = bol));
    },
    // 通过IDS获取商品列表
    getGoodsList() {
      this.$http
        .get(this.$api.shopcartGoods + this.$store.getters.getShopcartIDS)
        .then(rsp => {
          rsp.data.message.forEach(goods => {
            // 给请求回来的每个商品对象添加一个selected属性, 用于绑定Switch开关
            goods.selected = true;

            // 后台返回的buycount属性不正确, 我们给他修正一下
            goods.buycount = this.$store.getters.getShopcartData[goods.id];
          });
          this.goodsList = rsp.data.message;
        });
    },

    //数字输入框发生变化的时候,执行该方法
    //拿到商品的id和新的购买数值
    numChange(id, val) {
      this.$store.commit("upShopcartData", { id: id, val: val });
    },

    //删除商品
    //1.从共享数据中删除,本地数据和右上角会随着更新
    //2.从当前组件的goodsList中删除,这样子视图中的商品列表会更新
    delGoods(id) {
      this.$store.commit("delShopcartData", { id: id });
      this.goodsList = this.goodsList.filter(v => v.id != id); //数组的filter方法表示留下括号内条件满足的(不删除的)商品
    }
  },
  //下订单
  downdown(){
    this.$http.get(this.$api.isLogin).then(res=>{
      //如果登录,就跳转到下一个页面,把勾选的产品ids传递过去,在下页展示
      if(res.data.code=="logined"){
        this.$router.push({
          name:'oa',
          query:{
            //遍历所有的商品,找出selected为true,将ids拼接为字符串
            //filter找出符合掉件的商品,map拿出每个商品的id,最后join拼接成字符串
            selectedIDS:this.goodsList.filter(v=>v.selected).map(v=>v.id).join(',')
          }
        });
      }
      //如果没有登录,跳转到登录页面
      else{
        this.$router.push({name:'l',query:{nextPage:this.$route.fullpath}});
      }
    })
  },
  created() {
    this.getGoodsList();
  }
};
</script>

<style scoped>

</style>