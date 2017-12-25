<template>
  <div class="comment-box">
    <!--取得评论总数-->
    <form id="commentForm" name="commentForm" class="form-box" @submit.prevent="subComment">
      <div class="avatar-box">
        <i class="iconfont icon-user-full"></i>
      </div>
      <div class="conn-box">
        <div class="editor">
          <textarea v-model="commentContent" id="txtContent" name="txtContent" sucmsg=" " 
	  datatype="*10-1000" nullmsg="请填写评论内容！"></textarea>
          <span class="Validform_checktip"></span>
        </div>
        <div class="subcon">
          <button id="btnSubmit" name="submit" type="submit" class="submit">提交评论</button>
          <span class="Validform_checktip"></span>
        </div>
      </div>
    </form>
    <ul id="commentList" class="list-box">
      <!-- 没有评论时候的提示 -->
      <p v-if="!commentList.length" style="margin:5px 0 15px 69px;line-height:42px;text-align:center;border:1px solid #f7f7f7;">
      暂无评论，快来抢沙发吧！
      </p>
      <!-- 具体评论 -->
      <li v-for="(item,i) in commentList" :key="i">
        <div class="avatar-box">
          <i class="iconfont icon-user-full"></i>
        </div>
        <div class="inner-box">
          <div class="info">
            <span>{{item.user_name}}</span>
            <span>{{item.user_ip}}</span>
            <span>{{item.add_time|date}}</span>
          </div>
          <p>{{item.content}}</p>
        </div>
      </li>
    </ul>
    <!--放置页码-->
    <div class="page-box" style="margin:5px 0 0 62px">
      <el-pagination 
      @size-change="handleSizeChange" @current-change="handleCurrentChange" :current-page="query.pageIndex" :page-sizes="[4, 6, 8, 10]" :page-size="query.pageSize" layout="total, sizes, prev, pager, next, jumper" :total="totalcount" background>

      </el-pagination>

    </div>
    <!--/放置页码-->
  </div>
</template>

<script>
export default {
  //获取评论列表时候,模块名称和文章id
  props: ["tablename", "artID"],
  data() {
    return {
      //评论内容
      commentContent: "",
      //评论列表数据
      commentList: [],

      //获取评论列表时候,查询的字符串
      query: {
        pageIndex: 1,
        pageSize: 4
      },
      //评论总数
      totalcount: 0
    };
  },
  methods: {
    //修改页码
    handleCurrentChange(page) {
      this.query.pageIndex = page;
      this.getCommentList();
    },
    //修改每页的数量
    handleSizeChange(size) {
      this.query.pageSize = size;
      this.getCommentList();
    },
    //获取评论列
    getCommentList() {
      //加上参数和查询
      this.$http
      .get(
        this.$api.commentList + this.tablename + "/" + this.artID, 
        {params: this.query}
        )
        .then(res => {
          this.commentList = res.data.message;
          this.totalcount = res.data.totalcount;
        });
    },
    //提交评论
    subComment() {
      this.$http.post(
        this.$api.comment + this.tablename + "/" + this.artID,
         {commenttxt: this.commentContent}
         )
        .then(res => {
          //评论成功之后的提示
          this.$message({
            message: "发表成功",
            type: "success"
          });
          //评论成功之后,手动穿件一条评论,unshift添加倒数组中去
          this.commentList.unshift({
            user_name: "匿名用户",
            user_ip: "127.0.0.1",
            add_time: new Date(),
            content: this.commentContent
          });
          this.commentContent = "";
        });
    }
  },
  //监听商品的变化(artID和$router都可以监听),从而改变现实的评论数据
  watch: {
    artID() {
      this.getCommentList();
    }
  },
  created() {
    this.getCommentList();
  }
};
</script>

<style scoped>

</style>