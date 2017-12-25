<template>
  <div class="goods-spec">
    <h1>{{goodsinfo.title}}</h1>
    <p class="subtitle">{{goodsinfo.sub_title}}</p>
    <div class="spec-box">
      <dl>
        <dt>货号</dt>
        <dd id="commodityGoodsNo">{{goodsinfo.goods_no}}</dd>
      </dl>
      <dl>
        <dt>市场价</dt>
        <dd>
          <s id="commodityMarketPrice">¥{{goodsinfo.market_price}}</s>
        </dd>
      </dl>
      <dl>
        <dt>销售价</dt>
        <dd>
          <em class="price" id="commoditySellPrice">¥{{goodsinfo.sell_price}}</em>
        </dd>
      </dl>
    </div>

    <div class="spec-box">
      <dl>
        <dt>购买数量</dt>
        <dd>
          <div class="stock-box">
            <!-- 使用element组件的计数器, -->
            <el-input-number v-model="goodsCount"
	    :min="1" :max="goodsinfo.stock_quantity" size="small" label="购买数量">
            </el-input-number>
          </div>
          <span class="stock-txt">
            库存
            <em id="commodityStockNum">{{goodsinfo.stock_quantity}}</em>件
          </span>
        </dd>
      </dl>
      <dl>
        <dd>
          <div class="btn-buy" id="buyButton">
            <button class="buy">立即购买</button>
            <button class="add" @click="addShopcart">加入购物车</button>
          </div>
        </dd>
      </dl>
    </div>

  </div>
</template>

<script>
export default {
  //接受父组件传递的数据  使用props
  props: ["goodsinfo"],
  data() {
    return {
      //关联加减按钮的数量
      goodsCount: 1
    };
  },
  methods: {
    //点击的时候加入购物车
    //通过commit方法累加商品购买记录
    addShopcart() {
      this.$store.commit("addShopcartData", {
        id: this.$route.params.id,
        val: this.goodsCount
      });
    },

  },
  watch: {
    //url发生变化重置商品的数量
    $route() {
      this.goodsCount=1;
    }
  }
};
</script>

<style scoped>

</style>